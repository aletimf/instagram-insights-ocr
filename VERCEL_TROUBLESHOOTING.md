# Vercel Deployment Troubleshooting Guide

## Issue: "Couldn't find any `pages` or `app` directory"

This error occurs when Vercel cannot locate the Next.js application structure. Here are the solutions:

### Solution 1: Check Project Root Directory

Ensure your project structure looks like this:
```
your-project/
├── src/
│   └── app/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── globals.css
│       ├── api/
│       └── ocr/
├── package.json
├── next.config.ts
└── tsconfig.json
```

### Solution 2: Verify Vercel Project Settings

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → General
4. Check the "Root Directory" setting:
   - If it's set to a subdirectory, change it to `.` (root)
   - If you have a monorepo structure, ensure it points to the correct directory

### Solution 3: Add Vercel Configuration File

Create a `vercel.json` file in your project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

### Solution 4: Check package.json Scripts

Ensure your `package.json` has the correct build script:

```json
{
  "scripts": {
    "dev": "PORT=8000 next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### Solution 5: Force Framework Detection

In your Vercel project settings:
1. Go to Settings → General
2. Set Framework Preset to "Next.js"
3. Redeploy

### Solution 6: Clean Deployment

1. Delete the `.next` folder from your repository (it should be in .gitignore anyway)
2. Commit and push the changes
3. Trigger a new deployment

### Solution 7: Manual Build Command Override

In Vercel project settings:
1. Go to Settings → General
2. Override the Build Command with: `npm run build`
3. Override the Install Command with: `npm install`

### Solution 8: Check Node.js Version

Ensure you're using a compatible Node.js version:
1. In Vercel project settings
2. Go to Settings → General
3. Set Node.js Version to `18.x` or `20.x`

### Solution 9: Environment Variables

Make sure you've added your environment variables:
1. Go to Settings → Environment Variables
2. Add: `OPENAI_API_KEY` with your actual API key
3. Set it for Production, Preview, and Development

### Solution 10: Repository Structure Check

If you're deploying from a subdirectory:
1. Make sure the `src/app` directory is in the correct location relative to `package.json`
2. The structure should be:
   ```
   repository-root/
   ├── package.json          ← Vercel looks here
   ├── next.config.ts
   └── src/
       └── app/              ← Next.js app directory
           ├── layout.tsx
           └── page.tsx
   ```

## Alternative Deployment Methods

If Vercel continues to have issues, try these alternatives:

### Option 1: Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables

### Option 2: Railway
1. Connect your GitHub repository to Railway
2. Railway auto-detects Next.js projects
3. Add environment variables
4. Deploy

### Option 3: DigitalOcean App Platform
1. Create a new app from GitHub
2. Select your repository
3. DigitalOcean will detect the Next.js framework
4. Add environment variables

## Testing Locally Before Deployment

Before deploying, test your build locally:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start the production server
npm start
```

If the local build fails, fix those issues before deploying.

## Common Fixes Summary

1. ✅ Ensure `src/app/` directory exists with `layout.tsx` and `page.tsx`
2. ✅ Set Vercel Root Directory to `.` (project root)
3. ✅ Set Framework Preset to "Next.js"
4. ✅ Add `OPENAI_API_KEY` environment variable
5. ✅ Remove `.next` folder from repository
6. ✅ Use Node.js 18.x or 20.x
7. ✅ Verify `package.json` build scripts

## Still Having Issues?

If none of these solutions work:

1. **Check Vercel Build Logs**: Look for specific error messages
2. **Try a Fresh Repository**: Create a new repository and copy your code
3. **Contact Support**: Reach out to Vercel support with your build logs
4. **Use Alternative Platforms**: Try Netlify, Railway, or DigitalOcean

## Quick Fix Checklist

- [ ] Project has `src/app/layout.tsx` and `src/app/page.tsx`
- [ ] `package.json` is in the root directory
- [ ] Vercel Root Directory is set to `.`
- [ ] Framework Preset is "Next.js"
- [ ] Environment variables are added
- [ ] `.next` folder is not in the repository
- [ ] Build works locally with `npm run build`
