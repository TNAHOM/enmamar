// import { ArrowUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number;
  change: string;
  positive: boolean;
}

export function StatCard({ title, value }: StatCardProps) {
  return (
    <Card className="border border-gray-200 rounded-lg shadow-sm">
      <CardContent className="p-6">
        <div className="text-sm text-gray-500 font-medium mb-1">{title}</div>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold">{value}</div>
          {/* <div
            className={`flex items-center text-sm ${
              positive ? "text-green-500" : "text-red-500"
            }`}
          >
            {change}
            <ArrowUp className="h-3 w-3 ml-0.5" />
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
