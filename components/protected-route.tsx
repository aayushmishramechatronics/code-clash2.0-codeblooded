"use client"

import type React from "react"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { LogIn, Shield } from "lucide-react"
import { useEffect, useState } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const [hasClerkKeys, setHasClerkKeys] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if Clerk is properly configured
    setHasClerkKeys(!!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
  }, [])

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  // If Clerk is not configured, render children directly (no auth protection)
  if (!hasClerkKeys) {
    return <>{children}</>
  }

  const defaultFallback = (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card p-8 rounded-2xl text-center max-w-md">
        <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
        <p className="text-muted-foreground mb-6">
          Please Sign-In to HackTracker to Access our Website.
        </p>
        <SignInButton mode="modal">
          <Button size="lg" className="w-full">
            <LogIn className="mr-2 h-4 w-4" />
            Sign In to Continue
          </Button>
        </SignInButton>
      </div>
    </div>
  )

  return (
    <>
      <SignedOut>{fallback || defaultFallback}</SignedOut>
      <SignedIn>{children}</SignedIn>
    </>
  )
}
