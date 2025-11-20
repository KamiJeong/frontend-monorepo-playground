# Migration Guide: Yarn to Bun

This document provides a comprehensive guide for migrating from Yarn to Bun package manager in this monorepo.

## Why Bun?

Bun is a modern JavaScript runtime and package manager that offers:

- **Faster installation**: Up to 10x faster than Yarn/npm
- **Built-in tooling**: Bundler, test runner, and package manager in one
- **Drop-in replacement**: Compatible with Node.js and npm packages
- **Workspaces support**: Full support for monorepo workspaces

## Prerequisites

### Installing Bun

Before you begin, you need to install Bun on your system.

#### macOS and Linux

```bash
curl -fsSL https://bun.sh/install | bash
```

#### Windows

```bash
# Using PowerShell
powershell -c "irm bun.sh/install.ps1 | iex"
```

#### Using npm (Cross-platform)

```bash
npm install -g bun
```

#### Verify Installation

```bash
bun --version
```

You should see a version number (e.g., `1.0.0` or higher).

## Migration Steps

### 1. Clean Up Yarn Files

Before installing dependencies with Bun, remove all Yarn-related files:

```bash
# Remove Yarn lock file
rm yarn.lock

# Remove Yarn cache and installation state (if using Yarn v2+)
rm -rf .yarn/cache
rm -rf .yarn/install-state.gz

# Remove node_modules to ensure clean installation
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
```

**Note**: Keep `.yarnrc.yml` if you need it for reference, but it won't be used by Bun.

### 2. Install Dependencies

Install all dependencies using Bun:

```bash
# Install dependencies for the entire monorepo
bun install
```

This will:

- Read `package.json` files from all workspaces
- Create `bun.lock` file (equivalent to `yarn.lock`)
- Install dependencies in `node_modules` directories

### 3. Verify Installation

Check that dependencies are correctly installed:

```bash
# Check Bun lock file exists
ls -la bun.lock

# Verify workspaces are recognized
bun pm ls
```

## Updated Commands

### Package Management

| Task                 | Yarn Command            | Bun Command            |
| -------------------- | ----------------------- | ---------------------- |
| Install dependencies | `yarn install`          | `bun install`          |
| Add dependency       | `yarn add <package>`    | `bun add <package>`    |
| Add dev dependency   | `yarn add -D <package>` | `bun add -d <package>` |
| Remove dependency    | `yarn remove <package>` | `bun remove <package>` |
| Update dependencies  | `yarn upgrade`          | `bun update`           |

### Workspace Commands

| Task                    | Yarn Command                           | Bun Command                                |
| ----------------------- | -------------------------------------- | ------------------------------------------ |
| Run script in workspace | `yarn workspace <name> <script>`       | `bun --filter <name> <script>`             |
| Add to workspace        | `yarn workspace <name> add <package>`  | `bun add <package> --cwd <workspace-path>` |
| Run in all workspaces   | `yarn workspaces foreach run <script>` | `bun run --filter '*' <script>`            |

### Running Scripts

| Task                      | Yarn Command                       | Bun Command                          |
| ------------------------- | ---------------------------------- | ------------------------------------ |
| Run script                | `yarn <script>`                    | `bun run <script>` or `bun <script>` |
| Run in specific workspace | `yarn workspace docs dev`          | `bun --filter docs dev`              |
| Run in all workspaces     | `yarn workspaces foreach run lint` | `bun run --filter '*' lint`          |

## Common Development Commands

### Development

```bash
# Start Storybook (docs app)
bun --filter docs storybook

# Start development server
bun --filter docs dev
```

### Building

```bash
# Build docs app
bun --filter docs build

# Build Storybook
bun --filter docs build-storybook
```

### Linting and Type Checking

```bash
# Lint all workspaces
bun run lint

# Lint specific workspace
bun --filter docs lint

# Fix linting issues
bun run lint:fix

# Type check
bun run type-check
```

### Formatting

```bash
# Format code
bun run format

# Check formatting
bun run format:check
```

## Workspace Configuration

The workspace configuration in `package.json` remains the same:

```json
{
  "workspaces": ["apps/*", "packages/*"]
}
```

Bun automatically detects and uses this workspace configuration.

## Troubleshooting

### Issue: Command not found

**Problem**: `bun: command not found`

**Solution**:

1. Ensure Bun is installed: `curl -fsSL https://bun.sh/install | bash`
2. Restart your terminal or source your shell profile:
   ```bash
   source ~/.bashrc  # or ~/.zshrc for zsh
   ```

### Issue: Lock file conflicts

**Problem**: Both `yarn.lock` and `bun.lock` exist

**Solution**: Remove `yarn.lock` and use only `bun.lock`:

```bash
rm yarn.lock
bun install
```

### Issue: Dependencies not resolving

**Problem**: Packages not found or version conflicts

**Solution**:

1. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules apps/*/node_modules packages/*/node_modules
   bun install
   ```
2. If issues persist, try clearing Bun cache:
   ```bash
   rm -rf ~/.bun/install/cache
   bun install
   ```

### Issue: Scripts failing with Bun

**Problem**: Some npm scripts don't work with Bun

**Solution**:

- Use `bun run` explicitly: `bun run <script>`
- Check if the script requires Node.js-specific features
- Consider using `bunx` (Bun's npx equivalent) for CLI tools

## Performance Benefits

After migrating to Bun, you should notice:

- **Faster installs**: Initial install and subsequent installs are significantly faster
- **Reduced disk space**: More efficient dependency storage
- **Faster script execution**: Built-in performance optimizations
- **Better monorepo handling**: Improved workspace dependency resolution

## Additional Resources

- [Bun Documentation](https://bun.sh/docs)
- [Bun Package Manager Guide](https://bun.sh/docs/cli/install)
- [Bun Workspaces](https://bun.sh/docs/install/workspaces)
- [Migrating from Yarn](https://bun.sh/guides/install/migrate/from-yarn)

## Need Help?

If you encounter any issues during migration:

1. Check the [Bun GitHub Issues](https://github.com/oven-sh/bun/issues)
2. Review the [Bun Discord community](https://bun.sh/discord)
3. Refer to the [troubleshooting section](#troubleshooting) above
