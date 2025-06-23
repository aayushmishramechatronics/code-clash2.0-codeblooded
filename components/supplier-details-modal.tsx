"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Star, MapPin, Phone, Truck, Package, Clock, DollarSign, CheckCircle } from "lucide-react"

interface SupplierDetailsModalProps {
  supplier: any
  isOpen: boolean
  onClose: () => void
}

const supplierInventory = {
  1: [
    // BuildMart Pro
    { name: "Concrete Mix", stock: 500, unit: "bags", price: 50, category: "Concrete & Steel" },
    { name: "Steel Rebar", stock: 200, unit: "units", price: 24, category: "Concrete & Steel" },
    { name: "Cement Bags", stock: 300, unit: "bags", price: 25, category: "Concrete & Steel" },
    { name: "Gravel", stock: 150, unit: "tons", price: 35, category: "Concrete & Steel" },
  ],
  2: [
    // Construction Plus
    { name: "Lumber 2x4", stock: 800, unit: "pieces", price: 12, category: "Lumber & Tools" },
    { name: "Plywood Sheets", stock: 120, unit: "sheets", price: 45, category: "Lumber & Tools" },
    { name: "Power Tools", stock: 25, unit: "units", price: 150, category: "Lumber & Tools" },
    { name: "Hand Tools Set", stock: 40, unit: "sets", price: 85, category: "Lumber & Tools" },
  ],
  3: [
    // Material Express
    { name: "Roofing Tiles", stock: 2000, unit: "tiles", price: 6.4, category: "Roofing & Insulation" },
    { name: "Insulation Rolls", stock: 80, unit: "rolls", price: 40, category: "Roofing & Insulation" },
    { name: "Roofing Membrane", stock: 50, unit: "rolls", price: 120, category: "Roofing & Insulation" },
    { name: "Gutters", stock: 100, unit: "meters", price: 15, category: "Roofing & Insulation" },
  ],
  4: [
    // Pro Builder Supply
    { name: "PVC Pipes", stock: 500, unit: "meters", price: 6.33, category: "Hardware & Fixtures" },
    { name: "Electrical Wire", stock: 1000, unit: "meters", price: 1.3, category: "Hardware & Fixtures" },
    { name: "Light Fixtures", stock: 60, unit: "units", price: 75, category: "Hardware & Fixtures" },
    { name: "Door Hardware", stock: 150, unit: "sets", price: 45, category: "Hardware & Fixtures" },
  ],
}

const supplierReviews = {
  1: [
    {
      rating: 5,
      comment: "Excellent quality concrete mix, always on time!",
      author: "John Construction Co.",
      date: "2024-01-10",
    },
    { rating: 4, comment: "Good prices and reliable delivery service.", author: "ABC Builders", date: "2024-01-05" },
    { rating: 5, comment: "Best steel rebar quality in the area.", author: "Metro Construction", date: "2023-12-28" },
  ],
  2: [
    {
      rating: 5,
      comment: "High quality lumber, great customer service.",
      author: "Pine Valley Homes",
      date: "2024-01-12",
    },
    { rating: 4, comment: "Good selection of tools and materials.", author: "Craftsman Builders", date: "2024-01-08" },
    { rating: 5, comment: "Fast delivery and competitive prices.", author: "Summit Construction", date: "2024-01-03" },
  ],
  3: [
    {
      rating: 5,
      comment: "Premium roofing materials, highly recommended!",
      author: "Roofing Experts LLC",
      date: "2024-01-14",
    },
    { rating: 5, comment: "Excellent insulation products and service.", author: "Green Build Co.", date: "2024-01-09" },
    { rating: 4, comment: "Quality materials, slightly higher prices.", author: "Eco Builders", date: "2024-01-01" },
  ],
  4: [
    {
      rating: 4,
      comment: "Good hardware selection, reliable supplier.",
      author: "Fix-It Construction",
      date: "2024-01-11",
    },
    {
      rating: 5,
      comment: "Great electrical supplies and quick delivery.",
      author: "Spark Electric Co.",
      date: "2024-01-06",
    },
    { rating: 4, comment: "Decent prices, good customer support.", author: "Home Builders Inc.", date: "2023-12-30" },
  ],
}

