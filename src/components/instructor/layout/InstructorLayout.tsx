import React from "react";
import RecentEnrollments from "@/components/instructor/dashboard/RecentEnrollments";
import { useFetchData } from "@/hooks/useFetchData";
import { RecentEnrollment } from "@/utilities/instructor";

const InstructorLayout = ({ children }: { children: React.ReactNode }) => {
  const { data, error, loading } = useFetchData<RecentEnrollment[]>({
    url: `/api/instructors/recentCustomers`,
  });

  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
      <main className="flex-grow p-4 px-6 sm:p-6 sm:px-8 md:p-8 md:px-12 lg:p-12 lg:px-20 w-full sm:w-[80%]">
        {children}
      </main>
      <aside className="w-full sm:w-[20%] border-t sm:border-l p-2 sm:p-4 bg-background">
        {loading ? (
          <div className="space-y-4">
            <div className="h-6 bg-muted rounded animate-pulse" />
            <div className="h-6 bg-muted rounded animate-pulse" />
            <div className="h-6 bg-muted rounded animate-pulse" />
          </div>
        ) : error ? (
          <div className="text-destructive">Failed to load enrollments.</div>
        ) : (
          <RecentEnrollments enrollments={data} />
        )}
      </aside>
    </div>
  );
};

export default InstructorLayout;
