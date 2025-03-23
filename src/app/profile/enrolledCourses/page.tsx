import TemplateTopic from "@/components/course/TemplateTopic";
import ProfileLayout from "@/components/profile/ProfileLayout";

const EnrolledCourses = () => {

  return (
    <ProfileLayout>
      <TemplateTopic header={{ topic: "Course Enrolled"}} from={'profile'} />
    </ProfileLayout>
  );
};

export default EnrolledCourses;
