export interface Instructor {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: string;
  is_active: boolean;
  profile_picture: string | null;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  video_url: string | null;
  order: number;
  created_at: string;
  updated_at: string | null;
  video: string | null;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  tags: string[] | null;
  price: number;
  discount: number;
  thumbnail_url: string | null;
  instructor_id: string;
  created_at: string;
  updated_at: string | null;
  instructor: Instructor;
  lessons: Lesson[];
  view_count: number;
  no_of_enrollments: number;
  no_of_lessons: number;
  revenue: number;
}

export interface InstructorCourseAnalytics extends Record<string, unknown> {
  view_count: number;
  no_of_enrollments: number;
  no_of_lessons: number;
  revenue: number;
  course: Course;
}

export interface InstructorCoursesResponse {
  detail: string;
  data: InstructorCourseAnalytics[];
}
