'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { formatMetricName } from '@/lib/ocr'

interface OCRResult {
  success: boolean;
  filesProcessed: number;
  totalFilesUploaded: number;
  metrics: Record<string, number>;
  warnings?: string;
  failedFiles?: Array<{ filename: string; error: string }>;
}

export default function OCRPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [selectedFileIndices, setSelectedFileIndices] = useState<Set<number>>(new Set())
  const [groups, setGroups] = useState<number[][]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<OCRResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedFiles(files)
    setSelectedFileIndices(new Set())
    setGroups([])
    setResult(null)
    setError(null)
  }

  const handleRemoveFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index)
    setSelectedFiles(newFiles)
    
    // Update selected indices
    const newSelectedIndices = new Set(selectedFileIndices);
    newSelectedIndices.delete(index);
    
    // Update indices in the set to account for removed file
    const updatedSelectedIndices = new Set<number>();
    newSelectedIndices.forEach(selectedIndex => {
      if (selectedIndex > index) {
        updatedSelectedIndices.add(selectedIndex - 1);
      } else if (selectedIndex < index) {
        updatedSelectedIndices.add(selectedIndex);
      }
    });
    setSelectedFileIndices(updatedSelectedIndices);
    
    // Update groups to account for removed file
    const updatedGroups = groups.map(group => 
      group.map(groupIndex => groupIndex > index ? groupIndex - 1 : groupIndex)
           .filter(groupIndex => groupIndex !== index)
    ).filter(group => group.length > 0);
    setGroups(updatedGroups);
    
    // Update the file input
    if (fileInputRef.current) {
      const dt = new DataTransfer()
      newFiles.forEach(file => dt.items.add(file))
      fileInputRef.current.files = dt.files
    }
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one screenshot to analyze.')
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      selectedFiles.forEach(file => {
        formData.append('files', file)
      })
      
      // Add grouping information if there are groups
      if (groups.length > 0) {
        formData.append('groups', JSON.stringify(groups))
      }

      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process screenshots')
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setSelectedFiles([])
    setSelectedFileIndices(new Set())
    setGroups([])
    setResult(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const toggleFileSelection = (index: number) => {
    const newSelectedIndices = new Set(selectedFileIndices);
    if (newSelectedIndices.has(index)) {
      newSelectedIndices.delete(index);
    } else {
      newSelectedIndices.add(index);
    }
    setSelectedFileIndices(newSelectedIndices);
  }

  const groupSelectedFiles = () => {
    if (selectedFileIndices.size < 2) {
      setError('Please select at least 2 files to group them together.');
      return;
    }
    
    const newGroup = Array.from(selectedFileIndices).sort((a, b) => a - b);
    setGroups([...groups, newGroup]);
    setSelectedFileIndices(new Set());
  }

  const ungroupFiles = (groupIndex: number) => {
    const newGroups = [...groups];
    newGroups.splice(groupIndex, 1);
    setGroups(newGroups);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Instagram Insights OCR
        </h1>
        <p className="text-muted-foreground">
          Upload your Instagram Stories insights screenshots to extract and analyze metrics
        </p>
      </div>

      {/* File Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Screenshots</CardTitle>
          <CardDescription>
            Select one or more Instagram Stories insights screenshots (JPEG, PNG, WebP)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center space-y-4"
            >
              <div className="w-full py-8 text-center">
                <div className="text-2xl font-bold text-foreground mb-2">
                  Upload Instagram Screenshots
                </div>
                <p className="text-sm text-muted-foreground">
                  Click here or drag and drop your Instagram insights screenshots
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supports JPEG, PNG, WebP formats
                </p>
              </div>
            </label>
          </div>

          {/* Selected Files Preview */}
          {selectedFiles.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Selected Files ({selectedFiles.length})</h3>
                {selectedFileIndices.size > 0 && (
                  <Button onClick={groupSelectedFiles} size="sm">
                    Group Selected ({selectedFileIndices.size})
                  </Button>
                )}
              </div>
              
              {/* Grouping Instructions */}
              <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                <strong>Grouping:</strong> If you have multiple screenshots from the same Instagram story, 
                select them and click &ldquo;Group Selected&rdquo; to avoid double-counting metrics.
              </div>
              
              {/* Groups Section */}
              {groups.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Groups:</h4>
                  <div className="space-y-2">
                    {groups.map((group, groupIndex) => (
                      <div key={groupIndex} className="flex items-center justify-between bg-muted p-2 rounded">
                        <div className="text-sm">
                          Group of {group.length} screenshots
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => ungroupFiles(groupIndex)}
                          className="text-xs"
                        >
                          Ungroup
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedFiles.map((file, index) => (
                  <div 
                    key={index} 
                    className={`relative border rounded-lg p-3 cursor-pointer transition-all ${
                      selectedFileIndices.has(index) ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => toggleFileSelection(index)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={`Instagram insights screenshot ${index + 1} showing metrics data in a modern interface layout`}
                          width={64}
                          height={64}
                          className="object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/64x64?text=Image+Preview+Placeholder+for+Instagram+Insights+Screenshot"
                          }}
                        />
                        <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                          selectedFileIndices.has(index) ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                          {selectedFileIndices.has(index) ? '✓' : index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile(index);
                        }}
                        className="text-xs"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              onClick={handleUpload}
              disabled={selectedFiles.length === 0 || isLoading}
              className="flex-1"
            >
              {isLoading ? 'Processing...' : `Analyze ${selectedFiles.length} Screenshot${selectedFiles.length !== 1 ? 's' : ''}`}
            </Button>
            {(selectedFiles.length > 0 || result) && (
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
            )}
          </div>

          {/* Loading Progress */}
          {isLoading && (
            <div className="space-y-2">
              <Progress value={undefined} className="w-full" />
              <p className="text-sm text-center text-muted-foreground">
                Processing screenshots with AI-powered OCR...
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Results Display */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Extracted Metrics</CardTitle>
            <CardDescription>
              Successfully processed {result.filesProcessed} of {result.totalFilesUploaded} screenshots
              {result.warnings && (
                <span className="block text-yellow-600 mt-1">
                  ⚠️ {result.warnings}
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(result.metrics).length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Metric</TableHead>
                    <TableHead className="text-right font-semibold">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(result.metrics)
                    .sort(([, a], [, b]) => b - a) // Sort by value descending
                    .map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell className="font-medium">
                          {formatMetricName(key)}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {typeof value === 'number' ? value.toLocaleString() : value}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            ) : (
              <Alert>
                <AlertDescription>
                  No metrics were extracted from the uploaded screenshots. 
                  Please ensure the images contain clear Instagram insights data.
                </AlertDescription>
              </Alert>
            )}

            {/* Failed Files Warning */}
            {result && result.failedFiles && result.failedFiles.length > 0 && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>
                  <strong>Failed to process {result.failedFiles.length} file(s):</strong>
                  <ul className="mt-2 list-disc list-inside">
                    {result.failedFiles.map((failed, index) => (
                      <li key={index} className="text-sm">
                        {failed.filename}: {failed.error}
                      </li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
