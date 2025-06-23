"use client"

import type React from "react"
import { useState } from "react"

import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { NotificationPanel } from "@/components/notification-panel"
import { SidebarTrigger } from "@/components/sidebar-trigger"
import { ChatBotModal } from "@/components/chatbot-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ExternalLink, HelpCircle, Bot } from "lucide-react"

interface LayoutWrapperProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export function LayoutWrapper({ children, title, subtitle }: LayoutWrapperProps) {
  const [isChatBotOpen, setIsChatBotOpen] = useState(false)

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <div className="flex flex-col min-h-screen">
            {/* Floating Header */}
            <header className="sticky top-2 sm:top-3 lg:top-4 z-10 mx-2 sm:mx-4 lg:mx-6 mt-2 sm:mt-3 lg:mt-4">
              <div className="glass-header rounded-xl sm:rounded-2xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <SidebarTrigger />
                    <div>
                      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
                      {subtitle && (
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <NotificationPanel />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
                        >
                          <Settings className="h-4 w-4" />
                          <span className="sr-only">Settings</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-56 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-white/20 dark:border-gray-700/20"
                      >
                        <DropdownMenuLabel className="text-gray-900 dark:text-gray-100">Settings</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer hover:bg-white/60 dark:hover:bg-gray-800/60"
                          onClick={() => setIsChatBotOpen(true)}
                        >
                          <Bot className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <span>AI Support</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-white/60 dark:hover:bg-gray-800/60">
                          <HelpCircle className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
                          <span>User Guide</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer hover:bg-white/60 dark:hover:bg-gray-800/60"
                          onClick={() => window.open("https://drive.google.com/drive/folders/your-folder-id", "_blank")}
                        >
                          <ExternalLink className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400" />
                          <span>Drive Resources</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </header>

            <main className="flex-1 p-3 sm:p-4 lg:p-6">{children}</main>
          </div>
        </SidebarInset>
      </div>

      {/* ChatBot Modal */}
      <ChatBotModal isOpen={isChatBotOpen} onClose={() => setIsChatBotOpen(false)} />
    </SidebarProvider>
  )
}
