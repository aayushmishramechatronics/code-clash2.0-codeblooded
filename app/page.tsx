"use client"
import { TrendingUp, AlertTriangle, Package, Cloud, Truck, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { ProjectSpendingChart } from "@/components/project-spending-chart"
import { useGeolocation } from "@/hooks/use-geolocation"
import { useWeather } from "@/hooks/use-weather"
import { RadialProjectChart } from "@/components/radial-project-chart"

export default function Dashboard() {
  const { latitude, longitude, loading: locationLoading } = useGeolocation()
  const { data: weatherData, loading: weatherLoading } = useWeather(latitude, longitude)

  const getRiskLevel = () => {
    if (!weatherData) return { level: "Low", color: "text-green-600 dark:text-green-400" }

    const nextDayRain = weatherData.daily[1]?.pop || 0
    if (nextDayRain > 0.7) return { level: "High", color: "text-red-600 dark:text-red-400" }
    if (nextDayRain > 0.3) return { level: "Medium", color: "text-orange-600 dark:text-orange-400" }
    return { level: "Low", color: "text-green-600 dark:text-green-400" }
  }

  const risk = getRiskLevel()

  return (
    <LayoutWrapper title="Dashboard" subtitle="Smart Construction Resource Optimization">
      <div className="space-y-4 sm:space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          <Card className="glass-card hover:shadow-2xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Total Materials Ordered
              </CardTitle>
              <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">1,247</div>
              <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-2">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last month
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Across 5 active projects</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover:shadow-2xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Weather Risk Level</CardTitle>
              <Cloud className="h-5 w-5 text-orange-500 dark:text-orange-400" />
            </CardHeader>
            <CardContent>
              {weatherLoading ? (
                <div className="text-2xl sm:text-3xl font-bold text-gray-400">Loading...</div>
              ) : (
                <>
                  <div className={`text-2xl sm:text-3xl font-bold ${risk.color}`}>{risk.level}</div>
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mt-2">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {weatherData?.current.weather[0].description || "Clear conditions"}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Current: {weatherData?.current.temp || 22}°C
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="glass-card hover:shadow-2xl transition-all duration-300 sm:col-span-2 xl:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Nearby Suppliers</CardTitle>
              <Truck className="h-5 w-5 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">24</div>
              <div className="flex items-center text-xs text-blue-600 dark:text-blue-400 mt-2">
                <MapPin className="h-3 w-3 mr-1" />
                {locationLoading ? "Locating..." : "Within 50km radius"}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">4 with same-day delivery</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 sm:gap-6">
          <div className="order-2 2xl:order-1">
            <ProjectSpendingChart />
          </div>
          <div className="order-1 2xl:order-2">
            <RadialProjectChart />
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Projects</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">5</p>
                </div>
                <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending Orders</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">12</p>
                </div>
                <div className="h-8 w-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">$138K</p>
                </div>
                <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Delivery</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">2.3d</p>
                </div>
                <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <Truck className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </LayoutWrapper>
  )
}
