"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bot, User, Send, Loader2, AlertTriangle } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isError?: boolean
}

interface ChatBotModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ChatBotModal({ isOpen, onClose }: ChatBotModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI construction assistant. I can help you with:\n\n• Material calculations and estimations\n• Project planning and scheduling\n• Supplier recommendations\n• Construction best practices\n• Safety guidelines\n• Cost estimation\n• Weather impact analysis\n\nHow can I assist you with your construction project today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasConfigError, setHasConfigError] = useState(false)

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)
    setHasConfigError(false)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.isConfigError) {
          setHasConfigError(true)
        }
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error: any) {
      console.error("Error sending message:", error)

      let errorContent = "I apologize, but I'm having trouble connecting right now. "

      if (error.message.includes("OpenAI API key not configured")) {
        errorContent =
          "⚙️ **Configuration Required**\n\nTo enable AI assistance, please:\n\n1. Get your OpenAI API key from https://platform.openai.com/api-keys\n2. Add it to your environment variables as `OPENAI_API_KEY`\n3. Restart the application\n\nOnce configured, I'll be able to provide intelligent construction assistance!"
        setHasConfigError(true)
      } else if (error.message.includes("Invalid OpenAI API key")) {
        errorContent =
          "🔑 **Invalid API Key**\n\nThe OpenAI API key appears to be invalid. Please:\n\n1. Check your API key at https://platform.openai.com/api-keys\n2. Ensure it's correctly set in your environment variables\n3. Make sure the key has the necessary permissions"
        setHasConfigError(true)
      } else if (error.message.includes("Rate limit")) {
        errorContent =
          "⏱️ **Rate Limit Exceeded**\n\nToo many requests have been made. Please wait a moment and try again."
      } else if (error.message.includes("quota exceeded")) {
        errorContent =
          "💳 **Quota Exceeded**\n\nYour OpenAI usage quota has been exceeded. Please check your billing and usage limits at https://platform.openai.com/usage"
        setHasConfigError(true)
      } else if (error.message.includes("API access forbidden")) {
        errorContent =
          "🚫 **Access Forbidden**\n\nAPI access is restricted. Please check your OpenAI account status and billing at https://platform.openai.com/account"
        setHasConfigError(true)
      } else {
        errorContent += "Please try again in a moment."
      }

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: errorContent,
        timestamp: new Date(),
        isError: true,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            AI Construction Assistant
          </DialogTitle>
          <DialogDescription>
            Get expert advice on construction materials, planning, and best practices
          </DialogDescription>
        </DialogHeader>

        {hasConfigError && (
          <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800 dark:text-orange-200">
              <strong>Configuration needed:</strong> OpenAI API key required for AI functionality.{" "}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                Get your API key here
              </a>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex-1 flex flex-col gap-4">
          {/* Messages Area */}
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.isError ? "bg-orange-100 dark:bg-orange-900" : "bg-blue-100 dark:bg-blue-900"
                      }`}
                    >
                      {message.isError ? (
                        <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                      ) : (
                        <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                  )}

                  <div className={`max-w-[80%] ${message.role === "user" ? "order-1" : ""}`}>
                    <Card
                      className={`p-3 ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : message.isError
                            ? "bg-orange-50 dark:bg-orange-900/20 text-orange-900 dark:text-orange-100 border-orange-200 dark:border-orange-800"
                            : "bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </Card>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-1">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>

                  {message.role === "user" && (
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center order-2">
                      <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <Card className="p-3 bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Analyzing your question...</span>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about materials, calculations, best practices..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputMessage("How much concrete do I need for a 10x10 foundation?")}
              disabled={isLoading}
              className="text-xs"
            >
              Calculate concrete
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputMessage("What safety equipment is required for roofing work?")}
              disabled={isLoading}
              className="text-xs"
            >
              Safety guidelines
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputMessage("Best practices for concrete curing in cold weather")}
              disabled={isLoading}
              className="text-xs"
            >
              Weather tips
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
