# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TanStack Start application - a full-stack React framework powered by TanStack Router, Vite, and Nitro.

## Commands

```bash
pnpm dev      # Start development server on port 3000
pnpm build    # Build for production (runs vite build && tsc --noEmit)
pnpm preview  # Preview production build
pnpm start    # Run production server (node .output/server/index.mjs)
pnpm commit   # Interactive conventional commit (commitizen)
pnpm create-pr # Create PR with GitHub CLI
```

## Claude Code Commands

```
/commit-push-pr   # Commit all changes, push, and create PR in one step
/quick-commit     # Stage all changes and commit with a descriptive message
/test-and-fix     # Run tests and fix any failures
/review-changes   # Review uncommitted changes and suggest improvements
/first-principles # Apply first-principles thinking to the problem
```

## Development Workflow

Give Claude verification loops for 2-3x quality improvement:

1. Make changes
2. Run typecheck (`pnpm build`)
3. Run tests
4. Lint before committing
5. Before creating PR: run full lint and test suite

## Architecture

### Key Concepts

**File-based Routing**: Routes are defined in `src/routes/`. The route tree is auto-generated in `src/routeTree.gen.ts`.

**Route Patterns**:
- `index.tsx` - Index route for a path
- `posts.tsx` - Layout route (wraps child routes like `posts.$postId.tsx`)
- `posts.$postId.tsx` - Dynamic segment route
- `_pathlessLayout.tsx` - Pathless layout (groups routes without adding URL segments)
- `__root.tsx` - Root layout wrapping all routes

**Server Functions**: Use `createServerFn()` from `@tanstack/react-start` for server-side data fetching (see `src/utils/posts.tsx`).

**API Routes**: Place in `src/routes/api/`. Use `createFileRoute` with `server.handlers` for HTTP methods (see `src/routes/api/users.ts`).

**Middleware**: Use `createMiddleware()` for request/response processing in API routes.

### Path Aliases

`~/*` maps to `./src/*` (configured in tsconfig.json)

## Code Style & Conventions

- Prefer `type` over `interface`; never use `enum` (use string literal unions instead)
- Use descriptive variable names
- Keep functions small and focused
- Write tests for new functionality
- Handle errors explicitly, don't swallow them

## Things Claude Should NOT Do

- Don't use `any` type in TypeScript without explicit approval
- Don't skip error handling
- Don't commit without running tests first
- Don't make breaking API changes without discussion

## Project-Specific Patterns

<!-- Add patterns as they emerge from your codebase -->

---

_Update this file continuously. Every mistake Claude makes is a learning opportunity._