export function SupplierDetailsModal({ supplier, isOpen, onClose }: SupplierDetailsModalProps) {
  const [selectedTab, setSelectedTab] = useState("inventory")

  if (!supplier) return null

  const inventory = supplierInventory[supplier.id] || []
  const reviews = supplierReviews[supplier.id] || []
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  const getStockStatus = (stock: number) => {
    if (stock > 100) return { status: "High", color: "text-green-600", bg: "bg-green-100" }
    if (stock > 50) return { status: "Medium", color: "text-orange-600", bg: "bg-orange-100" }
    return { status: "Low", color: "text-red-600", bg: "bg-red-100" }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-600" />
            {supplier.name}
          </DialogTitle>
          <DialogDescription>Detailed supplier information, inventory, and ratings</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Supplier Overview */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-semibold">{supplier.rating}</span>
                    <span className="text-sm text-gray-600">({reviews.length} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {supplier.address} • {supplier.distance}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{supplier.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Truck className="h-4 w-4" />
                    <span>Delivery: {supplier.deliveryTime}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Badge variant="outline" className="w-fit">
                    {supplier.specialty}
                  </Badge>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => window.open(`tel:${supplier.phone}`, "_self")}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Call Now
                    </Button>
                    <Button size="sm" variant="outline">
                      <MapPin className="h-4 w-4 mr-1" />
                      Directions
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for different sections */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="ratings">Ratings & Reviews</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="inventory" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Available Materials ({inventory.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {inventory.map((item, index) => {
                      const stockStatus = getStockStatus(item.stock)
                      return (
                        <div key={index} className="p-4 border rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">{item.name}</h4>
                            <Badge variant="outline" className={`${stockStatus.bg} ${stockStatus.color} border-0`}>
                              {stockStatus.status} Stock
                            </Badge>
                          </div>
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex justify-between">
                              <span>Available:</span>
                              <span className="font-medium">
                                {item.stock} {item.unit}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Price per {item.unit.slice(0, -1)}:</span>
                              <span className="font-medium">${item.price}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Category:</span>
                              <span className="font-medium">{item.category}</span>
                            </div>
                          </div>
                          <Button size="sm" className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white">
                            <DollarSign className="h-4 w-4 mr-1" />
                            Request Quote
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ratings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Customer Reviews
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
                      <span className="text-gray-600">out of 5</span>
                    </div>
                    <div className="text-sm text-gray-600">Based on {reviews.length} reviews</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Rating breakdown */}
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count = reviews.filter((r) => r.rating === rating).length
                        const percentage = (count / reviews.length) * 100
                        return (
                          <div key={rating} className="flex items-center gap-2">
                            <span className="text-sm w-8">{rating}★</span>
                            <Progress value={percentage} className="flex-1 h-2" />
                            <span className="text-sm text-gray-600 w-8">{count}</span>
                          </div>
                        )
                      })}
                    </div>

                    {/* Individual reviews */}
                    <div className="space-y-4 mt-6">
                      {reviews.map((review, index) => (
                        <div key={index} className="p-4 border rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="font-medium text-gray-900 dark:text-gray-100">{review.author}</span>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">On-time Delivery</span>
                      <div className="flex items-center gap-2">
                        <Progress value={92} className="w-20 h-2" />
                        <span className="font-semibold">92%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Quality Rating</span>
                      <div className="flex items-center gap-2">
                        <Progress value={88} className="w-20 h-2" />
                        <span className="font-semibold">88%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Customer Service</span>
                      <div className="flex items-center gap-2">
                        <Progress value={95} className="w-20 h-2" />
                        <span className="font-semibold">95%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Price Competitiveness</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="w-20 h-2" />
                        <span className="font-semibold">85%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-600">Orders Completed</span>
                      </div>
                      <span className="font-semibold">247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="text-gray-600">Avg Response Time</span>
                      </div>
                      <span className="font-semibold">2.3 hrs</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-purple-600" />
                        <span className="text-gray-600">Delivery Radius</span>
                      </div>
                      <span className="font-semibold">50 km</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-orange-600" />
                        <span className="text-gray-600">Product Categories</span>
                      </div>
                      <span className="font-semibold">{inventory.length}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
