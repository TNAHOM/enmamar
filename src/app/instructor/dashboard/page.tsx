"use client";

import InstructorLayout from "@/components/instructor/layout/InstructorLayout";
import InstructorCourseList from "@/components/instructor/course/InstructorCourseList";
import StatsGraph from "@/components/instructor/dashboard/StatsGraph";
import { mockMonthlyStats } from "@/utilities/instructor";
import { useAuthStore } from "@/lib/store/auth-store";
import { useGetCourses } from "@/hooks/useGetCourses";

export default function InstructorDashboard() {
  const { user } = useAuthStore();

  const { data, error, loading } = useGetCourses({
    apiRoute: `/api/instructors/${user?.id}`,
    type: "instructorCourse",
  });

  return (
    <InstructorLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <StatsGraph data={mockMonthlyStats} />
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Your Courses</h3>

          {loading ? (
            <div className="text-center py-10">
              <p className="text-gray-500">Loading your courses...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500">
                Failed to load courses. Please try again later.
              </p>
            </div>
          ) : !data || !Array.isArray(data) || data.length === 0 ? (
            <div className="text-center py-10">
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
