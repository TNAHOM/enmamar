"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TimeFilterType } from "@/hooks/useTimeFilter";
import { useState, useEffect } from "react";
import { BarChart3 } from "lucide-react";

interface TimeFilterProps {
  filterType: TimeFilterType;
  filterValue: number;
  onFilterChange: (type: TimeFilterType, value: number) => void;
  isLoading?: boolean;
}

export const ImprovedTimeFilter = ({
  filterType,
  filterValue,
  onFilterChange,
  isLoading,
}: TimeFilterProps) => {
  const [inputValue, setInputValue] = useState(filterValue.toString());

  const handleTypeChange = (type: TimeFilterType) => {
    onFilterChange(type, parseInt(inputValue) || 1);
  };

  const handleValueChange = (value: string) => {
    setInputValue(value);
  };

  const handleInputBlur = () => {
    const numValue = parseInt(inputValue);
    if (isNaN(numValue) || numValue <= 0) {
      setInputValue("1");
      onFilterChange(filterType, 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const numValue = parseInt(inputValue);
      if (!isNaN(numValue) && numValue > 0) {
        onFilterChange(filterType, numValue);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [inputValue, filterType, onFilterChange]);

  const getMaxValue = () => {
    switch (filterType) {
      case "day":
        return 365;
      case "week":
        return 52;
      case "month":
        return 12;
      case "year":
        return 10;
      default:
        return 12;
    }
  };

  const getPlaceholder = () => {
    switch (filterType) {
      case "day":
        return "Enter days (1-365)";
      case "week":
        return "Enter weeks (1-52)";
      case "month":
        return "Enter months (1-12)";
      case "year":
        return "Enter years (1-10)";
      default:
        return "Enter value";
    }
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          Analytics Filter
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 min-w-fit">
            <Label
              htmlFor="time-type"
              className="text-sm font-medium text-gray-700"
            >
              Period:
            </Label>
            <Select
              value={filterType}
              onValueChange={handleTypeChange}
              disabled={isLoading}
            >
              <SelectTrigger
                id="time-type"
                className="w-32 bg-white border-gray-300 focus:border-blue-500"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>Day(s)</span>
                  </div>
                </SelectItem>
                <SelectItem value="week">
                  <div className="flex items-center gap-2">
                    <span>📊</span>
                    <span>Week(s)</span>
                  </div>
                </SelectItem>
                <SelectItem value="month">
                  <div className="flex items-center gap-2">
                    <span>📈</span>
                    <span>Month(s)</span>
                  </div>
                </SelectItem>
                <SelectItem value="year">
                  <div className="flex items-center gap-2">
                    <span>🗓️</span>
                    <span>Year(s)</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 min-w-fit">
            <Label
              htmlFor="time-value"
              className="text-sm font-medium text-gray-700"
            >
              Last:
            </Label>
            <Input
              id="time-value"
              type="number"
              min="1"
              max={getMaxValue()}
              value={inputValue}
              onChange={(e) => handleValueChange(e.target.value)}
              onBlur={handleInputBlur}
              placeholder={getPlaceholder()}
              className="w-32 bg-white border-gray-300 focus:border-blue-500"
              disabled={isLoading}
            />
          </div>

          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-800 border-blue-200"
          >
            Showing last {filterValue} {filterType}
            {filterValue > 1 ? "s" : ""}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};