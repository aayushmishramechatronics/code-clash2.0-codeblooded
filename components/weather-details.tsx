"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer } from "lucide-react"

const weatherForecast = [
  { day: "Today", temp: "22°C", condition: "Sunny", icon: Sun, risk: "Low" },
  { day: "Tomorrow", temp: "19°C", condition: "Cloudy", icon: Cloud, risk: "Medium" },
  { day: "Day 3", temp: "16°C", condition: "Rainy", icon: CloudRain, risk: "High" },
  { day: "Day 4", temp: "18°C", condition: "Windy", icon: Wind, risk: "Medium" },
]

export function WeatherDetails() {
  return (
    <Card className="backdrop-blur-md bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/20 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Cloud className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Weather Forecast & Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {weatherForecast.map((weather, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/30 dark:border-gray-600/30"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{weather.day}</span>
                <weather.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-gray-500" />
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{weather.temp}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{weather.condition}</p>
                <Badge
                  variant={
                    weather.risk === "High" ? "destructive" : weather.risk === "Medium" ? "default" : "secondary"
                  }
                  className="text-xs"
                >
                  {weather.risk} Risk
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-700/50">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="font-medium text-blue-900 dark:text-blue-100">Construction Impact</span>
          </div>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Rain expected on Day 3 may delay concrete work. Consider rescheduling outdoor activities.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
