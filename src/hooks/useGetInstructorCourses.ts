"use client";

import { useFetchData } from "./useFetchData";
import { useAuthStore } from "@/lib/store/auth-store";
import { InstructorCourse } from "@/utilities/instructor";
import { userProfile } from "@/types/user";
import { Video } from "@/types/courses";

// Types matching external API response
interface ApiInstructorCourseItem {
  view_count: number;
  no_of_enrollments: number;
  no_of_lessons: number;
  revenue: number;
  course: {
    id: string;
    title: string;
    description: string;
    tags: string | null;
    price: number;
    discount: number;
    thumbnail_url: string | null;
    instructor_id: string;
    created_at: string;
    updated_at: string | null;
    instructor: userProfile;
    lessons: Array<{
      id: string;
      title: string;
      description: string;
      duration: number;
      video_url: string | null;
      order: number;
      created_at: string;
      updated_at: string | null;
      video: Video;
    }>;
  };
}

interface ApiResponse {
  detail: string;
  data: ApiInstructorCourseItem[];
}

export const useGetInstructorCourses = () => {
  const { user } = useAuthStore();
  const instructorId = user?.id;
  const url = instructorId ? `/api/instructor/${instructorId}` : "";

  const { data, loading, error } = useFetchData<ApiResponse>({ url });

  const courses: InstructorCourse[] =
    data?.data.map((item) => {
      const c = item.course;
      return {
        id: c.id,
        title: c.title,
        description: c.description,
        rating: 0,
        price: c.price,
        tags: c.tags || "",
        thumbnail_url: c.thumbnail_url || "",
        instructor_id: c.instructor_id,
        created_at: c.created_at,
        updated_at: c.updated_at || "",
        instructor: c.instructor,
        lessons: c.lessons.map((lesson) => ({
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          duration: lesson.duration,
          video_url: lesson.video_url || "",
          video: lesson.video || { library_id: "", video_id: "", secret_key: "" },
        })),
        industry: "",
        views: item.view_count,
        totalLesson: item.no_of_lessons,
        revenue: item.revenue,
        enrollments: item.no_of_enrollments,
      };
    }) || [];

  return { courses, loading, error };
};