import SalesReport from "@/components/admin/SalesReport";
import { StatCard } from "@/components/admin/StatCard";
import { AdminLayout } from "@/components/admin/AdminLayout";

export default function AdminDashboard() {

  return (
    <AdminLayout>
        <div className="space-y-8 w-full">
          <div>
            <h1 className="text-xl font-medium">
              Hey Admin name -{" "}
              <span className="text-gray-500 font-normal">
                {"here's what's happening with your store today"}
              </span>
            </h1>
          </div>

          <div className="grid grid-cols-4 gap-6">
            <StatCard
              title="TOTAL USER"
              value="12,426"
              change="+36%"
              positive={true}
            />
            <StatCard
              title="TOTAL COURSES"
              value="426"
              change="+48%"
              positive={true}
            />
            <StatCard
              title="TOTAL INSTRUCTORS"
              value="2,426"
              change="+23%"
              positive={true}
            />
            <StatCard
              title="RECENT ENROLLMENTS"
              value="20"
              change="+36%"
              positive={true}
            />
          </div>
          <SalesReport />
        
        </div>
    </AdminLayout>
  );
}
