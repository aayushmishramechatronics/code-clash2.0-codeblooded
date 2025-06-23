"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { ShoppingCart, RotateCcw, Search, Filter, CalendarIcon, Download, Eye, Trash2, Plus } from "lucide-react"
import { format } from "date-fns"
import { QuantityBadge } from "@/components/quantity-badge"
import { AddPurchaseModal } from "@/components/add-purchase-modal"
import { exportToCSV } from "@/utils/excel-export"

const purchaseHistory = [
  {
    id: 1,
    material: "Concrete Mix",
    quantity: "50 bags",
    date: "2024-01-15",
    cost: "$2,500",
    supplier: "BuildMart Pro",
    project: "Residential Complex A",
    status: "Delivered",
    category: "Concrete & Steel",
  },
  {
    id: 2,
    material: "Steel Rebar",
    quantity: "200 units",
    date: "2024-01-14",
    cost: "$4,800",
    supplier: "Construction Plus",
    project: "Commercial Plaza B",
    status: "Delivered",
    category: "Concrete & Steel",
  },
  {
    id: 3,
    material: "Lumber 2x4",
    quantity: "100 pieces",
    date: "2024-01-12",
    cost: "$1,200",
    supplier: "Material Express",
    project: "Industrial Warehouse C",
    status: "In Transit",
    category: "Lumber & Tools",
  },
  {
    id: 4,
    material: "Roofing Tiles",
    quantity: "500 tiles",
    date: "2024-01-10",
    cost: "$3,200",
    supplier: "Pro Builder Supply",
    project: "Office Building D",
    status: "Delivered",
    category: "Roofing & Insulation",
  },
  {
    id: 5,
    material: "Insulation",
    quantity: "20 rolls",
    date: "2024-01-08",
    cost: "$800",
    supplier: "BuildMart Pro",
    project: "Retail Center E",
    status: "Delivered",
    category: "Roofing & Insulation",
  },
  {
    id: 6,
    material: "PVC Pipes",
    quantity: "150 meters",
    date: "2024-01-05",
    cost: "$950",
    supplier: "Quick Build Materials",
    project: "Residential Complex A",
    status: "Delivered",
    category: "Hardware & Fixtures",
  },
  {
    id: 7,
    material: "Cement Bags",
    quantity: "75 bags",
    date: "2024-01-03",
    cost: "$1,875",
    supplier: "Steel & Stone Co",
    project: "Commercial Plaza B",
    status: "Delivered",
    category: "Concrete & Steel",
  },
  {
    id: 8,
    material: "Electrical Wire",
    quantity: "500 meters",
    date: "2024-01-01",
    cost: "$650",
    supplier: "Pro Builder Supply",
    project: "Office Building D",
    status: "Delivered",
    category: "Hardware & Fixtures",
  },
]

// Generate calendar data
const generateCalendarData = () => {
  const calendarData: { [key: string]: any[] } = {}

  purchaseHistory.forEach((purchase) => {
    const date = purchase.date
    if (!calendarData[date]) {
      calendarData[date] = []
    }
    calendarData[date].push(purchase)
  })

  return calendarData
}

