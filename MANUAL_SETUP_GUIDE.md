# Manual Setup Guide - Browser Storage Issue Resolution

## Problem Summary

You're experiencing browser storage limitations that prevent uploading the complete project to GitHub. This is why your GitHub repository is missing the `src/app` folder, causing Vercel deployment failures.

## Solution: Manual File Transfer

Since the web interface has storage limitations, you'll need to manually transfer your project files. Here are several approaches:

### Option 1: Download and Re-upload Method

#### Step 1: Download Your Current Project
1. In your current workspace, create a ZIP of your project:
   - Right-click in the file explorer
   - Select "Download" or use the download option
   - This will download all your project files

#### Step 2: Create GitHub Repository Manually
1. Go to https://github.com
2. Click "New repository"
3. Name it `instagram-insights-ocr`
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

#### Step 3: Upload Files via GitHub Web Interface
1. In your new empty repository, click "uploading an existing file"
2. Drag and drop your downloaded project files
3. Or use "choose your files" to select them
4. Make sure to include ALL files, especially the `src/` folder
5. Commit with message: "Initial commit for Instagram Insights OCR Platform"

### Option 2: GitHub Desktop Method

#### Step 1: Download GitHub Desktop
1. Go to https://desktop.github.com
2. Download and install GitHub Desktop
3. Sign in with your GitHub account

#### Step 2: Clone Your Repository
1. In GitHub Desktop, click "Clone a repository from the Internet"
2. Select your `instagram-insights-ocr` repository
3. Choose a local folder to clone to

#### Step 3: Copy Project Files
1. Download your project files from the web workspace
2. Extract them to your local machine
3. Copy ALL files to the cloned repository folder
4. Make sure the `src/app/` folder is included

#### Step 4: Commit and Push
1. GitHub Desktop will show all the new files
2. Add a commit message: "Add Instagram Insights OCR Platform"
3. Click "Commit to main"
4. Click "Push origin"

### Option 3: Command Line Method (If Available)

If you have access to a local terminal with Git:

```bash
# Clone your repository
git clone https://github.com/your-username/instagram-insights-ocr.git
cd instagram-insights-ocr

# Copy your project files here (download and extract first)
# Make sure src/app/ folder is included

# Add all files
git add .

# Commit
git commit -m "Add Instagram Insights OCR Platform"

# Push to GitHub
git push origin main
```

## Critical Files to Ensure Are Uploaded

Make sure these files and folders are in your GitHub repository:

### Essential Application Files:
```
src/
├── app/
│   ├── layout.tsx          ← CRITICAL
│   ├── page.tsx            ← CRITICAL
│   ├── globals.css
│   ├── api/
│   │   └── ocr/
│   │       └── route.ts    ← CRITICAL
│   └── ocr/
│       └── page.tsx        ← CRITICAL
├── components/
├── lib/
│   ├── ocr.ts              ← CRITICAL
│   └── utils.ts
└── hooks/
```

### Configuration Files:
```
package.json                ← CRITICAL
next.config.ts
tsconfig.json
vercel.json                 ← Helps with deployment
.env.example               ← For documentation
```

### Documentation Files:
```
README.md
DEPLOYMENT.md
VERCEL_TROUBLESHOOTING.md
GITHUB_PUBLISHING.md
Dockerfile
deploy.sh
```

## Verification Steps

After uploading to GitHub:

### 1. Check Repository Structure
Your GitHub repository should look like this:
```
your-repo/
├── src/app/layout.tsx      ← Must be present
├── src/app/page.tsx        ← Must be present
├── package.json            ← Must be present
├── vercel.json
└── ... other files
```

### 2. Verify Key Files
Click through your GitHub repository and confirm these files exist:
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/api/ocr/route.ts`
- `src/lib/ocr.ts`
- `package.json`

## After Successful Upload to GitHub

### 1. Deploy to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variable: `OPENAI_API_KEY`
5. Deploy

### 2. If Vercel Still Fails
Follow the solutions in `VERCEL_TROUBLESHOOTING.md`:
1. Check that Root Directory is set to `.`
2. Ensure Framework Preset is "Next.js"
3. Verify all files are present in the repository

## Alternative: Use a Different Code Editor

If browser storage continues to be an issue:

### 1. VS Code Desktop
1. Download VS Code desktop version
2. Clone your GitHub repository locally
3. Copy your project files
4. Commit and push from VS Code

### 2. CodeSandbox
1. Go to https://codesandbox.io
2. Import your GitHub repository
3. Make changes there
4. Sync back to GitHub

### 3. Replit
1. Go to https://replit.com
2. Import from GitHub
3. Edit your project
4. Push changes back

## File Size Optimization

To reduce storage usage:

### Remove Large Files:
```bash
# These folders should not be uploaded:
node_modules/     ← Never upload this
.next/           ← Build output, don't upload
.DS_Store        ← Mac system files
```

### Keep Only Essential Files:
- Source code (`src/` folder)
- Configuration files (`package.json`, `next.config.ts`, etc.)
- Documentation files
- Deployment files

## Troubleshooting Upload Issues

### If Files Are Missing After Upload:
1. Check that you selected ALL files during upload
2. Ensure folders are included, not just individual files
3. Verify the `src/app/` folder structure is intact

### If Upload Keeps Failing:
1. Try uploading in smaller batches
2. Upload core files first (`src/app/`, `package.json`)
3. Add other files in subsequent commits

### If Repository Looks Empty:
1. Make sure you're in the correct repository
2. Check that files were committed (not just staged)
3. Refresh the GitHub page

## Success Verification

You'll know the upload was successful when:
1. ✅ GitHub repository shows all your files
2. ✅ `src/app/layout.tsx` and `src/app/page.tsx` are visible
3. ✅ Vercel can successfully import and deploy your project
4. ✅ Your deployed site works correctly

## Need Help?

If you continue to have issues:
1. Try the GitHub Desktop method (most reliable)
2. Use a local development environment
3. Contact GitHub support about storage limitations
4. Consider using alternative platforms like GitLab or Bitbucket
