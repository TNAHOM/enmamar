// hooks/useTimeFilter.ts
import { useState, useCallback } from "react";

export type TimeFilterType = "day" | "week" | "month" | "year";

export interface TimeFilterState {
  type: TimeFilterType;
  value: number;
}

const defaultCurrentYear: number = new Date().getFullYear();
export const useTimeFilter = (
  initialFilter: TimeFilterState = { type: "year", value: defaultCurrentYear }
) => {
  const [filter, setFilter] = useState<TimeFilterState>(initialFilter);
  const updateFilter = useCallback((type: TimeFilterType, value: number) => {
    setFilter({ type, value });
  }, []);

  const getQueryParam = useCallback(() => {
    return `${filter.type}=${filter.value}`;
  }, [filter]);

  return {
    filter,
    updateFilter,
    getQueryParam,
  };
};
