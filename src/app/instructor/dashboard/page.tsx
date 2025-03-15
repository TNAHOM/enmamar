"use client";

import InstructorLayout from "@/components/instructor/layout/InstructorLayout";
import InstructorCourseList from "@/components/instructor/course/InstructorCourseList";
import StatsGraph from "@/components/instructor/dashboard/StatsGraph";
import { mockInstructorCourses, mockMonthlyStats, mockRecentEnrollments } from "@/utilities/instructor";

export default function InstructorDashboard() {
  return (
    <InstructorLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <StatsGraph data={mockMonthlyStats} />
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Your Courses</h3>
          <InstructorCourseList courses={mockInstructorCourses} />
        </div>
      </div>
    </InstructorLayout>
  );
}
