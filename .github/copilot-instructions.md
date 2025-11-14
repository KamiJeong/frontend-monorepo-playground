# Copilot Instructions for Frontend Monorepo Playground

This document provides guidance for GitHub Copilot when working with this repository.

## Communication Preferences

- **Language**: Respond in Korean (한글) when communicating with users
- **Code Comments**: Code comments and documentation should remain in English for international compatibility
- **Commit Messages**: Write commit messages in English following conventional commits format

## Repository Overview

This is a **frontend monorepo** playground project using **Yarn Workspaces** to manage multiple packages and applications. The repository follows the **Gitflow** branching strategy for development workflow.

## Tech Stack

- **Package Manager**: Yarn v4.11.0
- **Language**: TypeScript
- **Build Tool**: Vite
- **Framework**: React 19
- **UI Library**: React with Tailwind CSS
- **Component Documentation**: Storybook
- **Testing**: Vitest with Playwright for browser testing
- **Linting**: ESLint with TypeScript ESLint
- **Formatting**: Prettier

## Repository Structure

```
.
├── apps/                    # Applications
│   └── docs/               # Storybook documentation app
├── packages/               # Shared packages
│   ├── eslint-config/     # Shared ESLint configurations
│   ├── tailwind-config/   # Shared Tailwind configurations
│   ├── typescript-config/ # Shared TypeScript configurations
│   └── ui/                # Shared UI component library
├── .github/               # GitHub configuration
└── package.json          # Root package.json with workspaces
```

## Development Workflow

### Branch Strategy (Gitflow)

- **`main`**: Production-ready code, protected branch requiring PR approval
- **`develop`**: Integration branch for features, protected branch requiring PR approval
- **`feature/*`** or **`features/*`**: New features, branch from `develop`, merge to `develop`
- **`hotfix/*`**: Urgent fixes, branch from `main`, merge to both `main` and `develop`
- **`release/*`**: Release preparation, branch from `develop`, merge to both `main` and `develop`

### Creating Branches

```bash
# Feature branch
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# Hotfix branch
git checkout main
git pull origin main
git checkout -b hotfix/your-fix-name
```

## Code Style and Standards

### Prettier Configuration

- **Single quotes**: Yes
- **Trailing comma**: All
- **Print width**: 100 characters
- **Tab width**: 2 spaces
- **Semicolons**: Yes
- **End of line**: LF

### EditorConfig

- **Charset**: UTF-8
- **End of line**: LF
- **Indent size**: 2 spaces
- **Indent style**: Space
- **Insert final newline**: Yes

### ESLint

- Use the shared ESLint configurations from `@playground/eslint-config`
- Available configs: `base.js`, `next.js`, `react-internal.js`, `storybook.js`
- Run linting with: `yarn lint` or `npm run lint`

### TypeScript

- Use shared TypeScript configurations from `@playground/typescript-config`
- Available configs: `base.json`, `nextjs.json`, `react-library.json`
- Strict mode is encouraged

## Working with the Monorepo

### Installing Dependencies

```bash
# Install all dependencies across the monorepo
yarn install
```

### Running Scripts

```bash
# Run a script in a specific workspace
yarn workspace docs dev
yarn workspace docs storybook

# Run linting across all packages
yarn workspaces foreach run lint
```

### Adding Dependencies

```bash
# Add to root
yarn add -D package-name

# Add to a specific workspace
yarn workspace docs add package-name
yarn workspace @playground/ui add package-name
```

## Component Development

### UI Package (`@playground/ui`)

- Located in `packages/ui/`
- Components should be in `src/components/`
- Hooks should be in `src/hooks/`
- Utilities should be in `src/lib/`
- Uses Tailwind CSS for styling
- Uses `class-variance-authority` for component variants
- Uses `clsx` and `tailwind-merge` for class composition

### Component Exports

Components are exported through the package.json exports field:
- `@playground/ui/components/*` - Individual components
- `@playground/ui/hooks/*` - Custom hooks
- `@playground/ui/lib/*` - Utility functions
- `@playground/ui/globals.css` - Global styles

### Storybook Documentation

- Located in `apps/docs/`
- Run with: `yarn workspace docs storybook`
- Build with: `yarn workspace docs build-storybook`
- Stories should be co-located with components when possible

## Testing

### Vitest

- Test runner: Vitest v4
- Browser testing: Vitest with Playwright
- Coverage: v8 coverage provider
- Run tests from the workspace that contains them

### Storybook Testing

- Uses `@storybook/addon-vitest` for component testing
- Uses `@storybook/addon-a11y` for accessibility testing

## Code Review and Quality Assurance

### Self-Review Requirements

- **Always perform code review**: Before finalizing any changes, open a Pull Request (PR) and review your own code for clarity, correctness, and maintainability.
- **Address review feedback**: Carefully examine all comments from reviewers and address relevant issues.
- **Security scanning**: If available, run security analysis tools such as GitHub CodeQL or other static analysis tools to identify potential vulnerabilities.
- **Iterative improvement**: If significant changes are made after review, repeat the review process.

### Review Process

1. Make your code changes.
2. Open a Pull Request (PR) and review your own changes before requesting review from others.
3. Request a review from at least one other team member.
4. Address any valid concerns or suggestions from the review.
5. If available, run security analysis tools (e.g., GitHub CodeQL) and fix any issues discovered.
6. Document any remaining known issues in your commit message or PR description.

## Best Practices

1. **Workspace References**: Use workspace protocol (`workspace:^` or `workspace:*`) for internal dependencies
2. **Code Formatting**: Run Prettier before committing
3. **Linting**: Ensure no ESLint errors before creating a PR
4. **Type Safety**: Leverage TypeScript's type system, avoid `any` when possible
5. **Component Design**: Follow React best practices, use functional components and hooks
6. **Accessibility**: Consider accessibility in UI components (use semantic HTML, ARIA attributes)
7. **Git Commits**: Write clear, descriptive commit messages
8. **Pull Requests**: Use the PR template and ensure all checks pass

## Common Commands

```bash
# Development
yarn workspace docs dev              # Start docs app in dev mode
yarn workspace docs storybook        # Start Storybook

# Building
yarn workspace docs build            # Build docs app
yarn workspace docs build-storybook  # Build Storybook

# Linting
yarn workspace docs lint             # Lint docs
yarn workspace @playground/ui lint   # Lint UI package
yarn workspaces foreach run lint     # Lint all workspaces

# Testing
yarn workspace docs preview          # Preview production build
```

## Key Files

- `.prettierrc.json` - Prettier configuration
- `.editorconfig` - Editor configuration
- `package.json` - Root package configuration with workspace definitions
- `.github/PULL_REQUEST_TEMPLATE.md` - PR template
- `.github/ISSUE_TEMPLATE/` - Issue templates
- `.github/rulesets/` - Branch protection rulesets (reference only)

## Additional Resources

- [Yarn Workspaces Documentation](https://yarnpkg.com/features/workspaces)
- [Vite Documentation](https://vitejs.dev/)
- [Storybook Documentation](https://storybook.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vitest Documentation](https://vitest.dev/)
