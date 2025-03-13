import { useFetchListData } from "./useFetchData";
import { course } from "@/types/courses";

export const useGetCourses = () => {
  const { data, error, loading } = useFetchListData<course>({
    url: "/api/course/getCourses",
  });

  return { data, error, loading };
};
