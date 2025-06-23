"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Building2 } from "lucide-react"

const projectSpendingData = [
  { name: "Residential Complex A", value: 45000, color: "#3b82f6", percentage: 32.6 },
  { name: "Commercial Plaza B", value: 32000, color: "#06b6d4", percentage: 23.2 },
  { name: "Industrial Warehouse C", value: 28000, color: "#8b5cf6", percentage: 20.3 },
  { name: "Office Building D", value: 18000, color: "#10b981", percentage: 13.0 },
  { name: "Retail Center E", value: 15000, color: "#f59e0b", percentage: 10.9 },
]

const COLORS = ["#3b82f6", "#06b6d4", "#8b5cf6", "#10b981", "#f59e0b"]

const chartConfig = {
  residential: {
    label: "Residential Complex A",
    color: "#3b82f6",
  },
  commercial: {
    label: "Commercial Plaza B",
    color: "#06b6d4",
  },
  industrial: {
    label: "Industrial Warehouse C",
    color: "#8b5cf6",
  },
  office: {
    label: "Office Building D",
    color: "#10b981",
  },
  retail: {
    label: "Retail Center E",
    color: "#f59e0b",
  },
}

export function RadialProjectChart() {
  const totalSpending = projectSpendingData.reduce((sum, project) => sum + project.value, 0)

  return (
    <Card className="backdrop-blur-md bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/20 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Project Spending Distribution
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">Total Budget: ₹{totalSpending.toLocaleString()}</p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] sm:h-[320px] md:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={projectSpendingData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {projectSpendingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="rounded-lg border bg-background p-3 shadow-md">
                        <div className="grid gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Project</span>
                            <span className="font-bold text-muted-foreground text-sm">{data.name}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">Amount</span>
                              <span className="font-bold">₹{data.value.toLocaleString()}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">Percentage</span>
                              <span className="font-bold">{data.percentage}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Project breakdown */}
        <div className="mt-4 space-y-2">
          {projectSpendingData.map((project, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{project.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  ${project.value.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{project.percentage}%</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
