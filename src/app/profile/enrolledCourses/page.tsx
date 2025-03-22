import TemplateTopic from "@/components/course/TemplateTopic";
import ProfileLayout from "@/components/profile/ProfileLayout";
// import { useGetCourses } from "@/hooks/useGetCourses";
// import React from "react";

const EnrolledCourses = () => {
  // const responseData = useGetCourses({ url: "/api/course/enrolled" });

  return (
    <ProfileLayout>
      <TemplateTopic header={{ topic: "Course Enrolled"}} from={'profile'} />
    </ProfileLayout>
  );
};

export default EnrolledCourses;
