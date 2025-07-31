import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Instagram Insights OCR Platform',
  description: 'Extract and analyze Instagram Stories insights from screenshots using OCR technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <header className="border-b border-border">
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-foreground">
                Instagram Insights OCR Platform
              </h1>
              <p className="text-muted-foreground mt-1">
                Extract and analyze metrics from Instagram Stories insights screenshots
              </p>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
