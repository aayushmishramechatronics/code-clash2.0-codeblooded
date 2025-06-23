"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { DollarSign } from "lucide-react"

const projectData = [
  { name: "Residential Complex A", value: 45000, color: "#3b82f6" },
  { name: "Commercial Plaza B", value: 32000, color: "#06b6d4" },
  { name: "Industrial Warehouse C", value: 28000, color: "#8b5cf6" },
  { name: "Office Building D", value: 18000, color: "#10b981" },
  { name: "Retail Center E", value: 15000, color: "#f59e0b" },
]

const COLORS = ["#3b82f6", "#06b6d4", "#8b5cf6", "#10b981", "#f59e0b"]

export function ProjectSpendingChart() {
  const totalSpending = projectData.reduce((sum, project) => sum + project.value, 0)

  return (
    <Card className="backdrop-blur-md bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/20 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Project Material Spending
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">Total: ${totalSpending.toLocaleString()}</p>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            spending: {
              label: "Spending",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px] sm:h-[350px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={projectData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {projectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-md">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Project</span>
                            <span className="font-bold text-muted-foreground">{data.name}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Spending</span>
                            <span className="font-bold">${data.value.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className="text-xs text-gray-600 dark:text-gray-400">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
