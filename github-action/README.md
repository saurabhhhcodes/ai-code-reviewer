# 🤖 RepoSage AI Pull Request Reviewer GitHub Action

Automate code reviews directly inside your Pull Requests! This action intercepts code additions on new pull requests, leverages Groq's high-speed Llama models, and leaves inline line-by-line developer recommendations.

---

## ✨ Features

- **Consolidated PR Reviews**: Submits a unified review matching GitHub's official code review workflow.
- **Precision Line Audits**: Comments are placed directly on the exact lines in the new file where the issue or recommendation resides.
- **Multi-category Feedback**: Identifies bugs, styling issues, optimization opportunities, and security threats (leaked API keys, etc.).
- **Smart Path Filtering**: Easily exclude boilerplate or dependencies (`package-lock.json`, `dist/`, etc.).
- **Interactive Markdown Support**: AI recommendations contain syntax-highlighted code recommendations that developers can easily read and merge.

---

## 🚀 Setup & Usage

Add this action to your repository by creating a file named `.github/workflows/reposage-review.yml` with the following content:

```yaml
name: RepoSage AI PR Reviewer

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write # Required to allow posting review comments

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Run RepoSage AI PR Audit
        uses: your-username/ai-code-reviewer/github-action@main
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          groq-api-key: ${{ secrets.GROQ_API_KEY }}
          exclude-paths: 'package-lock.json,dist/**,build/**'
```

---

## ⚙️ Inputs Configuration

| Input Name | Description | Required | Default |
| :--- | :--- | :---: | :--- |
| `github-token` | The standard GITHUB_TOKEN used to fetch PR data and write reviews. | **Yes** | N/A |
| `groq-api-key` | Your active Groq API Key to power the technical review logic. | **Yes** | N/A |
| `exclude-paths` | Comma-separated list of glob patterns/file paths to ignore during scanning. | No | `package-lock.json,yarn.lock,pnpm-lock.yaml,dist/**,build/**` |

---

## 🛠️ Contributor Development Guide

This is an official **GSSoC '26** project! If you want to make changes or add features to the GitHub Action, follow these instructions to set up your environment locally:

### 1. Prerequisite Installations
Navigate to the action folder:
```bash
cd github-action
npm install
```

### 2. File Overview
- `action.yml`: Action meta schema defining inputs, branding, and execution script.
- `index.js`: Core engine logic, which fetches the PR diff, parses changes, calls Groq, and submits inline comments.
- `dist/index.js`: Compiled, single-file bundle built by `@vercel/ncc`. **This compiled file is what GitHub actually runs!**

### 3. Bundling the Action
GitHub Actions require all code and dependencies to be packaged into a single file for execution. After making changes to `index.js`, compile the code:
```bash
npm run build
```

Verify that the build completes with zero errors and regenerates `dist/index.js` before submitting a Pull Request!
