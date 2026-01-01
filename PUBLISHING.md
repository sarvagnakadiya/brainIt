# Publishing BrainIt to NPM

## Prerequisites

1. Create an NPM account at https://www.npmjs.com/signup
2. Verify your email address

## Publishing Steps

### 1. Login to NPM

```bash
npm login
```

You'll be prompted for:
- Username
- Password
- Email
- One-time password (if you have 2FA enabled)

### 2. Check Package Name Availability

Before publishing, check if the name "brainit" is available:

```bash
npm search brainit
```

If the name is taken, you can either:
- Choose a different name (update the "name" field in package.json)
- Use a scoped package name like "@yourusername/brainit"

### 3. Update Package Details

Before publishing, update these fields in package.json:
- `author`: Add your name
- `repository.url`: Update with your GitHub repo URL (if you have one)
- `bugs.url`: Update with your GitHub issues URL
- `homepage`: Update with your GitHub repo URL

### 4. Build the Package

```bash
npm run build
```

### 5. Test Locally First

Test the package locally before publishing:

```bash
npm link
brainit
```

This creates a symlink and lets you test the CLI globally.

### 6. Publish to NPM

```bash
npm publish
```

If the name is taken, you'll get an error. In that case, use a scoped package:

```bash
npm publish --access public
```

### 7. Test the Published Package

After publishing, test it works:

```bash
npx brainit@latest
```

## Updating the Package

When you make changes and want to publish an update:

1. Update the version in package.json (following semver):
   - Patch (1.0.0 → 1.0.1): Bug fixes
   - Minor (1.0.0 → 1.1.0): New features (backward compatible)
   - Major (1.0.0 → 2.0.0): Breaking changes

2. Or use npm version:
   ```bash
   npm version patch  # for bug fixes
   npm version minor  # for new features
   npm version major  # for breaking changes
   ```

3. Publish the update:
   ```bash
   npm publish
   ```

## After Publishing

Once published, users can install and run your package:

```bash
# Run without installing
npx brainit

# Install globally
npm install -g brainit
brainit

# Install locally in a project
npm install brainit
```

## Useful Commands

```bash
# View your published package
npm view brainit

# Check what files will be included in the package
npm pack --dry-run

# Unpublish (only within 72 hours of publishing)
npm unpublish brainit@1.0.0
```

## Tips

- Test thoroughly before publishing
- Use semantic versioning
- Keep your README.md up to date
- Add a CHANGELOG.md for tracking changes
- Consider adding GitHub Actions for automated testing
