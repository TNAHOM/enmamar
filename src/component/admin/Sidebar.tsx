import { BarChart3, Home, PieChart, Plus, Users } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="border-r border-gray-200 p-6 col-span-2">
      <div className="space-y-1 mb-8">
        <button className="w-full bg-purple-600 text-white rounded-md py-3 px-4 flex items-center justify-center gap-2 font-medium">
          <Plus className="h-5 w-5" />
          Add New Course
        </button>
      </div>

      <nav className="space-y-8">
        <div className="space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 text-purple-600 font-medium px-3 py-2 rounded-md"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider px-3 mb-1">
            MANAGEMENT
          </div>
          <Link
            href="/admin/courses"
            className="flex items-center gap-3 text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md"
          >
            <BarChart3 className="h-5 w-5" />
            Course Management
          </Link>
          <Link
            href="/admin/instructors"
            className="flex items-center gap-3 text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md"
          >
            <Users className="h-5 w-5" />
            Instructor Management
          </Link>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider px-3 mb-1">
            REPORT
          </div>
          <Link
            href="/admin/reports"
            className="flex items-center gap-3 text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md"
          >
            <PieChart className="h-5 w-5" />
            Report & Analytics
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
