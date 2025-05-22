"use client";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartDataItem } from "@/hooks/useInstructorAnalysis";

const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
  enrollment: { label: "Enrollment", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

export default function StatsGraph({ data }: { data: ChartDataItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overall Analysis</CardTitle>
        <CardDescription>
          This graph consists of revenue and enrollments for the past 1 year.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[250px] sm:h-[300px] md:h-[400px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="enrollment"
              type="natural"
              fill="var(--color-enrollment)"
              fillOpacity={0.4}
              stroke="var(--color-enrollment)"
              stackId="a"
            />
            <Area
              dataKey="revenue"
              type="natural"
              fill="var(--color-revenue)"
              fillOpacity={0.4}
              stroke="var(--color-revenue)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
