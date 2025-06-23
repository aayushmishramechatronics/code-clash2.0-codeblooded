"use client"

import { LayoutWrapper } from "@/components/layout-wrapper"
import { InventoryTracker } from "@/components/inventory-tracker"

export default function InventoryPage() {
  return (
    <LayoutWrapper title="Inventory Management" subtitle="Track and manage your construction materials inventory">
      <InventoryTracker />
    </LayoutWrapper>
  )
}
