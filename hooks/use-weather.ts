"use client"

import { useState, useEffect } from "react"

interface WeatherData {
  current: {
    temp: number
    feels_like: number
    humidity: number
    pressure: number
    wind_speed: number
    wind_deg: number
    weather: Array<{
      main: string
      description: string
      icon: string
    }>
  }
  daily: Array<{
    dt: number
    temp: {
      day: number
      night: number
      min: number
      max: number
    }
    weather: Array<{
      main: string
      description: string
      icon: string
    }>
    humidity: number
    wind_speed: number
    pop: number // Probability of precipitation
  }>
}

interface WeatherState {
  data: WeatherData | null
  loading: boolean
  error: string | null
}

export function useWeather(lat: number | null, lon: number | null) {
  const [weather, setWeather] = useState<WeatherState>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    if (!lat || !lon) {
      // Use mock data when location is not available
      setWeather({
        data: {
          current: {
            temp: 22,
            feels_like: 24,
            humidity: 65,
            pressure: 1013,
            wind_speed: 3.5,
            wind_deg: 180,
            weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
          },
          daily: [
            {
              dt: Date.now() / 1000,
              temp: { day: 22, night: 15, min: 12, max: 25 },
              weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
              humidity: 65,
              wind_speed: 3.5,
              pop: 0.1,
            },
            {
              dt: Date.now() / 1000 + 86400,
              temp: { day: 19, night: 13, min: 10, max: 22 },
              weather: [{ main: "Clouds", description: "few clouds", icon: "02d" }],
              humidity: 70,
              wind_speed: 4.2,
              pop: 0.3,
            },
            {
              dt: Date.now() / 1000 + 172800,
              temp: { day: 16, night: 11, min: 8, max: 19 },
              weather: [{ main: "Rain", description: "light rain", icon: "10d" }],
              humidity: 85,
              wind_speed: 5.1,
              pop: 0.8,
            },
            {
              dt: Date.now() / 1000 + 259200,
              temp: { day: 18, night: 12, min: 9, max: 21 },
              weather: [{ main: "Clouds", description: "scattered clouds", icon: "03d" }],
              humidity: 75,
              wind_speed: 3.8,
              pop: 0.4,
            },
          ],
        },
        loading: false,
        error: null,
      })
      return
    }

    // In a real app, you would use an actual weather API
    // const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
    // const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

    // For demo purposes, we'll simulate an API call with mock data
    setTimeout(() => {
      setWeather({
        data: {
          current: {
            temp: 22,
            feels_like: 24,
            humidity: 65,
            pressure: 1013,
            wind_speed: 3.5,
            wind_deg: 180,
            weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
          },
          daily: [
            {
              dt: Date.now() / 1000,
              temp: { day: 22, night: 15, min: 12, max: 25 },
              weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
              humidity: 65,
              wind_speed: 3.5,
              pop: 0.1,
            },
            {
              dt: Date.now() / 1000 + 86400,
              temp: { day: 19, night: 13, min: 10, max: 22 },
              weather: [{ main: "Clouds", description: "few clouds", icon: "02d" }],
              humidity: 70,
              wind_speed: 4.2,
              pop: 0.3,
            },
            {
              dt: Date.now() / 1000 + 172800,
              temp: { day: 16, night: 11, min: 8, max: 19 },
              weather: [{ main: "Rain", description: "light rain", icon: "10d" }],
              humidity: 85,
              wind_speed: 5.1,
              pop: 0.8,
            },
            {
              dt: Date.now() / 1000 + 259200,
              temp: { day: 18, night: 12, min: 9, max: 21 },
              weather: [{ main: "Clouds", description: "scattered clouds", icon: "03d" }],
              humidity: 75,
              wind_speed: 3.8,
              pop: 0.4,
            },
          ],
        },
        loading: false,
        error: null,
      })
    }, 1000)
  }, [lat, lon])

  return weather
}
