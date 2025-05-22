export interface Comment {
  id?: string;
  content: string;
  user_id: string;
  course_id: string;
  created_at: string;
  updated_at: string | null;
}

export interface CourseReviewsProps {
  courseId: string;
}