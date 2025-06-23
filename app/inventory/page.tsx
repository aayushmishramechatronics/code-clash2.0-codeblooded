"use client"

import { LayoutWrapper } from "@/components/layout-wrapper"
import { InventoryTracker } from "@/components/inventory-tracker"

export default function InventoryPage() {
  return (
    <LayoutWrapper title="Inventory Management" subtitle="Track and Manage your Materials Inventory">
      <InventoryTracker />
    </LayoutWrapper>
  )
}
