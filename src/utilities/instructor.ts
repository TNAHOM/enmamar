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

export const mockInstructorCourses: InstructorCourse[] = [
  {
    id: "1",
    title: "Advanced Web Development",
    description: "Learn modern web development techniques",
    rating: 4.8,
    price: "99.99",
    tags: "web,react,javascript",
    thumbnail_url: "/course-thumbnails/web-dev.jpg",
    instructor_id: "inst1",
    created_at: "2024-01-01",
    updated_at: "2024-03-15",
    instructor: {
      id: "inst1",
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      role: "instructor",
      username: "johndoe",
      phone_number: "1234567890",
      created_at: "2024-01-01",
      updated_at: "2024-03-15",
      profile_picture: "/avatars/john.jpg"
    },
    industry: "Software Development",
    lessons: [
      {
        id: "l1",
        title: "Introduction to React",
        description: "Learn the fundamentals of React and component-based architecture",
        duration: 90,
        video_url: "https://example.com/video1",
        video: {
          library_id: "lib1",
          video_id: "vid1",
          secret_key: "key1"
        }
      },
      {
        id: "l2",
        title: "State Management",
        description: "Master React state management with hooks and context",
        duration: 120,
        video_url: "https://example.com/video2",
        video: {
          library_id: "lib1",
          video_id: "vid2",
          secret_key: "key2"
        }
      },
    ],
    views: 1500,
    revenue: 2500,
    enrollments: 50,
    totalLesson: 2
  },
  {
    id: "2",
    title: "UI/UX Design Fundamentals",
    description: "Master the basics of UI/UX design",
    rating: 4.6,
    price: "79.99",
    tags: "design,ux,ui",
    thumbnail_url: "/course-thumbnails/ui-ux.jpg",
    instructor_id: "inst1",
    created_at: "2024-02-01",
    updated_at: "2024-03-15",
    instructor: {
      id: "inst1",
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      role: "instructor",
      username: "johndoe",
      phone_number: "1234567890",
      created_at: "2024-01-01",
      updated_at: "2024-03-15",
      profile_picture: "/avatars/john.jpg"
    },
    industry: "Design",
    lessons: [
      {
        id: "l3",
        title: "Design Principles",
        description: "Understanding core design principles and their application",
        duration: 105,
        video_url: "https://example.com/video3",
        video: {
          library_id: "lib1",
          video_id: "vid3",
          secret_key: "key3"
        }
      },
      {
        id: "l4",
        title: "User Research",
        description: "Learn effective user research methods and techniques",
        duration: 135,
        video_url: "https://example.com/video4",
        video: {
          library_id: "lib1",
          video_id: "vid4",
          secret_key: "key4"
        }
      },
    ],
    views: 1200,
    revenue: 1800,
    enrollments: 35,
    totalLesson: 2
  },
];

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
