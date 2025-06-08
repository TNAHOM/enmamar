"use client";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Tooltip, // added import for hover effect
  ReferenceLine,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { ChartDataItem } from "@/hooks/useInstructorAnalysis";
import { useMemo } from "react";

interface StatsGraphProps {
  data: ChartDataItem[];
  title?: string;
  description?: string;
  height?: number;
}

export default function StatsGraph({
  data,
  title = "Revenue & Enrollment Analytics",
  description = "Track your course performance over time with detailed revenue and enrollment metrics",
  height = 400,
}: StatsGraphProps) {

  // Calculate statistics
  const stats = useMemo(() => {
    if (!data || data.length === 0) return null;

    const totalRevenue = data.reduce(
      (sum, item) => sum + (item.revenue || 0),
      0
    );
    const totalEnrollment = data.reduce(
      (sum, item) => sum + (item.enrollment || 0),
      0
    );
    const avgRevenue = totalRevenue / data.length;
    const avgEnrollment = totalEnrollment / data.length;

    // Calculate trends (comparing last vs first half of data)
    const midPoint = Math.floor(data.length / 2);
    const firstHalf = data.slice(0, midPoint);
    const secondHalf = data.slice(midPoint);

    const firstHalfRevenue =
      firstHalf.reduce((sum, item) => sum + (item.revenue || 0), 0) /
      firstHalf.length;
    const secondHalfRevenue =
      secondHalf.reduce((sum, item) => sum + (item.revenue || 0), 0) /
      secondHalf.length;
    const revenueTrend =
      ((secondHalfRevenue - firstHalfRevenue) / firstHalfRevenue) * 100;

    const firstHalfEnrollment =
      firstHalf.reduce((sum, item) => sum + (item.enrollment || 0), 0) /
      firstHalf.length;
    const secondHalfEnrollment =
      secondHalf.reduce((sum, item) => sum + (item.enrollment || 0), 0) /
      secondHalf.length;
    const enrollmentTrend =
      ((secondHalfEnrollment - firstHalfEnrollment) / firstHalfEnrollment) *
      100;

    return {
      totalRevenue,
      totalEnrollment,
      avgRevenue,
      avgEnrollment,
      revenueTrend,
      enrollmentTrend,
    };
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No data available for the selected period</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient
                id="enrollmentGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
              </linearGradient>

              <linearGradient
                id="coursesGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={false}
              axisLine={{ stroke: "#d1d5db", strokeWidth: 1 }}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={false}
              axisLine={{ stroke: "#d1d5db", strokeWidth: 1 }}
              tickFormatter={(value) =>
                value >= 1000
                  ? `${(value / 1000).toFixed(0)}k`
                  : value.toString()
              }
            />
            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              wrapperStyle={{ paddingBottom: "20px" }}
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />{" "}
            {/* added tooltip for hover effect */}
            {/* Revenue Area */}
            <Area
              dataKey="revenue"
              type="monotone"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#revenueGradient)"
              name="Revenue ($)"
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "#3b82f6" }}
            />
            {/* Enrollment Area */}
            <Area
              dataKey="enrollment"
              type="monotone"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#enrollmentGradient)"
              name="Enrollments"
              dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "#10b981" }}
            />
            <Area
              dataKey="courses"
              type="monotone"
              stroke="#f59e0b"
              strokeWidth={2}
              fill="url(#coursesGradient)"
              name="Courses"
              dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "#f59e0b" }}
            />
            {/* Average reference lines */}
            {stats && (
              <ReferenceLine
                y={stats.avgRevenue}
                stroke="#3b82f6"
                strokeDasharray="5 5"
                strokeOpacity={0.5}
                label={{ value: "Avg Revenue" }}
              />
            )}
            {stats && (
              <ReferenceLine
                y={stats.avgEnrollment}
                stroke="#10b981"
                strokeDasharray="5 5"
                strokeOpacity={0.5}
                label={{ value: "Avg Enrollment" }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
