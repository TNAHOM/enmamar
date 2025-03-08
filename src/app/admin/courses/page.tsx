"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CourseList } from "@/components/admin/course/CourseList";
import { CourseStats } from "@/components/admin/course/CourseStats";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AddCourseModal } from "@/components/admin/AddCourseModal";

export default function CoursesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <AdminLayout>
      <div className="">
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Type to search"
                className="pl-10 w-full border-gray-200 rounded-md focus-visible:ring-purple-500"
              />
            </div>
          </div>
        </div>

        <CourseStats />

        <div className="space-y-8">
          <CourseList
            title="Recent Courses"
            viewAll="/admin/courses/recent"
          />

          <CourseList
            title="Most Viewed"
            // courses={mostViewedCourses}
            viewAll="/admin/courses/most-viewed"
          />

          <CourseList
            title="Trending Courses"
            // courses={trendingCourses}
            viewAll="/admin/courses/trending"
          />
        </div>
      </div>

      <AddCourseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </AdminLayout>
  );
}