export default function PurchasesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedProject, setSelectedProject] = useState("All")
  const [reorderingItem, setReorderingItem] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table")
  const [purchases, setPurchases] = useState(purchaseHistory)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const categories = ["All", "Concrete & Steel", "Lumber & Tools", "Roofing & Insulation", "Hardware & Fixtures"]
  const statuses = ["All", "Delivered", "In Transit", "Pending"]
  const projects = [
    "All",
    "Residential Complex A",
    "Commercial Plaza B",
    "Industrial Warehouse C",
    "Office Building D",
    "Retail Center E",
  ]

  const calendarData = generateCalendarData()

  const filteredPurchases = purchases.filter((purchase) => {
    const matchesSearch =
      purchase.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.project.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || purchase.category === selectedCategory
    const matchesStatus = selectedStatus === "All" || purchase.status === selectedStatus
    const matchesProject = selectedProject === "All" || purchase.project === selectedProject

    return matchesSearch && matchesCategory && matchesStatus && matchesProject
  })

  const handleReorder = (itemId: number) => {
    setReorderingItem(itemId)
    setTimeout(() => {
      setReorderingItem(null)
      console.log(`Reordering item ${itemId}`)
    }, 2000)
  }

  const getDayPurchases = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd")
    return calendarData[dateString] || []
  }

  const handleAddPurchase = (newPurchase: any) => {
    setPurchases((prev) => [newPurchase, ...prev])
  }

  const handleDeletePurchase = (id: number) => {
    if (confirm("Are you sure you want to delete this purchase record?")) {
      setPurchases((prev) => prev.filter((purchase) => purchase.id !== id))
    }
  }

  return (
    <LayoutWrapper title="Purchase History" subtitle="Track and manage your material purchases">
      <div className="space-y-6">
        {/* Search and Filters */}
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search materials, suppliers, or projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "table" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                    className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                  >
                    Table
                  </Button>
                  <Button
                    variant={viewMode === "calendar" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("calendar")}
                    className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                  >
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    Calendar
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-2 sm:px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-xs sm:text-sm"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category.length > 15 ? category.substring(0, 15) + "..." : category}
                      </option>
                    ))}
                  </select>
                </div>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-2 sm:px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-xs sm:text-sm whitespace-nowrap"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="px-2 sm:px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-xs sm:text-sm whitespace-nowrap"
                >
                  {projects.map((project) => (
                    <option key={project} value={project}>
                      {project.length > 12 ? project.substring(0, 12) + "..." : project}
                    </option>
                  ))}
                </select>

                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 whitespace-nowrap"
                  onClick={() => exportToCSV(filteredPurchases, "construction-purchase-history")}
                >
                  <Download className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Download Data</span>
                  <span className="sm:hidden">Export</span>
                </Button>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white whitespace-nowrap"
                  onClick={() => setIsAddModalOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Add Purchase</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {viewMode === "table" ? (
          /* Purchase History Table */
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Purchase Records ({filteredPurchases.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/80 dark:bg-gray-800/80">
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Material</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300 hidden sm:table-cell">
                          Quantity
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300 hidden md:table-cell">
                          Date
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Cost</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300 hidden lg:table-cell">
                          Supplier
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300 hidden xl:table-cell">
                          Project
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300 hidden sm:table-cell">
                          Status
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPurchases.map((purchase) => (
                        <TableRow
                          key={purchase.id}
                          className="hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
                        >
                          <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                            <div>
                              <div>{purchase.material}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">
                                {purchase.quantity} • {purchase.date}
                              </div>
                              <Badge variant="outline" className="text-xs mt-1 sm:hidden">
                                {purchase.category}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <QuantityBadge quantity={purchase.quantity} material={purchase.material} />
                          </TableCell>
                          <TableCell className="text-gray-600 dark:text-gray-400 hidden md:table-cell">
                            {purchase.date}
                          </TableCell>
                          <TableCell className="font-semibold text-gray-900 dark:text-gray-100">
                            {purchase.cost}
                          </TableCell>
                          <TableCell className="text-gray-600 dark:text-gray-400 hidden lg:table-cell">
                            {purchase.supplier}
                          </TableCell>
                          <TableCell className="text-gray-600 dark:text-gray-400 hidden xl:table-cell">
                            {purchase.project}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge
                              variant={
                                purchase.status === "Delivered"
                                  ? "default"
                                  : purchase.status === "In Transit"
                                    ? "secondary"
                                    : "outline"
                              }
                              className={
                                purchase.status === "Delivered"
                                  ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                                  : purchase.status === "In Transit"
                                    ? "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200"
                                    : ""
                              }
                            >
                              {purchase.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReorder(purchase.id)}
                                disabled={reorderingItem === purchase.id}
                                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                              >
                                {reorderingItem === purchase.id ? (
                                  <div className="flex items-center gap-1">
                                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                                    <span className="hidden sm:inline">Ordering...</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1">
                                    <RotateCcw className="h-3 w-3" />
                                    <span className="hidden sm:inline">Re-order</span>
                                  </div>
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeletePurchase(purchase.id)}
                                className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {filteredPurchases.length === 0 && (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No purchases found</h3>
                    <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria or filters</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Calendar View */
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Purchase Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                    modifiers={{
                      hasPurchases: (date) => {
                        const dateString = format(date, "yyyy-MM-dd")
                        return !!calendarData[dateString]
                      },
                    }}
                    modifiersStyles={{
                      hasPurchases: {
                        backgroundColor: "rgb(59 130 246 / 0.1)",
                        color: "rgb(59 130 246)",
                        fontWeight: "bold",
                      },
                    }}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
                  </h3>

                  {selectedDate && (
                    <div className="space-y-3">
                      {getDayPurchases(selectedDate).length > 0 ? (
                        getDayPurchases(selectedDate).map((purchase) => (
                          <div
                            key={purchase.id}
                            className="p-3 rounded-lg bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/30 dark:border-gray-600/30"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                                {purchase.material}
                              </h4>
                              <Badge
                                variant={purchase.status === "Delivered" ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {purchase.status}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                              <div>Quantity: {purchase.quantity}</div>
                              <div>Cost: {purchase.cost}</div>
                              <div>Supplier: {purchase.supplier}</div>
                              <div>Project: {purchase.project}</div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReorder(purchase.id)}
                              disabled={reorderingItem === purchase.id}
                              className="w-full mt-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-xs"
                            >
                              {reorderingItem === purchase.id ? (
                                <div className="flex items-center gap-1">
                                  <div className="h-3 w-3 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                                  Reordering...
                                </div>
                              ) : (
                                <div className="flex items-center gap-1">
                                  <RotateCcw className="h-3 w-3" />
                                  Re-order
                                </div>
                              )}
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4">
                          <ShoppingCart className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 dark:text-gray-400">No purchases on this date</p>
                        </div>
                      )}
                    </div>
                  )}

                  {!selectedDate && (
                    <div className="text-center py-8">
                      <CalendarIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">Click on a date to view purchases</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        Dates with purchases are highlighted
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Purchase Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Purchases</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{filteredPurchases.length}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    $
                    {filteredPurchases
                      .reduce(
                        (sum, purchase) => sum + Number.parseInt(purchase.cost.replace("$", "").replace(",", "")),
                        0,
                      )
                      .toLocaleString()}
                  </p>
                </div>
                <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 font-bold">$</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Order Value</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    $
                    {Math.round(
                      filteredPurchases.reduce(
                        (sum, purchase) => sum + Number.parseInt(purchase.cost.replace("$", "").replace(",", "")),
                        0,
                      ) / filteredPurchases.length || 0,
                    ).toLocaleString()}
                  </p>
                </div>
                <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">Ø</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <AddPurchaseModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddPurchase} />
    </LayoutWrapper>
  )
}
