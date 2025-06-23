"use client"

import { Badge } from "@/components/ui/badge"
import { Package, Layers, Ruler, Weight } from "lucide-react"

interface QuantityBadgeProps {
  quantity: string
  material: string
}

const getQuantityIcon = (quantity: string, material: string) => {
  const lowerQuantity = quantity.toLowerCase()
  const lowerMaterial = material.toLowerCase()

  if (lowerQuantity.includes("bag") || lowerMaterial.includes("concrete") || lowerMaterial.includes("cement")) {
    return Package
  } else if (lowerQuantity.includes("roll") || lowerMaterial.includes("insulation")) {
    return Layers
  } else if (lowerQuantity.includes("meter") || lowerQuantity.includes("pieces")) {
    return Ruler
  } else {
    return Weight
  }
}

const getQuantityColor = (quantity: string) => {
  const num = Number.parseInt(quantity)
  if (num >= 100) {
    return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700"
  } else if (num >= 50) {
    return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700"
  } else if (num >= 20) {
    return "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-700"
  } else {
    return "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-700"
  }
}

export function QuantityBadge({ quantity, material }: QuantityBadgeProps) {
  const IconComponent = getQuantityIcon(quantity, material)
  const colorClass = getQuantityColor(quantity)

  return (
    <Badge
      variant="outline"
      className={`${colorClass} flex items-center gap-1.5 px-3 py-1.5 font-medium text-sm border backdrop-blur-sm hover:shadow-sm transition-all duration-200`}
    >
      <IconComponent className="h-3.5 w-3.5" />
      <span>{quantity}</span>
    </Badge>
  )
}
