"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Package, Search, Plus, Minus, RotateCcw } from "lucide-react"

interface InventoryItem {
  id: number
  name: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  unit: string
  lastRestocked: string
  supplier: string
  costPerUnit: number
  location: string
}

const inventoryData: InventoryItem[] = [
  {
    id: 1,
    name: "Concrete Mix",
    category: "Concrete & Steel",
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    unit: "bags",
    lastRestocked: "2025-06-22",
    supplier: "BuildMart Pro",
    costPerUnit: 50,
    location: "Warehouse A",
  },
  {
    id: 2,
    name: "Steel Rebar",
    category: "Concrete & Steel",
    currentStock: 15,
    minStock: 25,
    maxStock: 200,
    unit: "units",
    lastRestocked: "2025-06-21",
    supplier: "Construction Plus",
    costPerUnit: 24,
    location: "Warehouse B",
  },
  {
    id: 3,
    name: "Lumber 2x4",
    category: "Lumber & Tools",
    currentStock: 85,
    minStock: 30,
    maxStock: 150,
    unit: "pieces",
    lastRestocked: "2025-06-12",
    supplier: "Material Express",
    costPerUnit: 12,
    location: "Warehouse A",
  },
  {
    id: 4,
    name: "Roofing Tiles",
    category: "Roofing & Insulation",
    currentStock: 120,
    minStock: 50,
    maxStock: 500,
    unit: "tiles",
    lastRestocked: "2025-06-08",
    supplier: "Pro Builder Supply",
    costPerUnit: 6.4,
    location: "Warehouse C",
  },
  {
    id: 5,
    name: "PVC Pipes",
    category: "Hardware & Fixtures",
    currentStock: 8,
    minStock: 15,
    maxStock: 100,
    unit: "meters",
    lastRestocked: "2025-06-05",
    supplier: "Quick Build Materials",
    costPerUnit: 6.33,
    location: "Warehouse B",
  },
]

export function InventoryTracker() {
  const [inventory, setInventory] = useState<InventoryItem[]>(inventoryData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Concrete & Steel", "Lumber & Tools", "Roofing & Insulation", "Hardware & Fixtures"]

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStockStatus = (item: InventoryItem) => {
    const percentage = (item.currentStock / item.maxStock) * 100
    if (item.currentStock <= item.minStock) {
      return { status: "Critical", color: "text-red-600", bg: "bg-red-100", percentage }
    } else if (percentage < 50) {
      return { status: "Low", color: "text-orange-600", bg: "bg-orange-100", percentage }
    } else if (percentage < 80) {
      return { status: "Medium", color: "text-blue-600", bg: "bg-blue-100", percentage }
    } else {
      return { status: "High", color: "text-green-600", bg: "bg-green-100", percentage }
    }
  }

  const updateStock = (id: number, change: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, currentStock: Math.max(0, Math.min(item.maxStock, item.currentStock + change)) }
          : item,
      ),
    )
  }

  const reorderItem = (id: number) => {
    const item = inventory.find((i) => i.id === id)
    if (item) {
      console.log(`Reordering ${item.name} from ${item.supplier}`)
      // In a real app, this would trigger an API call
    }
  }

  const lowStockItems = filteredInventory.filter((item) => item.currentStock <= item.minStock)
  const totalValue = filteredInventory.reduce((sum, item) => sum + item.currentStock * item.costPerUnit, 0)

  return (
    <div className="space-y-6">
      {/* Inventory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Items</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{filteredInventory.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Low Stock Alerts</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{lowStockItems.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">${totalValue.toLocaleString()}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 font-bold">₹</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Categories</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{categories.length - 1}</p>
              </div>
              <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <Package className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="search inventory items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredInventory.map((item) => {
          const stockStatus = getStockStatus(item)
          return (
            <Card key={item.id} className="glass-card hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {item.name}
                    </CardTitle>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <Badge variant="outline" className={`${stockStatus.bg} ${stockStatus.color} border-0 font-medium`}>
                    {stockStatus.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stock Level */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Stock Level</span>
                    <span className="font-medium">
                      {item.currentStock} / {item.maxStock} {item.unit}
                    </span>
                  </div>
                  <Progress value={stockStatus.percentage} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Min: {item.minStock}</span>
                    <span>Max: {item.maxStock}</span>
                  </div>
                </div>

                {/* Item Details */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Location:</span>
                    <p className="font-medium">{item.location}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Cost/Unit:</span>
                    <p className="font-medium">₹{item.costPerUnit}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Supplier:</span>
                    <p className="font-medium text-xs">{item.supplier}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Last Restocked:</span>
                    <p className="font-medium text-xs">{item.lastRestocked}</p>
                  </div>
                </div>

                {/* Stock Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStock(item.id, -1)}
                      className="h-8 w-8 p-0"
                      disabled={item.currentStock <= 0}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="mx-2 font-medium text-lg">{item.currentStock}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStock(item.id, 1)}
                      className="h-8 w-8 p-0"
                      disabled={item.currentStock >= item.maxStock}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => reorderItem(item.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={item.currentStock > item.minStock}
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Reorder
                  </Button>
                </div>

                {/* Low Stock Warning */}
                {item.currentStock <= item.minStock && (
                  <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
                    <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <span className="text-sm text-red-800 dark:text-red-200">Stock Below Minimum Level!</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredInventory.length === 0 && (
        <Card className="glass-card">
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No Items Found</h3>
            <p className="text-gray-600 dark:text-gray-400">try adjusting your search criteria or category filter</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
