# How to Apply Repository Rulesets

The ruleset JSON files in this directory serve as configuration templates. To apply them to your GitHub repository, follow these steps:

## Applying Rulesets via GitHub UI

1. **Navigate to Repository Settings**
   - Go to your repository on GitHub
   - Click on **Settings** tab
   - Select **Rules** → **Rulesets** from the left sidebar

2. **Create Main Branch Ruleset**
   - Click **New ruleset** → **New branch ruleset**
   - Name: `Main Branch Protection`
   - Enforcement status: **Active**
   - Target branches: Add `main` to the "Include by pattern" field
   - Add rules from `main-branch-protection.json`:
     - ✅ Restrict deletions
     - ✅ Require linear history
     - ✅ Require a pull request before merging (1 approval required)
     - ✅ Require status checks to pass
     - ✅ Block force pushes
   - Click **Create**

3. **Create Develop Branch Ruleset**
   - Click **New ruleset** → **New branch ruleset**
   - Name: `Develop Branch Protection`
   - Enforcement status: **Active**
   - Target branches: Add `develop` to the "Include by pattern" field
   - Add rules from `develop-branch-protection.json`:
     - ✅ Restrict deletions
     - ✅ Require a pull request before merging (1 approval required)
     - ✅ Block force pushes
   - Click **Create**

4. **Create Gitflow Branches Ruleset**
   - Click **New ruleset** → **New branch ruleset**
   - Name: `Gitflow Branches`
   - Enforcement status: **Active**
   - Target branches: Add patterns:
     - `hotfix/*`
     - `feature/*`
     - `features/*`
     - `release/*`
   - This ruleset allows creation and updates with fetch/merge
   - Click **Create**

## Alternative: Using GitHub API

You can also apply rulesets programmatically using the GitHub REST API. The JSON files in this directory can be used as payloads for the API requests.

Example using `curl`:

```bash
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/rulesets \
  -d @main-branch-protection.json
```

## Verification

After creating the rulesets, verify they are active:
1. Go to **Settings** → **Rules** → **Rulesets**
2. You should see all three rulesets listed with "Active" status
3. Click on each ruleset to review the configured rules

## Notes

- Repository admin privileges are required to create and modify rulesets
- Rulesets take effect immediately after creation
- You can temporarily disable a ruleset by changing its enforcement status to "Disabled"
- Consider configuring bypass actors if certain users or teams need to bypass the rules

## References

- [GitHub Rulesets Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
- [GitHub REST API - Rulesets](https://docs.github.com/en/rest/repos/rules)
