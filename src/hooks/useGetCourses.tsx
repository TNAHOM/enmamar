import { InstructorCourseAnalytics } from "@/types/instructor";
import { useFetchListData } from "./useFetchData";
import { course } from "@/types/courses";

export const useGetCourses = ({
  type,
  apiRoute,
}: { type?: string; apiRoute?: string } = {}) => {
  const url =
    type === "instructorCourse" && apiRoute
      ? apiRoute
      : type === "profile"
      ? "/api/course/enrolled"
      : "/api/course/getCourses";

  const { data, error, loading } = useFetchListData<InstructorCourseAnalytics>({
    url,
  });

  return { data, error, loading };
};

export const useGetTopicCourses = ({
  type,
  apiRoute,
}: { type?: string; apiRoute?: string } = {}) => {
  const url =
    type === "instructorCourse" && apiRoute
      ? apiRoute
      : type === "profile"
      ? "/api/course/enrolled"
      : "/api/course/getCourses";

  const { data, error, loading } = useFetchListData<course>({
    url,
  });

  return { data, error, loading };
};
