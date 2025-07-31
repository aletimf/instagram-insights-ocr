import { NextRequest, NextResponse } from 'next/server';
import { processImageOCR, aggregateMetricsWithGroups } from '@/lib/ocr';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const groupsData = formData.get('groups');
    const groups = groupsData ? JSON.parse(groupsData as string) : [];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files uploaded. Please select at least one screenshot.' },
        { status: 400 }
      );
    }

    // Validate file types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload only JPEG, PNG, or WebP images.' },
        { status: 400 }
      );
    }

    // Validate file sizes (max 10MB per file)
    const maxSize = 10 * 1024 * 1024; // 10MB
    const oversizedFiles = files.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      return NextResponse.json(
        { error: 'File too large. Please upload images smaller than 10MB.' },
        { status: 400 }
      );
    }

    console.log(`Processing ${files.length} file(s) for OCR analysis...`);

    const allMetrics = [];
    const processingErrors = [];

    // Process each file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      try {
        console.log(`Processing file ${i + 1}/${files.length}: ${file.name}`);
        
        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        // Process with OCR
        const metrics = await processImageOCR(buffer);
        allMetrics.push(metrics);
        
        console.log(`Successfully processed ${file.name}:`, metrics);
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
        processingErrors.push({
          filename: file.name,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    // If no files were successfully processed
    if (allMetrics.length === 0) {
      return NextResponse.json(
        { 
          error: 'Failed to process any files successfully.',
          details: processingErrors
        },
        { status: 500 }
      );
    }

    // Aggregate metrics from all successfully processed files
    const aggregatedMetrics = aggregateMetricsWithGroups(allMetrics, groups);
    
    console.log('Final aggregated metrics:', aggregatedMetrics);

    const response = {
      success: true,
      filesProcessed: allMetrics.length,
      totalFilesUploaded: files.length,
      metrics: aggregatedMetrics,
      ...(processingErrors.length > 0 && { 
        warnings: `${processingErrors.length} file(s) failed to process`,
        failedFiles: processingErrors 
      })
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('OCR API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error occurred while processing your request.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to upload files.' },
    { status: 405 }
  );
}
