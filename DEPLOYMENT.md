# Deployment Guide for Instagram Insights OCR Platform

This guide will help you publish your Instagram Insights OCR Platform online using Vercel, the recommended platform for Next.js applications.

## Prerequisites

Before deploying, ensure you have:

1. A GitHub, GitLab, or Bitbucket account
2. A Vercel account (free available)
3. An OpenAI API key with GPT-4 Vision access

## Browser Storage Limitation Workaround

If you encounter browser storage limitations when trying to publish through web interfaces, refer to [GITHUB_PUBLISHING.md](GITHUB_PUBLISHING.md) for a manual command-line approach to publishing your repository.

## Vercel Deployment Issues

If you encounter deployment errors on Vercel (such as "Couldn't find any `pages` or `app` directory"), refer to [VERCEL_TROUBLESHOOTING.md](VERCEL_TROUBLESHOOTING.md) for detailed troubleshooting steps.

## Deployment Options

### Option 1: Deploy with Vercel (Recommended)

Vercel is the official hosting platform for Next.js applications and offers:
- Automatic deployments from Git repositories
- Serverless functions for API routes
- Global CDN for optimal performance
- Automatic SSL certificates
- Preview deployments for pull requests
- Free tier available

#### Steps to Deploy on Vercel:

1. **Push Your Code to Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Instagram Insights OCR Platform"
   git branch -M main
   git remote add origin https://github.com/your-username/instagram-insights-ocr.git
   git push -u origin main
   ```

2. **Sign Up for Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up with your GitHub/GitLab/Bitbucket account
   - Install the Vercel app for your Git provider

3. **Import Your Project**
   - Click "New Project" in Vercel dashboard
   - Import your Git repository
   - Vercel will auto-detect it as a Next.js project

4. **Configure Environment Variables**
   - In the Vercel project settings, go to "Environment Variables"
   - Add your OpenAI API key:
     ```
     Name: OPENAI_API_KEY
     Value: your_openai_api_key_here
     ```

5. **Deploy**
   - Click "Deploy" and wait for the build to complete
   - Your site will be live at a vercel.app URL
   - You can add a custom domain later

### Option 2: Deploy with Docker

If you prefer containerized deployment:

1. **Build the Docker Image**
   ```bash
   docker build -t instagram-insights-ocr .
   ```

2. **Run the Container**
   ```bash
   docker run -p 3000:3000 -e OPENAI_API_KEY=your_api_key_here instagram-insights-ocr
   ```

### Option 3: Deploy to Any Node.js Host

You can deploy to any hosting provider that supports Node.js:

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Start the Production Server**
   ```bash
   OPENAI_API_KEY=your_api_key_here npm start
   ```

## Environment Variables

The following environment variables are required:

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key with GPT-4 Vision access | Yes |

## Custom Domain Setup (Vercel)

To use your own domain with Vercel:

1. In your Vercel dashboard, go to your project settings
2. Navigate to the "Domains" section
3. Add your custom domain
4. Follow the DNS configuration instructions
5. Vercel will automatically provision an SSL certificate

## Scaling Considerations

For production usage:

1. **API Rate Limits**: Be aware of OpenAI API rate limits
2. **File Size Limits**: Consider implementing additional file validation
3. **Caching**: Implement caching for frequently processed images
4. **Monitoring**: Set up error tracking and performance monitoring

## Troubleshooting

Common deployment issues:

1. **Environment Variables Not Set**: Ensure OPENAI_API_KEY is correctly configured
2. **Build Failures**: Check that all dependencies are properly listed in package.json
3. **API Route Issues**: Verify that API routes work correctly in production
4. **File Upload Limits**: Most hosting platforms have upload size limits

## Updating Your Deployment

To update your deployed application:

1. Push changes to your Git repository
2. If using Vercel, deployment happens automatically
3. For manual deployments, rebuild and redeploy

## Security Considerations

1. **API Key Security**: Never commit API keys to version control
2. **File Validation**: Validate all uploaded files
3. **Rate Limiting**: Implement rate limiting to prevent abuse
4. **Error Handling**: Don't expose sensitive information in error messages

## Cost Considerations

1. **Vercel**: Free tier available, paid plans for higher usage
2. **OpenAI API**: Pay-per-use pricing for GPT-4 Vision
3. **Domain**: Optional cost for custom domain
4. **Storage**: Currently no persistent storage (could be added for caching)
