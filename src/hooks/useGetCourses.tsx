import { useFetchListData } from "./useFetchData";
import { course } from "@/types/courses";

export const useGetCourses = ({ url }: { url: string }) => {
  const { data, error, loading } = useFetchListData<course>({ url });
  return { data, error, loading };
};
