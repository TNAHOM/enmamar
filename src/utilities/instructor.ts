import { course } from "@/types/courses";

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
  id: string;
  studentName: string;
  courseName: string;
  date: string;
  avatarUrl?: string;
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

export const mockRecentEnrollments: RecentEnrollment[] = [
  {
    id: "e1",
    studentName: "John Doe",
    courseName: "Advanced Web Development",
    date: "2025-03-14",
  },
  {
    id: "e2",
    studentName: "Jane Smith",
    courseName: "UI/UX Design Fundamentals",
    date: "2025-03-13",
  },
  {
    id: "e3",
    studentName: "Mike Johnson",
    courseName: "Advanced Web Development",
    date: "2025-03-12",
  },
];
