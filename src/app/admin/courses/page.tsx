"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CourseList } from "@/components/admin/course/CourseList";
import { CourseStats } from "@/components/admin/course/CourseStats";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AddCourseModal } from "@/components/admin/course/AddCourseModal";
import { Button } from "@/components/ui/button";

export default function CoursesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <AdminLayout>
      <div className="">
        {/* Search and other content */}
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
          {/* Add New Course Button */}
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Add New Course
          </Button>
        </div>

        <CourseStats />

        {/* Course lists */}
        <div className="space-y-8">
          <CourseList
            title="Recent Courses"
            viewAll="/admin/courses/allCourses"
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
