"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Lock, TrendingUp, Calendar, BarChart3 } from "lucide-react";

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

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const SalesReport = () => {
  return (
    <Card className="border border-gray-200 rounded-lg shadow-sm relative overflow-hidden">
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium">Sales Report</h2>
          <div className="flex items-center gap-2">
            <button className="bg-purple-600 text-white text-sm px-4 py-1.5 rounded-full">
              12 Months
            </button>
            <button className="text-gray-600 text-sm px-4 py-1.5 rounded-full">
              6 Months
            </button>
            <button className="text-gray-600 text-sm px-4 py-1.5 rounded-full">
              30 Days
            </button>
            <button className="text-gray-600 text-sm px-4 py-1.5 rounded-full">
              7 Days
            </button>
          </div>
        </div>

        {/* Blurred Chart Section */}
        <div className="relative w-full">
          <div className="blur-sm opacity-30 pointer-events-none">
            <CardHeader>
              <CardTitle>Area Chart - Stacked</CardTitle>
              <CardDescription>
                Showing total visitors for the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
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
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.4}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </div>

          {/* Coming Soon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm">
            <div className="text-center max-w-sm mx-auto p-8">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <BarChart3 className="w-10 h-10 text-purple-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <Lock className="w-4 h-4 text-white" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Coming Soon
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Advanced sales analytics with real-time insights, trend
                analysis, and detailed reporting features.
              </p>

              <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Reports</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Insights</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesReport;
