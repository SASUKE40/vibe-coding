# Commit, Push, and Create Pull Request

Commit all changes, push to remote, and create a GitHub pull request in one workflow.

## Instructions

1. Run `git status` to see all changes (staged and unstaged)
2. Run `git diff` to see unstaged changes and `git diff --cached` for staged
3. Run `git log --oneline -5` to see recent commit style
4. Run `git branch --show-current` to get current branch name

5. Stage all relevant changes:
   ```bash
   git add -A
   ```

6. Create a conventional commit:
   - Use format: `type(scope): description`
   - Types: feat, fix, docs, style, refactor, test, chore, perf, ci, build
   - End with co-authorship line

7. Push to remote:
   ```bash
   git push -u origin HEAD
   ```

8. Create the PR using GitHub CLI:
   ```bash
   gh pr create --title "PR title" --body "$(cat <<'EOF'
   ## Summary
   <1-3 bullet points describing what this PR does>

   ## Changes
   - <key changes made>

   ## Test plan
   - [ ] <how to verify the changes work>

   ---
   Co-Authored-By: Claude <noreply@anthropic.com>
   EOF
   )"
   ```

9. Return the PR URL to the user

## Notes

- If on main/master branch, ask user to create a feature branch first
- If there are no changes to commit, skip to PR creation if commits exist
- If PR already exists for this branch, inform the user and provide the existing PR URL
