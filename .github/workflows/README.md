# GitHub Actions Workflow

This directory contains the GitHub Actions workflow for automatically deploying the application to GitHub Pages.

## Setup Instructions

To enable automatic deployment to GitHub Pages, follow these steps:

1. **Navigate to Repository Settings**
   - Go to your repository on GitHub
   - Click on "Settings" tab

2. **Configure GitHub Pages**
   - In the left sidebar, click "Pages" under "Code and automation"
   - Under "Source", select **GitHub Actions** (not Deploy from a branch)

3. **Push to Trigger Deployment**
   - The workflow automatically runs when you push to:
     - `main` branch
     - `claude/new-feature-implementation-011CV3mqT9kYCto1DVs3oZHX` branch
   - You can also manually trigger it from the Actions tab

4. **Access Your Site**
   - Once deployed, your site will be available at:
   - `https://<username>.github.io/graphviwer/`

## Workflow Details

The deployment workflow consists of two jobs:

### Build Job
- Checks out the code
- Sets up Node.js 20
- Installs dependencies
- Builds the project
- Uploads the build artifacts

### Deploy Job
- Deploys the build artifacts to GitHub Pages
- Runs after the build job completes successfully

## Manual Deployment

If you prefer to deploy manually using the npm script:

```bash
npm run deploy
```

This will build and deploy to the `gh-pages` branch.

## Troubleshooting

If deployment fails:

1. Check the Actions tab for error logs
2. Ensure GitHub Pages is enabled in repository settings
3. Verify that the workflow has the necessary permissions
4. Make sure the source is set to "GitHub Actions" in Pages settings
