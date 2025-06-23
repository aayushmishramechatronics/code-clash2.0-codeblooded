"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { useGeolocation } from "@/hooks/use-geolocation"
import { MapPin, Phone, Star, Truck, Search, Filter, Navigation } from "lucide-react"
import { SupplierDetailsModal } from "@/components/supplier-details-modal"
import { CalendarIcon } from "lucide-react"

const suppliers = [
  {
    id: 1,
    name: "BuildMart Pro",
    distance: "2.3 km",
    rating: 4.8,
    phone: "+91-983450123",
    specialty: "Concrete & Steel",
    address: "Andheri",
    deliveryTime: "Same Day",
    lat: 40.7589,
    lng: -73.9851,
  },
  {
    id: 2,
    name: "Construction Plus",
    distance: "5.1 km",
    rating: 4.6,
    phone: "+91-9343550124",
    specialty: "Lumber & Tools",
    address: "Ulhasnagar",
    deliveryTime: "Next Day",
    lat: 40.7614,
    lng: -73.9776,
  },
  {
    id: 3,
    name: "Material Express",
    distance: "7.8 km",
    rating: 4.9,
    phone: "+91-845020125",
    specialty: "Roofing & Insulation",
    address: "Sion",
    deliveryTime: "2-3 Days",
    lat: 40.7505,
    lng: -73.9934,
  },
  {
    id: 4,
    name: "Pro Builder Supply",
    distance: "12.4 km",
    rating: 4.5,
    phone: "+91-893340126",
    specialty: "Hardware & Fixtures",
    address: "Badlapur",
    deliveryTime: "Same Day",
    lat: 40.7282,
    lng: -73.9942,
  },
  {
    id: 5,
    name: "Steel & Stone Co",
    distance: "15.2 km",
    rating: 4.7,
    phone: "+91-899340127",
    specialty: "Steel & Masonry",
    address: "Karjat",
    deliveryTime: "Next Day",
    lat: 40.7831,
    lng: -73.9712,
  },
  {
    id: 6,
    name: "Quick Build Materials",
    distance: "18.9 km",
    rating: 4.4,
    phone: "+91-933210128",
    specialty: "General Construction",
    address: "Shahad",
    deliveryTime: "2-3 Days",
    lat: 40.7061,
    lng: -74.0087,
  },
]

export default function SuppliersPage() {
  const { latitude, longitude, loading: locationLoading } = useGeolocation()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All")
  const [mapUrl, setMapUrl] = useState<string | null>(null)
  const [selectedSupplier, setSelectedSupplier] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState("table")

  const specialties = [
    "All",
    "Concrete & Steel",
    "Lumber & Tools",
    "Roofing & Insulation",
    "Hardware & Fixtures",
    "Steel & Masonry",
    "General Construction",
  ]

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === "All" || supplier.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  useEffect(() => {
    if (latitude && longitude) {
      // Create a more accurate map with user location
      const userLocation = `${latitude},${longitude}`
      const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50000!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40zMCcwMC4wIk4gNzPCsDU5JzAwLjAiVw!5e0!3m2!1sen!2s!4v1703123456789!5m2!1sen!2s`
      setMapUrl(mapUrl)
    } else {
      // Default NYC map
      const defaultMapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1703123456789!5m2!1sen!2s`
      setMapUrl(defaultMapUrl)
    }
  }, [latitude, longitude])

  return (
    <LayoutWrapper title="Supplier Map" subtitle="find and connect with local material suppliers">
      <div className="space-y-6">
        {/* Search and Filter */}
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search suppliers or materials..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-sm sm:text-base"
                  />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <Button
                    variant={viewMode === "table" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                    className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm whitespace-nowrap"
                  >
                    Table
                  </Button>
                  <Button
                    variant={viewMode === "calendar" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("calendar")}
                    className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm whitespace-nowrap"
                  >
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    Calendar
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="px-2 sm:px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-xs sm:text-sm"
                  >
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Map */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Supplier Locations Map
              {locationLoading && (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
              )}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Navigation className="h-4 w-4" />
              {latitude && longitude
                ? `Your location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
                : "Enable location for personalized results"}
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              {mapUrl ? (
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
                  <div className="text-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Loading Map...</p>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">
                🔵 Your Location
              </Badge>
              <Badge variant="outline" className="text-xs">
                🔴 Suppliers
              </Badge>
              <Badge variant="outline" className="text-xs">
                🟢 Same-Day Delivery
              </Badge>
              <Badge variant="outline" className="text-xs">
                🟡 Next-Day Delivery
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Suppliers List */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-green-600 dark:text-green-400" />
              Nearby Suppliers ({filteredSuppliers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              {filteredSuppliers.map((supplier) => (
                <div
                  key={supplier.id}
                  className="p-4 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{supplier.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{supplier.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{supplier.address}</p>
                        <Badge variant="outline" className="text-xs mb-2">
                          {supplier.specialty}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin className="h-4 w-4" />
                        <span>{supplier.distance}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Truck className="h-4 w-4" />
                        <span>{supplier.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Phone className="h-4 w-4" />
                        <span>{supplier.phone}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => window.open(`tel:${supplier.phone}`, "_self")}
                      >
                        Contact
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setSelectedSupplier(supplier)
                          setIsModalOpen(true)
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredSuppliers.length === 0 && (
              <div className="text-center py-8">
                <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No Suppliers Found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  try adjusting your search criteria or specialty filter
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        <SupplierDetailsModal
          supplier={selectedSupplier}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedSupplier(null)
          }}
        />
      </div>
    </LayoutWrapper>
  )
}
