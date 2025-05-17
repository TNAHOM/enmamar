import React from "react";
import RecentEnrollments from "@/components/instructor/dashboard/RecentEnrollments";
import { mockRecentEnrollments } from "@/utilities/instructor";

const InstructorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen ">
      <main className="flex-grow p-12 px-20 w-[80%]">{children}</main>
      <aside className="w-[20%] border-l p-4 bg-background">
        <RecentEnrollments enrollments={mockRecentEnrollments} />
      </aside>
    </div>
  );
};

export default InstructorLayout;
