import { useFetchListData } from "./useFetchData";
import { course } from "@/types/courses";

export const useGetCourses = ({ type }: { type?: string } = {}) => {
  const url = type !== "profile" ? "/api/course/getCourses" : "/api/course/enrolled";
  const { data, error, loading } = useFetchListData<course>({ url });

  return { data, error, loading };
};
