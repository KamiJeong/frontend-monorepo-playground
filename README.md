# frontend-monorepo-playground

A modern frontend monorepo playground built with **Bun**, React, TypeScript, and Vite.

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh) v1.0.0 or higher

### Installation

```bash
# Install Bun (if not already installed)
curl -fsSL https://bun.sh/install | bash

# Install dependencies
bun install

# Start Storybook
bun --filter docs storybook
```

## 📦 Package Manager

This project uses **Bun** as the package manager for faster installs and better performance.

### Migrating from Yarn?

If you're migrating from Yarn, please see our [Migration Guide](./MIGRATION.md) for detailed instructions.

## 🛠️ Common Commands

```bash
# Development
bun --filter docs storybook        # Start Storybook
bun --filter docs dev              # Start dev server

# Building
bun --filter docs build            # Build docs app
bun --filter docs build-storybook  # Build Storybook

# Code Quality
bun run lint                       # Lint all workspaces
bun run lint:fix                   # Fix linting issues
bun run format                     # Format code with Prettier
bun run type-check                 # Type check TypeScript
```

## 📚 Documentation

- [Migration Guide](./MIGRATION.md) - Migrating from Yarn to Bun
- [GitHub Configuration](./.github/README.md) - Branch strategy and workflows
- [Copilot Instructions](./.github/copilot-instructions.md) - Development guidelines

## 🏗️ Project Structure

```
.
├── apps/
│   └── docs/                  # Storybook documentation app
├── packages/
│   ├── eslint-config/        # Shared ESLint configurations
│   ├── tailwind-config/      # Shared Tailwind configurations
│   ├── typescript-config/    # Shared TypeScript configurations
│   └── ui/                   # Shared UI component library
└── .github/                  # GitHub configuration
```

## 🔧 Tech Stack

- **Package Manager**: Bun
- **Language**: TypeScript
- **Build Tool**: Vite
- **Framework**: React 19
- **UI Library**: Tailwind CSS
- **Component Documentation**: Storybook
- **Testing**: Vitest with Playwright
- **Linting**: ESLint with TypeScript ESLint
- **Formatting**: Prettier
