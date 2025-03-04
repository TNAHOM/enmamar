import SalesReport from "@/component/admin/SalesReport";
import { StatCard } from "@/component/admin/StatCard";
import Sidebar from "@/component/admin/Sidebar";
import RecentCustomers from "@/component/admin/RecentCustomers";

export default function AdminDashboard() {

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="grid grid-cols-10 gap-10">
        <Sidebar />

        <main className="col-span-6 p-6">
          <div className="space-y-8">
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

            {/* Sales Report */}

            <SalesReport />
            {/* </div> */}
          </div>
        </main>

        <div className="p-6 col-span-2">
          <RecentCustomers />
        </div>
      </div>
    </div>
  );
}
