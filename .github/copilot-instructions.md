# Digital Money House - AI Agent Instructions

This is a Next.js application for a digital wallet/fintech platform. Follow these instructions to effectively work with the codebase.

## Project Architecture

- **Frontend Framework**: Next.js 15.4 with App Router
- **Authentication**: NextAuth.js v5 with JWT strategy
- **Form Handling**: react-hook-form with Zod validation
- **Styling**: Tailwind CSS with custom theme configuration

### Key Directories

- `/app`: Next.js pages and API routes
- `/components`: React components organized by feature
- `/services`: API client functions
- `/actions`: Server actions for forms
- `/contexts`: React context providers

## Core Concepts

### Authentication Flow

1. Login/signup handled through NextAuth.js credentials provider
2. JWT tokens stored in session
3. Protected routes managed by middleware.ts
4. User session data augmented with accountId and token

Example session usage:

```typescript
const session = await auth();
// Access session.user.token for API calls
// Access session.user.accountId for account operations
```

### API Integration

Services in `/services/index.ts` handle API calls:

- Always include Authorization header with token from session
- Handle common responses like account data, user details, transactions
- Error handling follows pattern of throwing on non-200 status

### Component Patterns

1. **Layout Components**:
   - Use Container component for consistent card-style layouts
   - Navbar/Sidebar navigation through SidebarContext

2. **Form Components**:
   - Controlled inputs with react-hook-form
   - Zod validation schemas
   - Server actions for form submission

3. **Dashboard Features**:
   - Activity tracking with search and filtering
   - Wallet balance display
   - Card management

## Development Workflows

1. **Starting Development**:

   ```bash
   npm run dev
   ```

2. **Adding New Features**:
   - Place page components in `/app` directory
   - Add associated components in `/components`
   - Update services if new API endpoints needed
   - Add form validation schemas if required

3. **Testing Authentication**:
   - Protected routes under /dashboard
   - Public routes: /signin, /signup
   - Use middleware.ts for route protection

## Common Patterns

1. **Error Handling**:

   ```typescript
   try {
     // API call
     if (!res.ok) throw new Error("API Error");
   } catch (error) {
     // Handle error state
   }
   ```

2. **Form Submission**:

   ```typescript
   const [state, formAction] = useActionState(action, initialState);
   // Use in form action={formAction}
   ```

3. **Protected Data Fetching**:
   ```typescript
   const session = await auth();
   const data = await fetchData(session.user.token);
   ```

## Best Practices

1. Use server components by default, mark with "use client" when needed
2. Follow established folder structure for new features
3. Leverage existing UI components from `/components/ui`
4. Use proper TypeScript types for all props and state
5. Handle loading and error states for all async operations
