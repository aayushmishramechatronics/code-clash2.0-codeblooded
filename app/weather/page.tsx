"use client"

import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { useGeolocation } from "@/hooks/use-geolocation"
import { useWeather } from "@/hooks/use-weather"
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  Gauge,
  Compass,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react"

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case "clear":
      return Sun
    case "clouds":
      return Cloud
    case "rain":
      return CloudRain
    default:
      return Cloud
  }
}

const getConstructionImpact = (weather: any) => {
  const rainProb = weather.pop
  const windSpeed = weather.wind_speed

  if (rainProb > 0.7 || windSpeed > 10) {
    return {
      level: "High Risk",
      color: "destructive",
      icon: XCircle,
      advice: "Avoid concrete work and outdoor activities",
    }
  } else if (rainProb > 0.3 || windSpeed > 6) {
    return {
      level: "Medium Risk",
      color: "default",
      icon: AlertTriangle,
      advice: "Monitor conditions, prepare contingency plans",
    }
  } else {
    return {
      level: "Low Risk",
      color: "secondary",
      icon: CheckCircle,
      advice: "Good conditions for all construction activities",
    }
  }
}

export default function WeatherPage() {
  const { latitude, longitude, loading: locationLoading, error: locationError } = useGeolocation()
  const { data: weatherData, loading: weatherLoading, error: weatherError } = useWeather(latitude, longitude)

  if (locationLoading || weatherLoading) {
    return (
      <LayoutWrapper title="Weather Forecast" subtitle="Real-time weather data for your location">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading weather data...</p>
          </div>
        </div>
      </LayoutWrapper>
    )
  }

  if (locationError || weatherError || !weatherData) {
    return (
      <LayoutWrapper title="Weather Forecast" subtitle="Real-time weather data for your location">
        <Card className="glass-card">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Unable to load weather data</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {locationError || weatherError || "Please enable location access to see weather data"}
            </p>
          </CardContent>
        </Card>
      </LayoutWrapper>
    )
  }

  return (
    <LayoutWrapper title="Weather Forecast" subtitle="Real-time weather data and construction impact analysis">
      <div className="space-y-6">
        {/* Current Weather */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Current Weather Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {React.createElement(getWeatherIcon(weatherData.current.weather[0].main), {
                    className: "h-16 w-16 text-blue-600 dark:text-blue-400",
                  })}
                  <div>
                    <div className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                      {Math.round(weatherData.current.temp)}°C
                    </div>
                    <div className="text-lg text-gray-600 dark:text-gray-400 capitalize">
                      {weatherData.current.weather[0].description}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Feels like {Math.round(weatherData.current.feels_like)}°C
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Humidity</span>
                  </div>
                  <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {weatherData.current.humidity}%
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Wind className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Wind Speed</span>
                  </div>
                  <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {Math.round(weatherData.current.wind_speed)} m/s
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Gauge className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Pressure</span>
                  </div>
                  <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {weatherData.current.pressure} hPa
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Compass className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Wind Dir</span>
                  </div>
                  <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {weatherData.current.wind_deg}°
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4-Day Forecast */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              4-Day Weather Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {weatherData.daily.slice(0, 4).map((day, index) => {
                const date = new Date(day.dt * 1000)
                const WeatherIcon = getWeatherIcon(day.weather[0].main)
                const impact = getConstructionImpact(day)
                const ImpactIcon = impact.icon

                return (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/30 dark:border-gray-600/30"
                  >
                    <div className="text-center mb-3">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {index === 0 ? "Today" : date.toLocaleDateString("en-US", { weekday: "short" })}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </div>
                    </div>

                    <div className="flex justify-center mb-3">
                      <WeatherIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>

                    <div className="text-center mb-3">
                      <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {Math.round(day.temp.max)}°
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{Math.round(day.temp.min)}°</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 capitalize mt-1">
                        {day.weather[0].description}
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Rain:</span>
                        <span className="font-medium">{Math.round(day.pop * 100)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Wind:</span>
                        <span className="font-medium">{Math.round(day.wind_speed)} m/s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Humidity:</span>
                        <span className="font-medium">{day.humidity}%</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-1 mb-1">
                        <ImpactIcon className="h-3 w-3" />
                        <Badge variant={impact.color as any} className="text-xs">
                          {impact.level}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{impact.advice}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Construction Impact Summary */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              Construction Impact Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Weather Alerts</h3>
                {weatherData.daily.slice(0, 4).map((day, index) => {
                  const date = new Date(day.dt * 1000)
                  const impact = getConstructionImpact(day)

                  if (impact.level === "Low Risk") return null

                  return (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        <span className="font-medium text-orange-900 dark:text-orange-100">
                          {index === 0 ? "Today" : date.toLocaleDateString("en-US", { weekday: "long" })}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {impact.level}
                        </Badge>
                      </div>
                      <p className="text-sm text-orange-800 dark:text-orange-200">{impact.advice}</p>
                    </div>
                  )
                })}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Recommendations</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="font-medium text-green-900 dark:text-green-100">Optimal Days</span>
                    </div>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      Schedule concrete pours and outdoor work on low-risk days
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">
                    <div className="flex items-center gap-2 mb-1">
                      <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium text-blue-900 dark:text-blue-100">Monitor Closely</span>
                    </div>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Check hourly forecasts for medium-risk days before starting work
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutWrapper>
  )
}
