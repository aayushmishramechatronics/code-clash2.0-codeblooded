"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Star, Truck } from "lucide-react"

const nearbySuppliers = [
  { name: "BuildMart Pro", distance: "2.3 km", rating: 4.8, phone: "+1-555-0123", specialty: "Concrete & Steel" },
  { name: "Construction Plus", distance: "5.1 km", rating: 4.6, phone: "+1-555-0124", specialty: "Lumber & Tools" },
  {
    name: "Material Express",
    distance: "7.8 km",
    rating: 4.9,
    phone: "+91-983220125",
    specialty: "Roofing & Insulation",
  },
  {
    name: "Pro Builder Supply",
    distance: "12.4 km",
    rating: 4.5,
    phone: "+91-89320126",
    specialty: "Hardware & Fixtures",
  },
]

export function SupplierDetails() {
  return (
    <Card className="backdrop-blur-md bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/20 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Truck className="h-5 w-5 text-green-600 dark:text-green-400" />
          Nearby Suppliers Directory
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nearbySuppliers.map((supplier, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{supplier.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{supplier.rating}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{supplier.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span>{supplier.phone}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {supplier.specialty}
                  </Badge>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Contact
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
