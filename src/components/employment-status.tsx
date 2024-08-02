import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface EmploymentStatusProps {
  dataPermanentAdmin: string | undefined;
  dataContractAdmin: string | undefined;
}

const chartConfig = {
  desktop: {
    label: "Employment Status",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function EmploymentStatus({
  dataPermanentAdmin,
  dataContractAdmin,
}: EmploymentStatusProps) {
  const chartData = [
    {
      month: "Permanent",
      desktop: parseInt(dataPermanentAdmin || "0", 10),
      fill: "#029BDE",
    },
    {
      month: "Contract",
      desktop: parseInt(dataContractAdmin || "0", 10),
      fill: "#F96D20",
    },
  ];

  return (
    <div className="pt-10">
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 20,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 20)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5}>
            <LabelList
              position="top"
              offset={5}
              className="fill-foreground"
              fontSize={10}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}