"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Cloud, Home, MapPin, Package, ShoppingCart } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navigationItems = [
  { title: "Dashboard", icon: Home, url: "/" },
  { title: "Weather Forecast", icon: Cloud, url: "/weather" },
  { title: "Supplier Map", icon: MapPin, url: "/suppliers" },
  { title: "Purchase History", icon: ShoppingCart, url: "/purchases" },
  { title: "Inventory", icon: Package, url: "/inventory" },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r-0" collapsible="offcanvas">
      <SidebarHeader className="p-3 sm:p-4 lg:p-6">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500">
            <Package className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100">
              Smart Construction
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Resource Optimization</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 dark:text-gray-400 font-medium">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="data-[active=true]:bg-blue-50 dark:data-[active=true]:bg-blue-900/30 data-[active=true]:text-blue-700 dark:data-[active=true]:text-blue-300 data-[active=true]:border-r-2 data-[active=true]:border-blue-600 dark:data-[active=true]:border-blue-400"
                  >
                    <Link href={item.url} className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2">
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm sm:text-base">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
