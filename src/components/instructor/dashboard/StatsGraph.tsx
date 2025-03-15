"use client";

import { Card } from "@/components/ui/card";
import { MonthlyStats } from "@/utilities/instructor";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface StatsGraphProps {
  data: MonthlyStats[];
}

const StatsGraph = ({ data }: StatsGraphProps) => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Course Performance</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="enrollments"
              stroke="#2563eb"
              strokeWidth={2}
              name="Enrollments"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#16a34a"
              strokeWidth={2}
              name="Revenue ($)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default StatsGraph;
