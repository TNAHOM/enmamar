import { course } from "@/types/courses";
import { Course } from "@/types/instructor";
import { userProfile } from "@/types/user";

export interface InstructorCourse extends course {
  revenue: number;
  enrollments: number;
}

export interface MonthlyStats {
  month: string;
  enrollments: number;
  revenue: number;
}

export interface RecentEnrollment {
  user: userProfile;
  course: Course;
  enrolled_at: Date;
}


export const mockMonthlyStats: MonthlyStats[] = [
  { month: "Jan", enrollments: 15, revenue: 750 },
  { month: "Feb", enrollments: 20, revenue: 1000 },
  { month: "Mar", enrollments: 25, revenue: 1250 },
  { month: "Apr", enrollments: 30, revenue: 1500 },
  { month: "May", enrollments: 35, revenue: 1750 },
  { month: "Jun", enrollments: 40, revenue: 2000 },
  { month: "Jul", enrollments: 45, revenue: 2250 },
  { month: "Aug", enrollments: 50, revenue: 2500 },
  { month: "Sep", enrollments: 45, revenue: 2250 },
  { month: "Oct", enrollments: 40, revenue: 2000 },
  { month: "Nov", enrollments: 35, revenue: 1750 },
  { month: "Dec", enrollments: 30, revenue: 1500 },
];