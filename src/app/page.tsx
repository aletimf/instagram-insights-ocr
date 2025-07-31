import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Instagram Insights OCR Platform
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Upload your Instagram Stories insights screenshots and get organized data in a clean table format. 
          Multiple screenshots will be automatically aggregated.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>How it works</CardTitle>
            <CardDescription>
              Simple 3-step process to extract your Instagram insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold">Upload Screenshots</h3>
                <p className="text-sm text-muted-foreground">
                  Select one or more Instagram Stories insights screenshots from your device
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold">AI Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Our OCR technology extracts impressions, reach, profile visits, website clicks, link clicks, follows, shares, replies, and more
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold">Get Results</h3>
                <p className="text-sm text-muted-foreground">
                  View aggregated data in a clean, organized table format
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>
              Powerful OCR capabilities for Instagram insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Multiple screenshot support</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Automatic metric aggregation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Handles different screenshot layouts</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Clean table export</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Fast AI-powered processing</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Link href="/ocr">
          <Button size="lg" className="px-8 py-3 text-lg">
            Start Analyzing Screenshots
          </Button>
        </Link>
      </div>
    </div>
  )
}
