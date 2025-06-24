"use client"

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import { useEffect, useState } from "react"

export function AuthSection() {
  const [hasClerkKeys, setHasClerkKeys] = useState(false)

  useEffect(() => {
    // Check if Clerk is properly configured
    setHasClerkKeys(!!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
  }, [])

  // If Clerk is not configured, don't render auth components
  if (!hasClerkKeys) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="ghost" size="icon" className="nav-icon">
            <LogIn className="h-4 w-4" />
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-2">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-8 w-8 rounded-full",
                userButtonPopoverCard: "glass-effect border border-white/20 dark:border-white/10",
                userButtonPopoverActionButton: "hover:bg-white/10 dark:hover:bg-black/10",
              },
            }}
          />
        </div>
      </SignedIn>
    </div>
  )
}
