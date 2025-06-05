"use client";
import InstructorLayout from "@/components/instructor/layout/InstructorLayout";
import InstructorCourseList from "@/components/instructor/course/InstructorCourseList";
import StatsGraph from "@/components/instructor/dashboard/StatsGraph";
import { useAuthStore } from "@/lib/store/auth-store";
import { useGetCourses } from "@/hooks/useGetCourses";
import {
  ChartDataItem,
  getCourseAnalytics,
} from "@/hooks/useInstructorAnalysis";
import { useEffect, useState } from "react";

export default function InstructorDashboard() {
  const { user } = useAuthStore();
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const { data, error, loading } = useGetCourses({
    apiRoute: `/api/instructors/${user?.id}`,
    type: "instructorCourse",
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const response = getCourseAnalytics(data) as ChartDataItem[];
      setChartData(response);
    }
  }, [data]);

  return (
    <InstructorLayout>
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Dashboard
        </h2>
        <div className="w-full h-fit">
          <StatsGraph data={chartData} />
        </div>
        <div className="mt-4 sm:mt-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
            Your Courses
          </h3>
          {loading ? (
            <div className="text-center py-5 sm:py-10">
              <p className="text-gray-500">Loading your courses...</p>
            </div>
          ) : error ? (
            <div className="text-center py-5 sm:py-10">
              <p className="text-red-500">
                Failed to load courses. Please try again later.
              </p>
            </div>
          ) : !data || !Array.isArray(data) || data.length === 0 ? (
            <div className="text-center py-5 sm:py-10">
              <p className="text-gray-500">
                {"You haven't created any courses yet."}
              </p>
            </div>
          ) : (
            <InstructorCourseList data={data} />
          )}
        </div>
      </div>
    </InstructorLayout>
  );
}
