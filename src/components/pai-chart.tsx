"use client"
import { Pie, PieChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Squircle } from "lucide-react"

interface EmploymentStatusProps {
  dataMaleAdmin: string | undefined;
  dataFemaleAdmin: string | undefined;
}

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

export function PaiChart({
  dataMaleAdmin,
  dataFemaleAdmin,
}: EmploymentStatusProps) {
  // Convert props to numbers, using 0 as a fallback if they are undefined or not numeric
  const maleVisitors = isNaN(Number(dataMaleAdmin)) ? 0 : Number(dataMaleAdmin);
  const femaleVisitors = isNaN(Number(dataFemaleAdmin)) ? 0 : Number(dataFemaleAdmin);

  // Dynamically create chartData using the props
  const chartData = [
    { browser: "Male", visitors: maleVisitors, fill: "#5D54D5" },
    { browser: "Female", visitors: femaleVisitors, fill: "#029BDE" },
  ];

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
      <div className="flex flex-col gap-3 p-5">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <Squircle className="bg-[#5D54D5] text-[#5D54D5] rounded-md" />
            <text>Male</text>
          </div>
          <div>
            <text>{maleVisitors}</text>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-3">
            <Squircle className="bg-[#029BDE] text-[#029BDE] rounded-md" />
            <text>Female</text>
          </div>
          <div>
            <text>{femaleVisitors}</text>
          </div>
        </div>
      </div>
    </div>
  )
}