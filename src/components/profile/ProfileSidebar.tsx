import { BookOpen, UserCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const ProfileSidebar = () => {
  return (
    <aside className="border-r border-gray-200 w-full h-full">
      <div className="space-y-8">
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-400 uppercase tracking-wider px-3 mb-1">
            Profile
          </div>
          <Link
            href="/profile"
            className="flex items-center gap-3 text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-lg"
          >
            <UserCircle className="h-5 w-5" />
            Profile
          </Link>
          <Link
            href="/profile/enrolledCourses"
            className="flex items-center gap-3 text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-lg"
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
