"use client";

import { Card } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", enrollments: 2400, revenue: 4000 },
  { month: "Feb", enrollments: 1398, revenue: 3000 },
  { month: "Mar", enrollments: 9800, revenue: 2000 },
  { month: "Apr", enrollments: 3908, revenue: 2780 },
  { month: "May", enrollments: 4800, revenue: 1890 },
  { month: "Jun", enrollments: 3800, revenue: 2390 },
  { month: "Jul", enrollments: 4300, revenue: 3490 },
];

export function CourseStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 mb-8">
      <Card className="p-6">
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-medium">Course Enrollments</h3>
          <p className="text-sm text-gray-500">Monthly enrollment trends</p>
        </div>
        <div className="h-[200px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="enrollments"
                stroke="#8b5cf6"
                fill="#c4b5fd"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-medium">Revenue</h3>
          <p className="text-sm text-gray-500">Monthly revenue in Birr</p>
        </div>
        <div className="h-[200px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value} Birr`}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8b5cf6"
                fill="#c4b5fd"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
