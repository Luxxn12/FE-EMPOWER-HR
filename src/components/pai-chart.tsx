"use client"
import { Pie, PieChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Squircle } from "lucide-react"
const chartData = [
  { browser: "Male", visitors: 60, fill: "#5D54D5" },
  { browser: "Female", visitors: 40, fill: "#029BDE" },
]

const chartConfig = {
  chrome: {
    label: "Male",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Female",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function PaiChart() {
  return (
    <div>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie data={chartData} dataKey="visitors" nameKey="browser" />
        </PieChart>
      </ChartContainer>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <Squircle className="bg-[#5D54D5] text-[#5D54D5] rounded-md" />
            <text>Male</text>
          </div>
          <div>
            <text>60</text>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-3">
            <Squircle className="bg-[#029BDE] text-[#029BDE] rounded-md" />
            <text>Female</text>
          </div>
          <div>
            <text>40</text>
          </div>
        </div>
      </div>
    </div>
  )
}

