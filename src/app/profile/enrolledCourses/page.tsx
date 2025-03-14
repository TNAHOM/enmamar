import TemplateTopic from "@/components/course/TemplateTopic";
import ProfileLayout from "@/components/profile/ProfileLayout";
import React from "react";

const enrolledCourses = () => {
  return (
    <ProfileLayout>
      <TemplateTopic topic={"Course Enrolled"} />
    </ProfileLayout>
  );
};

export default enrolledCourses;
