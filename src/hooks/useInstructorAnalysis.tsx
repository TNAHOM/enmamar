import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { InstructorCourseAnalytics } from "@/types/instructor"; // Assuming this is the type for ONE item in the array


export interface ChartDataItem {
  month: string;
  enrollment: number;
  revenue: number;
}

export default function useInstructorAnalysis(userId?: string) {
  const router = useRouter();
  const [analytics, setAnalytics] = useState<InstructorCourseAnalytics>();
  const [loadingAnalysis, setLoadingAnalysis] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoadingAnalysis(false);
      return;
    }

    const fetchData = async () => {
      setLoadingAnalysis(true);
      const response = await fetch(`/api/instructors/analysis/${userId}`);
      if (response.status === 401) {
        toast.error("Need to Login as instructor");
        router.push("/auth/login");
      }
      const data = await response.json();

      setAnalytics(data);

      setLoadingAnalysis(false);
    };

    fetchData();
  }, [userId, router]);

  return { analytics, loadingAnalysis };
}

export const getCourseAnalytics = (
  data: InstructorCourseAnalytics | InstructorCourseAnalytics[]
): ChartDataItem[] => {
  const monthlyAggregates: {
    [month: string]: ChartDataItem;
  } = {};

  if (!Array.isArray(data)) {
    data = [data];
  }

  data.forEach((item) => {
    // Basic validation for the item structure
    if (!item || !item.course || typeof item.course.created_at !== "string") {
      return;
    }
    const enrollments =
      typeof item.no_of_enrollments === "number" ? item.no_of_enrollments : 0;

    const createdAtDate = new Date(item.course.created_at);

    const monthName = createdAtDate.toLocaleString("en-US", { month: "long" });

    if (!monthlyAggregates[monthName]) {
      monthlyAggregates[monthName] = {
        month: monthName,
        enrollment: 0,
        revenue: 0,
      };
    }

    monthlyAggregates[monthName].enrollment += enrollments;
    const price = typeof item.course.price === "number" ? item.course.price : 0;
    const discountPercent =
      typeof item.course.discount === "number" ? item.course.discount : 0;
    const discountedPrice = price - (price * discountPercent) / 100;
    monthlyAggregates[monthName].revenue += discountedPrice * enrollments;
  });

  const chartDataArray = Object.values(monthlyAggregates);

  const monthOrder: { [month: string]: number } = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  chartDataArray.sort((a, b) => {
    const orderA = monthOrder[a.month] || 0;
    const orderB = monthOrder[b.month] || 0;
    return orderA - orderB;
  });

  return chartDataArray;
};

