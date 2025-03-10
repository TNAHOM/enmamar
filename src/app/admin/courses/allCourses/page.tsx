import React from "react";
import AllCoursesList from "@/components/admin/course/AllCourseList";
import { AdminLayout } from "@/components/admin/AdminLayout";

const AllCourses = () => {
  return (
    <AdminLayout>
      <AllCoursesList />
    </AdminLayout>
  );
};

export default AllCourses;
