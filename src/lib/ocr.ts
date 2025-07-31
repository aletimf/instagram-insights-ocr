interface OCRMetrics {
  [key: string]: number;
}

export async function processImageOCR(imageBuffer: Buffer): Promise<OCRMetrics> {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenAI API key is not configured');
  }

  try {
    // Convert buffer to base64
    const imageBase64 = imageBuffer.toString('base64');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this Instagram Stories insights screenshot and extract the following numerical metrics: impressions, reach, profile visits, website clicks, link clicks, follows, shares, replies, story exits, story completion rate, forward taps, back taps, next story taps, and sticker taps.

Please return ONLY a valid JSON object with metric names as keys and their numerical values as numbers. 
If a metric is not visible or unclear, omit it from the response.

Example format:
{
  "impressions": 1234,
  "reach": 987,
  "profile_visits": 56,
  "website_clicks": 8,
  "link_clicks": 15,
  "follows": 12,
  "shares": 5,
  "replies": 45,
  "story_exits": 3,
  "story_completion_rate": 87,
  "forward_taps": 20,
  "back_taps": 15,
  "next_story_taps": 22,
  "sticker_taps": 10
}`
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        max_tokens: 500,
        temperature: 0.1
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No content received from OpenAI API');
    }

    // Try to parse the JSON response
    try {
      // Clean the response in case there's extra text
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : content;
      
      const metrics = JSON.parse(jsonString);
      
      // Validate that all values are numbers
      const validatedMetrics: OCRMetrics = {};
      for (const [key, value] of Object.entries(metrics)) {
        const numValue = typeof value === 'string' ? parseFloat(value as string) : value;
        if (typeof numValue === 'number' && !isNaN(numValue)) {
          validatedMetrics[key.toLowerCase().replace(/\s+/g, '_')] = numValue;
        }
      }
      
      return validatedMetrics;
    } catch {
      console.error('Failed to parse OCR response:', content);
      throw new Error('Failed to parse metrics from OCR response');
    }
  } catch (error) {
    console.error('OCR processing error:', error);
    throw error;
  }
}

export function aggregateMetrics(metricsArray: OCRMetrics[]): OCRMetrics {
  const aggregated: OCRMetrics = {};
  
  for (const metrics of metricsArray) {
    for (const [key, value] of Object.entries(metrics)) {
      if (aggregated[key]) {
        aggregated[key] += value;
      } else {
        aggregated[key] = value;
      }
    }
  }
  
  return aggregated;
}

export function aggregateMetricsWithGroups(metricsArray: OCRMetrics[], groups: number[][]): OCRMetrics {
  // If no groups are provided, aggregate all metrics normally
  if (!groups || groups.length === 0) {
    return aggregateMetrics(metricsArray);
  }
  
  const aggregated: OCRMetrics = {};
  
  // Keep track of which metrics have been processed
  const processedIndices = new Set<number>();
  
  // Process each group
  for (const group of groups) {
    // For each group, take the maximum value for each metric (assuming they're from the same story)
    const groupMetrics: OCRMetrics = {};
    
    for (const index of group) {
      if (index < metricsArray.length) {
        const metrics = metricsArray[index];
        for (const [key, value] of Object.entries(metrics)) {
          // Take the maximum value for each metric in the group
          if (groupMetrics[key] === undefined || value > groupMetrics[key]) {
            groupMetrics[key] = value;
          }
        }
        processedIndices.add(index);
      }
    }
    
    // Add the group metrics to the final result
    for (const [key, value] of Object.entries(groupMetrics)) {
      if (aggregated[key]) {
        aggregated[key] += value;
      } else {
        aggregated[key] = value;
      }
    }
  }
  
  // Process any remaining metrics that aren't in groups
  for (let i = 0; i < metricsArray.length; i++) {
    if (!processedIndices.has(i)) {
      const metrics = metricsArray[i];
      for (const [key, value] of Object.entries(metrics)) {
        if (aggregated[key]) {
          aggregated[key] += value;
        } else {
          aggregated[key] = value;
        }
      }
    }
  }
  
  return aggregated;
}

export function formatMetricName(key: string): string {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
