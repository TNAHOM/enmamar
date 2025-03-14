"use client";
import { BookOpen, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ProfileSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="border-r border-gray-200 w-full h-full">
      <div className="space-y-8 font-semibold p-2">
        <div className="space-y-2">
          <div className="text-sm text-gray-400 uppercase tracking-wider px-3 mb-1">
            Profile
          </div>
          <Link
            href="/profile"
            className={`flex items-center gap-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md text-lg ${
              pathname === "/profile"
                ? "text-purple-600 bg-purple-50 rounded-md"
                : ""
            }`}
          >
            <UserCircle className="h-5 w-5" />
            Profile
          </Link>
          <Link
            href="/profile/enrolledCourses"
            className={`flex items-center gap-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md text-lg ${
              pathname === "/profile/enrolledCourses"
                ? "text-purple-600 bg-purple-50 rounded-md"
                : ""
            }`}
          >
            <BookOpen className="h-5 w-5" />
            Enrolled Courses
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
