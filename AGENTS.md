# AGENTS.md

This file provides guidance to AI coding agents working with this TanStack Start codebase.

## Adding a New Page

1. Create a route file in `src/routes/` following the naming convention:
   - `mypage.tsx` for `/mypage`
   - `mypage.$id.tsx` for `/mypage/:id` (dynamic segment)
   - `mypage.index.tsx` for `/mypage` index when parent has children

2. Use `createFileRoute` and export as `Route`:

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mypage")({
  component: MyPageComponent,
});

function MyPageComponent() {
  return <div>My Page</div>;
}
```

3. The route tree auto-regenerates in `src/routeTree.gen.ts` on dev server restart.

## Adding Server-Side Data Fetching

Use `createServerFn` in `src/utils/` and call it in route loaders:

```tsx
// src/utils/mydata.tsx
import { createServerFn } from "@tanstack/react-start";

export const fetchMyData = createServerFn().handler(async () => {
  const res = await fetch("https://api.example.com/data");
  return res.json();
});

// src/routes/mypage.tsx
export const Route = createFileRoute("/mypage")({
  loader: async () => fetchMyData(),
  component: MyPageComponent,
});

function MyPageComponent() {
  const data = Route.useLoaderData();
  return <div>{data.title}</div>;
}
```

## Adding an API Route

Create files in `src/routes/api/` with `server.handlers`:

```tsx
// src/routes/api/myendpoint.ts
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/myendpoint")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return Response.json({ message: "Hello" });
      },
      POST: async ({ request }) => {
        const body = await request.json();
        return Response.json({ received: body });
      },
    },
  },
});
```

## Adding Middleware

For API routes, use `createMiddleware` with `.server()`:

```tsx
import { createMiddleware } from "@tanstack/react-start";

const authMiddleware = createMiddleware().server(async ({ next }) => {
  // Pre-processing
  const result = await next();
  // Post-processing (can modify result.response.headers)
  return result;
});

export const Route = createFileRoute("/api/protected")({
  server: {
    middleware: [authMiddleware],
    handlers: { GET: async () => Response.json({ data: "protected" }) },
  },
});
```

For server functions, use `createMiddleware` with both `.client()` and `.server()`:

```tsx
const logMiddleware = createMiddleware({ type: "function" })
  .client(async (ctx) => {
    // Runs on client before server call
    return ctx.next({ sendContext: { timestamp: Date.now() } });
  })
  .server(async (ctx) => {
    // Runs on server, has access to ctx.context from client
    return ctx.next();
  });
```

## Adding Navigation Links

Use `Link` component from `@tanstack/react-router`:

```tsx
import { Link } from '@tanstack/react-router'

<Link to="/mypage" activeProps={{ className: 'font-bold' }}>
  My Page
</Link>

// With dynamic params
<Link to="/posts/$postId" params={{ postId: '123' }}>
  Post 123
</Link>
```

## Layout Routes

Create a layout that wraps child routes using `Outlet`:

```tsx
// src/routes/dashboard.tsx (layout for /dashboard/*)
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div>
      <nav>Dashboard Nav</nav>
      <Outlet /> {/* Child routes render here */}
    </div>
  );
}
```

## Error Handling

- Global error boundary: `src/components/DefaultCatchBoundary.tsx`
- Global 404: `src/components/NotFound.tsx`
- Route-specific: Add `errorComponent` to route options
- Throw `notFound()` from `@tanstack/react-router` for 404s in loaders
