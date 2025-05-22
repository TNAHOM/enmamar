"use client";
import SalesReport from "@/components/admin/SalesReport";
import { StatCard } from "@/components/admin/StatCard";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAuthStore } from "@/lib/store/auth-store";
import { useInstructors } from "@/hooks/useInstructors";
import { useGetTopicCourses } from "@/hooks/useGetCourses";

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const { instructors } = useInstructors();
  const courses = useGetTopicCourses()

  const totalInstructors = instructors.length;
  const totalCoursesCount = courses.data?.length || 0;
  return (
    <AdminLayout>
      <div className="space-y-8 w-full">
        <div>
          <h1 className="text-xl font-medium">
            Hey {user?.first_name} -{" "}
            <span className="text-gray-500 font-normal">
              {"here's what's happening with your store today"}
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <StatCard
            title="TOTAL USER"
            value={99}
            change="+36%"
            positive={true}
          />
          <StatCard
            title="TOTAL COURSES"
            value={totalCoursesCount}
            change="+48%"
            positive={true}
          />
          <StatCard
            title="TOTAL INSTRUCTORS"
            value={totalInstructors}
            change="+23%"
            positive={true}
          />
          <StatCard
            title="Total ENROLLMENTS"
            value={20}
            change="+36%"
            positive={true}
          />
        </div>
        <SalesReport />
      </div>
    </AdminLayout>
  );
}
