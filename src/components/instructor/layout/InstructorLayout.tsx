import React from "react";
import RecentEnrollments from "@/components/instructor/dashboard/RecentEnrollments";

const InstructorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
      <main className="flex-grow p-4 px-6 sm:p-6 sm:px-8 md:p-8 md:px-12 lg:p-12 lg:px-20 w-full sm:w-[80%]">
        {children}
      </main>
      <aside className="w-full sm:w-[20%] border-t sm:border-l p-2 sm:p-4 bg-background">
        <RecentEnrollments />
      </aside>
    </div>
  );
};

export default InstructorLayout;
