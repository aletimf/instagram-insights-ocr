# Manual GitHub Publishing Guide

Since you're experiencing browser storage limitations with the web interface, here's how to manually publish your Instagram Insights OCR Platform to GitHub using the command line.

## Prerequisites

1. A GitHub account
2. Git installed on your system
3. Access to a terminal/command prompt

## Step-by-Step Manual Publishing

### 1. Create a New Repository on GitHub

1. Go to https://github.com
2. Log in to your account
3. Click the "+" icon in the top right corner
4. Select "New repository"
5. Name your repository (e.g., "instagram-insights-ocr")
6. Choose "Public" or "Private" (your preference)
7. **Do NOT** initialize with a README
8. **Do NOT** add .gitignore or license yet
9. Click "Create repository"

### 2. Prepare Your Local Repository

Open a terminal/command prompt and navigate to your project directory:

```bash
# Navigate to your project directory
cd /project/sandbox/user-workspace

# Initialize git repository (if not already done)
git init

# Add all files to git
git add .

# Create initial commit
git commit -m "Initial commit for Instagram Insights OCR Platform"
```

### 3. Connect to GitHub and Push

Replace `your-username` with your actual GitHub username:

```bash
# Add the remote origin (replace with your actual repository URL)
git branch -M main
git remote add origin https://github.com/your-username/instagram-insights-ocr.git

# Push to GitHub
git push -u origin main
```

### 4. Add Your OpenAI API Key as a Secret (For Vercel Deployment)

After pushing to GitHub:

1. Go to your repository on GitHub
2. Click "Settings" tab
3. In the left sidebar, click "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Name: `OPENAI_API_KEY`
6. Value: Your actual OpenAI API key
7. Click "Add secret"

### 5. Alternative: Create a GitHub Personal Access Token

If you encounter authentication issues:

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token with "repo" permissions
3. Use it to authenticate when pushing:

```bash
# Instead of using your password, use the personal access token
git remote set-url origin https://your-username:your-token@github.com/your-username/instagram-insights-ocr.git
```

### 6. Deploy to Vercel

Once your code is on GitHub:

1. Go to https://vercel.com
2. Sign up or log in
3. Click "New Project"
4. Import your GitHub repository
5. In the environment variables section, add:
   - Name: `OPENAI_API_KEY`
   - Value: Your OpenAI API key
6. Click "Deploy"

## Troubleshooting Browser Storage Issues

If you continue to experience browser storage issues:

### Option 1: Use GitHub Desktop
1. Download GitHub Desktop from https://desktop.github.com
2. Clone your repository locally
3. Copy your project files to the local repository folder
4. Commit and push using GitHub Desktop

### Option 2: Download and Re-upload
1. Download your project as a ZIP file
2. Extract it on your local machine
3. Follow the steps above using your local terminal

### Option 3: Use Git from a Different Environment
1. If you have access to a different development environment (like VS Code locally)
2. Copy your files there
3. Use Git from that environment

## Repository Structure

Your repository will include:

```
├── DEPLOYMENT.md          # Detailed deployment guide
├── Dockerfile             # Docker configuration
├── README.md              # Project documentation
├── deploy.sh              # Deployment script
├── .env.example          # Sample environment file
├── .gitignore            # Files to exclude from git
├── package.json          # Project dependencies and scripts
├── src/                  # Source code
│   ├── app/              # Next.js app directory
│   ├── components/       # UI components
│   ├── lib/              # Utility functions
│   └── hooks/            # Custom React hooks
└── public/               # Static assets
```

## Security Considerations

- Never commit your actual `.env.local` file containing API keys
- The `.gitignore` file already excludes all `.env*` files
- Always use environment variables for sensitive information
- Add `OPENAI_API_KEY` as a secret in GitHub/Vercel, not in the code

## Post-Publishing Steps

1. Verify all files are correctly uploaded to GitHub
2. Test the deployment process on Vercel
3. Update any documentation with your live URL
4. Share your repository with collaborators if needed
