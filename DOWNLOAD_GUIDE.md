# How to Download Your Project Files from Web Workspace

## Method 1: Download Individual Files (Recommended)

### Step 1: Open File Explorer
1. In your web workspace, look for the file explorer panel (usually on the left side)
2. You should see all your project files and folders listed

### Step 2: Select All Files
1. Click on the first file in your project root
2. Hold `Ctrl` (Windows/Linux) or `Cmd` (Mac) and click on each file and folder to select multiple items
3. Or use `Ctrl+A` (Windows/Linux) or `Cmd+A` (Mac) to select all files

### Step 3: Download Selected Files
1. Right-click on the selected files
2. Look for "Download" option in the context menu
3. Click "Download"
4. Your browser will download a ZIP file containing all selected files

## Method 2: Download Entire Workspace

### Option A: Using Terminal Command
1. Open the terminal in your web workspace
2. Run this command to create a ZIP of your project:
   ```bash
   zip -r instagram-insights-ocr.zip . -x "node_modules/*" ".next/*" "*.log"
   ```
3. This creates a ZIP file excluding large folders
4. Download the ZIP file from the file explorer

### Option B: Using File Explorer Menu
1. Look for a menu option like "File" → "Download Workspace" or similar
2. Some web IDEs have a download option in the main menu
3. This will download your entire workspace as a ZIP file

## Method 3: Download Specific Folders

### For the src/ folder:
1. Right-click on the `src` folder in the file explorer
2. Select "Download" from the context menu
3. This downloads the entire src folder with all subfolders

### For individual important files:
Download these files one by one if bulk download doesn't work:
- `package.json`
- `next.config.ts`
- `tsconfig.json`
- `vercel.json`
- `README.md`
- All files in `src/app/` folder
- All files in `src/lib/` folder
- All files in `src/components/` folder

## Method 4: Copy-Paste Method (For Small Files)

### For text files like configuration files:
1. Open the file in the editor
2. Select all content (`Ctrl+A` or `Cmd+A`)
3. Copy the content (`Ctrl+C` or `Cmd+C`)
4. Create a new file on your local machine
5. Paste the content and save with the same filename

## What You Should Download

### Essential Files and Folders:
```
📁 src/
  📁 app/
    📄 layout.tsx
    📄 page.tsx
    📄 globals.css
    📁 api/
      📁 ocr/
        📄 route.ts
    📁 ocr/
      📄 page.tsx
  📁 components/
    📁 ui/ (all .tsx files)
  📁 lib/
    📄 ocr.ts
    📄 utils.ts
  📁 hooks/
    📄 use-mobile.ts

📁 public/ (all .svg files)

📄 package.json
📄 next.config.ts
📄 tsconfig.json
📄 vercel.json
📄 README.md
📄 DEPLOYMENT.md
📄 VERCEL_TROUBLESHOOTING.md
📄 Dockerfile
📄 .env.example
```

### Files to SKIP (Don't Download):
- `node_modules/` folder (too large)
- `.next/` folder (build output)
- `.env.local` (contains your API key - keep it secret)
- Any `.log` files

## After Downloading

### Step 1: Extract the ZIP File
1. Locate the downloaded ZIP file on your computer
2. Right-click and select "Extract All" or "Unzip"
3. Choose a folder to extract to (like Desktop or Documents)

### Step 2: Verify File Structure
Make sure your extracted folder contains:
- `src/app/layout.tsx` ✅
- `src/app/page.tsx` ✅
- `package.json` ✅
- All other files from the checklist above

### Step 3: Prepare for GitHub Upload
1. Open the extracted folder
2. You can now upload these files to GitHub using:
   - GitHub web interface (drag and drop)
   - GitHub Desktop
   - Command line Git

## Troubleshooting Download Issues

### If Download Option is Missing:
1. Try right-clicking on different areas of the file explorer
2. Look for menu options like "Export" or "Save As"
3. Check the main menu bar for download options

### If Files Are Too Large:
1. Download in smaller batches
2. Skip the `node_modules` folder (you can recreate it with `npm install`)
3. Focus on downloading the `src/` folder first

### If ZIP File is Corrupted:
1. Try downloading individual folders instead of all files at once
2. Use the terminal method to create a ZIP file
3. Download files in smaller groups

### If Some Files Are Missing:
1. Double-check that you selected all files before downloading
2. Make sure hidden files are visible in the file explorer
3. Download critical files individually to ensure they're included

## Alternative: Use Git Commands

If your web workspace has Git installed:

```bash
# Create a bundle of your repository
git bundle create instagram-insights-ocr.bundle HEAD main

# Then download the .bundle file
```

This creates a complete copy of your Git repository that you can clone locally.

## Next Steps After Download

1. ✅ Extract and verify all files are present
2. ✅ Follow the GitHub upload instructions in `MANUAL_SETUP_GUIDE.md`
3. ✅ Use the `UPLOAD_CHECKLIST.md` to ensure all critical files are uploaded
4. ✅ Deploy to Vercel once your GitHub repository is complete

The key is getting all your project files, especially the `src/app/` folder, properly transferred to GitHub so Vercel can deploy your Instagram Insights OCR Platform successfully.
