"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Bell, Package, CheckCircle, Cloud, Truck, X } from "lucide-react"

interface Notification {
  id: number
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  timestamp: string
  read: boolean
  category: "order" | "weather" | "delivery" | "system"
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "Order Delivered",
    message: "Your concrete mix order has been delivered to Residential Complex A",
    type: "success",
    timestamp: "2024-01-15T10:30:00Z",
    read: false,
    category: "delivery",
  },
  {
    id: 2,
    title: "Weather Alert",
    message: "Heavy rain expected tomorrow. Consider rescheduling outdoor concrete work.",
    type: "warning",
    timestamp: "2024-01-15T08:15:00Z",
    read: false,
    category: "weather",
  },
  {
    id: 3,
    title: "Low Stock Alert",
    message: "Steel rebar inventory is running low. Consider reordering soon.",
    type: "warning",
    timestamp: "2024-01-14T16:45:00Z",
    read: true,
    category: "order",
  },
  {
    id: 4,
    title: "New Supplier Available",
    message: "QuickBuild Materials is now available in your area with same-day delivery.",
    type: "info",
    timestamp: "2024-01-14T14:20:00Z",
    read: true,
    category: "system",
  },
  {
    id: 5,
    title: "Order Confirmed",
    message: "Your lumber order for Industrial Warehouse C has been confirmed.",
    type: "success",
    timestamp: "2024-01-14T11:10:00Z",
    read: true,
    category: "order",
  },
  {
    id: 6,
    title: "Delivery Delayed",
    message: "Roofing tiles delivery has been delayed by 1 day due to traffic conditions.",
    type: "error",
    timestamp: "2024-01-13T15:30:00Z",
    read: true,
    category: "delivery",
  },
]

const getNotificationIcon = (category: string) => {
  switch (category) {
    case "order":
      return Package
    case "weather":
      return Cloud
    case "delivery":
      return Truck
    case "system":
      return Bell
    default:
      return Bell
  }
}

const getNotificationColor = (type: string) => {
  switch (type) {
    case "success":
      return "text-green-600 dark:text-green-400"
    case "warning":
      return "text-orange-600 dark:text-orange-400"
    case "error":
      return "text-red-600 dark:text-red-400"
    default:
      return "text-blue-600 dark:text-blue-400"
  }
}

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) {
    return "Just now"
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }
}

export function NotificationPanel() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 relative"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[400px] p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle className="text-lg font-semibold">Notifications</SheetTitle>
                <SheetDescription>
                  {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
                </SheetDescription>
              </div>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                  Mark all read
                </Button>
              )}
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1 px-6">
            <div className="space-y-4">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification, index) => {
                  const IconComponent = getNotificationIcon(notification.category)
                  const iconColor = getNotificationColor(notification.type)

                  return (
                    <div key={notification.id}>
                      <div
                        className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                          notification.read
                            ? "bg-white/40 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700"
                            : "bg-blue-50/80 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-full bg-white/60 dark:bg-gray-800/60 ${iconColor}`}>
                            <IconComponent className="h-4 w-4" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                                  {notification.title}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                                  {notification.message}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {formatTimestamp(notification.timestamp)}
                                  </span>
                                  {!notification.read && (
                                    <Badge variant="secondary" className="text-xs px-2 py-0">
                                      New
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-1">
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => markAsRead(notification.id)}
                                    className="h-6 w-6 p-0 hover:bg-blue-100 dark:hover:bg-blue-900"
                                  >
                                    <CheckCircle className="h-3 w-3" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteNotification(notification.id)}
                                  className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < notifications.length - 1 && <Separator className="my-2" />}
                    </div>
                  )
                })
              )}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}
