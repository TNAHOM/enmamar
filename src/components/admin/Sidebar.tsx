"use client";

import { useState } from "react";
import { BarChart3, Home, PieChart, Plus, Users, X } from "lucide-react";
import Link from "next/link";
import { AddCourseModal } from "./course/AddCourseModal";

// Sidebar Component
export const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) => {
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        w-64 lg:w-full bg-white lg:bg-transparent
        border-r border-gray-200 
        transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0
        transition-transform duration-300 ease-in-out
        p-4 lg:p-0 pt-14
      `}
      >
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 lg:hidden p-2 hover:bg-gray-100 rounded-md"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-1 mb-8 mt-12 lg:mt-0">
          <button
            className="w-full bg-purple-600 text-white rounded-md py-3 px-4 flex items-center justify-center gap-2 font-medium text-sm lg:text-base"
            onClick={() => setIsAddCourseModalOpen(true)}
          >
            <Plus className="h-4 w-4 lg:h-5 lg:w-5" />
            <span className="hidden sm:inline">Add New Course</span>
            <span className="sm:hidden">Add Course</span>
          </button>
        </div>

        <nav className="space-y-6 lg:space-y-8">
          <div className="space-y-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 text-purple-600 font-medium px-3 py-2 rounded-md text-sm lg:text-base"
              onClick={onClose}
            >
              <Home className="h-4 w-4 lg:h-5 lg:w-5" />
              Dashboard
            </Link>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider px-3 mb-1">
              MANAGEMENT
            </div>
            <Link
              href="/admin/courses"
              className="flex items-center gap-3 text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm lg:text-base"
              onClick={onClose}
            >
              <BarChart3 className="h-4 w-4 lg:h-5 lg:w-5" />
              <span className="hidden sm:inline">Course Management</span>
              <span className="sm:hidden">Courses</span>
            </Link>
            <Link
              href="/admin/instructors"
              className="flex items-center gap-3 text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm lg:text-base"
              onClick={onClose}
            >
              <Users className="h-4 w-4 lg:h-5 lg:w-5" />
              <span className="hidden sm:inline">Instructor Management</span>
              <span className="sm:hidden">Instructors</span>
            </Link>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider px-3 mb-1">
              REPORT
            </div>
            <button
              className="flex items-center gap-3 text-gray-400 cursor-not-allowed px-3 py-2 rounded-md text-sm lg:text-base w-full"
              disabled
            >
              <PieChart className="h-4 w-4 lg:h-5 lg:w-5" />
              <span className="hidden sm:inline">Report & Analytics</span>
              <span className="sm:hidden">Reports</span>
            </button>
          </div>
        </nav>
        <AddCourseModal
          isOpen={isAddCourseModalOpen}
          onClose={() => setIsAddCourseModalOpen(false)}
        />
      </aside>
    </>
  );
};
