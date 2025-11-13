# Repository Settings

This directory contains GitHub repository configuration files including branch rulesets, issue templates, and pull request templates.

## Branch Strategy

This repository follows the **Gitflow** branching model:

### Protected Branches

- **`main`**: Production-ready code
  - Requires at least 1 approval for PRs
  - Requires linear history
  - No direct pushes (PRs only)
  - No force pushes
  - Cannot be deleted

- **`develop`**: Integration branch for features
  - Requires at least 1 approval for PRs
  - No direct pushes (PRs only)
  - No force pushes
  - Cannot be deleted

### Working Branches

- **`feature/*`** or **`features/*`**: New features
  - Branch from: `develop`
  - Merge back to: `develop`
  
- **`hotfix/*`**: Emergency fixes
  - Branch from: `main`
  - Merge back to: both `main` and `develop`
  
- **`release/*`**: Release preparation
  - Branch from: `develop`
  - Merge back to: both `main` and `develop`

## Branch Rulesets

Rulesets are stored in the `.github/rulesets/` directory:

- `main-branch-protection.json`: Protection rules for the main branch
- `develop-branch-protection.json`: Protection rules for the develop branch
- `gitflow-branches.json`: Rules for feature, hotfix, and release branches

**Note**: These ruleset files are reference documentation. To apply them to the repository, they need to be configured through the GitHub UI at:
`Settings > Rules > Rulesets`

## Issue Templates

Available issue templates in `.github/ISSUE_TEMPLATE/`:

- **Bug Report** (`bug_report.md`): For reporting bugs and issues
- **Feature Request** (`feature_request.md`): For suggesting new features

## Pull Request Template

The PR template (`.github/PULL_REQUEST_TEMPLATE.md`) provides a standardized format for all pull requests, ensuring:
- Clear description of changes
- Proper categorization
- Link to related issues
- Testing confirmation
- Review checklist

## Usage

### Creating a Feature Branch
```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### Creating a Hotfix Branch
```bash
git checkout main
git pull origin main
git checkout -b hotfix/your-fix-name
```

### Creating a Release Branch
```bash
git checkout develop
git pull origin develop
git checkout -b release/v1.0.0
```

## References

- [GitHub Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
- [Gitflow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
