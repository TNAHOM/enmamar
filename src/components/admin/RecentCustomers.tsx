import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { CustomerRow } from "./CustomRow";

const RecentCustomers = () => {
  return (
    <Card className="border border-gray-200 rounded-lg shadow-sm w-full">
      <CardContent className="p-6">
        <h2 className="text-lg font-medium mb-2">Recent Customers</h2>
        <p className="text-gray-500 text-sm mb-6">
          Lorem ipsum dolor sit ametis.
        </p>

        <div className="space-y-6">
          <CustomerRow
            name="Jenny Wilson"
            email="w.lawson@example.com"
            avatarSrc="/placeholder.svg?height=40&width=40"
          />
          <CustomerRow
            name="Devon Lane"
            email="devon@example.com"
            avatarSrc="/placeholder.svg?height=40&width=40"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentCustomers;
