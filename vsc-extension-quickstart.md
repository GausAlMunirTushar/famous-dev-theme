# Famous Dev Theme - VS Code Extension Development Guide

## Overview

This guide will help you understand, develop, and publish the Famous Dev Theme extension. The extension includes three premium themes optimized for long coding sessions:

- **Famous Dev Dark**: Premium dark mode with balanced contrast
- **Famous Dev Midnight**: Focus-oriented darker theme with dimmed accents
- **Famous Dev Light**: Clean, minimal light theme for daylight conditions

## Prerequisites

Before you begin working with this extension, make sure you have:

- Visual Studio Code installed
- Node.js and npm installed
- VSCE (Visual Studio Code Extension Manager) installed globally: `npm install -g vsce`
- A GitHub account for repository management
- A Visual Studio Marketplace publisher account (for publishing)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/GausAlMunirTushar/famous-dev-theme.git
cd famous-dev-theme
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Open in VS Code

```bash
code .
```

## Development

### Understanding the Structure

```
famous-dev-theme/
├── package.json          # Extension manifest
├── README.md            # Public documentation
├── CHANGELOG.md         # Release history
├── LICENSE.md           # License information
├── themes/              # Theme files
│   ├── famous-dev-dark.json
│   ├── famous-dev-midnight.json
│   └── famous-dev-light.json
├── screenshots/         # Theme preview images
├── .github/             # GitHub configuration
│   ├── workflows/       # CI/CD workflows
│   └── ISSUE_TEMPLATE/  # Issue templates
└── vsc-extension-quickstart.md # This file
```

### Working with Themes

Each theme is defined as a JSON file in the `themes/` folder:

- **Color definitions**: Define UI colors for VS Code components
- **Token colors**: Define syntax highlighting for code elements
- **File associations**: Define how different file types appear

## Testing the Extension

### 1. Launch Extension

1. Open the extension folder in VS Code
2. Press `F5` to open a new window with the extension loaded
3. Go to File > Preferences > Color Theme and select one of the Famous Dev themes

### 2. Debug Console

- Check the Debug Console for any errors during theme loading
- Use Developer Tools (Help > Toggle Developer Tools) to inspect theme application

## Publishing to Visual Studio Marketplace

### 1. Prerequisites for Publishing

Before publishing, you need:
- A publisher account on the Visual Studio Marketplace
- A Personal Access Token (PAT) with Marketplace permissions

#### Creating a Publisher Account:
1. Go to [Visual Studio Marketplace](https://marketplace.visualstudio.com/)
2. Sign in with your Microsoft account
3. Navigate to the "Publish Extensions" section
4. Create a new publisher account
5. Note your publisher name for later use

#### Creating a Personal Access Token:
1. Go to [Azure DevOps Tokens](https://dev.azure.com/)
2. Generate a new Personal Access Token
3. Select Marketplace as the scope
4. Set permissions to 'Manage' for publishing
5. Copy the token for use below

### 2. Preparing for Publication

1. **Update version**: Increment the version in `package.json`
   ```json
   {
     "version": "1.0.1"  // Increment before publishing
   }
   ```

2. **Update CHANGELOG.md**: Add your release notes

3. **Verify package.json**: Ensure all required fields are correct:
   - `name`, `displayName`, `description`
   - `publisher` (your publisher name)
   - `engines.vscode` version
   - `categories` includes "Themes"
   - `contributes.themes` points to correct files

4. **Test locally**: Make sure all themes work properly

5. **Update screenshots**: Ensure screenshots directory has current theme previews

### 3. Publishing Process

#### Method 1: Manual Publishing

1. **Install vsce globally** (if not done):
   ```bash
   npm install -g vsce
   ```

2. **Package the extension**:
   ```bash
   vsce package
   ```
   This creates a `.vsix` file in your project directory

3. **Publish to marketplace**:
   ```bash
   vsce publish -p <your-personal-access-token>
   ```
   Replace `<your-personal-access-token>` with your actual PAT

4. **Verify publication**: Visit your extension page on the marketplace

#### Method 2: Automated Publishing (Recommended)

The project includes a GitHub Actions workflow for automated publishing:

1. **Set up GitHub repository** and push your code

2. **Add your PAT to GitHub Secrets**:
   - Go to your GitHub repository Settings
   - Navigate to Secrets and Variables > Actions
   - Add a new secret named `VSCE_PAT` with your Personal Access Token

3. **Create and publish a release**:
   - Create a new tag in your repository (e.g., `v1.0.1`)
   - Create a GitHub release for that tag
   - The workflow will automatically publish it to the marketplace

### 4. Post-Publication Steps

1. **Verify on marketplace**: Check that your extension appears correctly
2. **Test the published version**: Install from marketplace and verify functionality
3. **Update documentation**: If needed, update README with new features
4. **Monitor feedback**: Check for user reviews and issues

## Troubleshooting Publishing Issues

### Common Problems:

- **"Unauthorized" errors**: Verify your personal access token has correct permissions
- **"Name already exists"**: Ensure your extension name is unique
- **Validation failures**: Check that all required fields in package.json are present
- **Token not found**: Make sure to use the correct format when publishing

### Useful Commands:

- `vsce validate`: Check if your extension is valid
- `vsce package`: Create a .vsix file for manual testing
- `vsce publish --pre-release`: Publish as pre-release

## Maintaining the Extension

### Regular Updates:
- Address user feedback and bug reports
- Add support for new syntax highlighting based on user requests
- Update themes based on accessibility best practices
- Keep dependencies up-to-date when applicable

### Versioning Strategy:
- Follow semantic versioning (MAJOR.MINOR.PATCH)
- Major: Breaking changes to theme structure
- Minor: New themes, features, or syntax highlighting
- Patch: Bug fixes and small improvements

## Resources

- [VS Code Theme Guide](https://code.visualstudio.com/api/references/theme-color)
- [TextMate Theme Reference](https://macromates.com/manual/en/language_grammars)
- [VSCE Documentation](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Marketplace Publishing Guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
