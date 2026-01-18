import type { Slide } from "../types";

export const slides: Slide[] = [
  {
    id: 1,
    type: "title",
    title: "Vibe Coding Tips",
    subtitle: "Advanced patterns for productive AI-assisted development",
  },
  {
    id: 2,
    type: "code",
    title: "Model Preference",
    description: "Configure Opus 4.5 with extended thinking for complex tasks",
    code: `// .claude/settings.json
{
  "model": "claude-opus-4-5-20251101",
  "thinking": {
    "enabled": true,
    "budget": "high"
  }
}`,
    language: "json",
  },
  {
    id: 3,
    type: "image",
    title: "Planning Mode",
    imageUrl: "/slides/plan-mode.png",
    caption: "shift+tab twice to enter plan mode",
  },
  {
    id: 4,
    type: "standard",
    title: "Planning Mode",
    bullets: [
      "Press Shift+Tab twice to enter planning mode",
      "Claude explores codebase before implementing",
      "Creates structured plan for complex tasks",
      "Review and approve before execution",
      "Reduces wasted effort on wrong approaches",
    ],
  },
  {
    id: 5,
    type: "image",
    title: "Shared CLAUDE.md",
    imageUrl: "/slides/claude-md.png",
    caption: "Team-wide documentation checked into git",
  },
  {
    id: 6,
    type: "standard",
    title: "Shared Documentation",
    bullets: [
      "Single CLAUDE.md file in repository root",
      "All Claude instances read the same context",
      "Document: architecture, conventions, gotchas",
      "Version controlled with the codebase",
      "Update continuously as patterns emerge",
    ],
  },
  {
    id: 7,
    type: "code",
    title: "Code Review Integration",
    description: "Use @claude on PRs to trigger automatic review",
    code: `# .github/workflows/claude.yml
name: Claude Code
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
  pull_request_review:
    types: [submitted]

jobs:
  claude:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: \${{ secrets.ANTHROPIC_API_KEY }}`,
    language: "yaml",
  },
  {
    id: 8,
    type: "image",
    title: "Claude Review in Action",
    imageUrl: "/slides/claude-review.png",
    caption: "Mention @claude in PR comments to trigger AI-powered code review",
  },
  {
    id: 9,
    type: "standard",
    title: "Chrome Extension Verification",
    bullets: [
      "Claude tests every change using the Chrome extension",
      "Opens browser, tests UI, iterates until it works",
      "Verification looks different for each domain",
      "Bash commands, test suites, browser/phone simulators",
      "Invest in making verification rock-solid",
      "→ code.claude.com/docs/en/chrome",
    ],
  },
  {
    id: 10,
    type: "image",
    title: "PostToolUse Hook",
    imageUrl: "/slides/hooks.png",
    caption: "Auto-format code after Claude modifies files",
  },
  {
    id: 11,
    type: "code",
    title: "PostToolUse Hook",
    description: "Auto-format files after Claude modifies them",
    code: `// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "command": "prettier --write $CLAUDE_FILE_PATH"
      }
    ]
  }
}`,
    language: "json",
  },
  {
    id: 12,
    type: "image",
    title: "Slash Commands",
    imageUrl: "/slides/slash-commands.png",
    caption: "/commit-push-pr - Commit, push, and open a PR",
  },
  {
    id: 13,
    type: "code",
    title: "Slash Commands",
    description: "Custom commands in .claude/commands/",
    code: `---
description: "Commit, push, and open a PR"
---

Follow these steps in order:

1. Run \`git status\` to see what files have changed
2. Run \`git diff\` to review the changes
3. Stage the appropriate files with \`git add\`
4. Create a commit with a clear, descriptive message following conventional commits format
5. Push to the remote branch (create remote branch if needed with \`-u origin <branch>\`)
6. Create a Pull Request using \`gh pr create\` with:
   - A clear title summarizing the changes
   - A description with:
     - Summary of what changed and why
     - Any testing done
     - Any notes for reviewers

If there are any issues at any step, stop and report them.`,
    language: "markdown",
  },
  {
    id: 14,
    type: "image",
    title: "Permissions Management",
    imageUrl: "/slides/permissions.png",
    caption: "/permissions - Pre-allow safe commands",
  },
  {
    id: 15,
    type: "code",
    title: "Permissions Management",
    description: "Configure allowed operations in settings",
    code: `// .claude/settings.json
{
  "permissions": {
    "allow": [
      "Bash(pnpm run build:*)",
      "Bash(pnpm run lint:*)",
      "Bash(pnpm run test:*)",
      "Bash(git:*)",
      "Edit",
      "Write"
    ],
    "deny": [
      "Bash(rm -rf *)"
    ]
  }
}`,
    language: "json",
  },
  {
    id: 16,
    type: "image",
    title: "Hybrid Local + Web Sessions",
    imageUrl: "/slides/web-sessions.png",
    caption: "claude.ai/code running alongside local terminal instances",
  },
  {
    id: 17,
    type: "split",
    title: "Hybrid Local + Web Sessions",
    left: {
      heading: "Local (Terminal)",
      bullets: [
        "Full file system access",
        "Run tests & builds",
        "Git operations",
        "Fast iteration",
      ],
    },
    right: {
      heading: "Web (claude.ai/code)",
      bullets: [
        "Visual file browser",
        "Persistent history",
        "Easy sharing",
        "Planning & design",
      ],
    },
  },
  {
    id: 18,
    type: "quote",
    title: "The Most Important Tip",
    quote:
      "Give Claude a way to verify its work. If Claude has that feedback loop, it will 2-3x the quality of the final result.",
  },
];

export const TOTAL_SLIDES = slides.length;
