import { useFetchData } from "./useFetchData";
import { course } from "@/types/courses";

export const useGetCourses = () => {
  const { data, error, loading } = useFetchData<course>({
    url: "/api/course/getCourse",
  });
  //   make the slice dynamic

  return { data, error, loading };
};
