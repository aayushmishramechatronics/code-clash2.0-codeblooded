import { clerkMiddleware } from "@clerk/nextjs/server"

// Only apply Clerk middleware if keys are available
export default function middleware(request: any) {
  // Check if Clerk keys are available
  if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY) {
    return clerkMiddleware()(request)
  }

  // If no Clerk keys, just continue without auth middleware
  return
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
