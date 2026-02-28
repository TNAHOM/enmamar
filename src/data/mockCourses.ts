import { course } from "@/types/courses";
import { Comment } from "@/types/comment";

const mockInstructor = {
  id: "inst-1",
  first_name: "Abebe",
  last_name: "Kebede",
  phone_number: "+251911000000",
  role: "instructor",
  created_at: "2024-01-15T00:00:00Z",
  updated_at: "2024-01-15T00:00:00Z",
  profile_picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=instructor",
};

const baseLessons = [
  { id: "l1", title: "Introduction & Setup", description: "Get your environment ready.", duration: 12, video_url: null, video: { library_id: "lib1", video_id: "v1", secret_key: "sk1" } },
  { id: "l2", title: "Core Concepts", description: "Understanding the fundamentals.", duration: 18, video_url: null, video: { library_id: "lib1", video_id: "v2", secret_key: "sk2" } },
  { id: "l3", title: "Hands-on Project", description: "Build your first project.", duration: 25, video_url: null, video: { library_id: "lib1", video_id: "v3", secret_key: "sk3" } },
  { id: "l4", title: "Advanced Topics", description: "Take your skills further.", duration: 20, video_url: null, video: { library_id: "lib1", video_id: "v4", secret_key: "sk4" } },
  { id: "l5", title: "Best Practices & Review", description: "Wrap-up and next steps.", duration: 15, video_url: null, video: { library_id: "lib1", video_id: "v5", secret_key: "sk5" } },
];

const courseTitles = [
  "Full-Stack Web Development with React & Node",
  "Data Science and Machine Learning Fundamentals",
  "Mobile App Development with React Native",
  "Cloud Architecture & AWS Essentials",
  "UI/UX Design: From Figma to Production",
  "Python for Automation & Scripting",
  "Digital Marketing & Growth Strategies",
  "Ethical Hacking & Cybersecurity Basics",
];

const thumbnails = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
  "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",

  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
];

const shortDescriptions = [
  "Build modern web applications from front to back with React and Node.js.",
  "Learn data analysis, visualization, and introductory machine learning with Python.",
  "Create cross-platform mobile apps with React Native and Expo.",
  "Design and deploy scalable systems on Amazon Web Services.",
  "Turn designs into polished interfaces and design systems.",
  "Automate tasks and build scripts with Python.",
  "Grow your audience and measure success with data-driven marketing.",
  "Understand security fundamentals and defensive techniques.",
];

/** 8 courses for the home page list */
export const mockCoursesList: course[] = courseTitles.map((title, i) => ({
  id: String(i + 1),
  title,
  description: shortDescriptions[i],
  rating: 4.2 + (i % 5) * 0.1,
  price: [0, 299, 449, 199, 349, 249, 399, 279][i],
  tags: "Programming,Development",
  thumbnail_url: thumbnails[i],
  instructor_id: mockInstructor.id,
  created_at: "2024-06-01T00:00:00Z",
  updated_at: "2025-01-15T00:00:00Z",
  discount: i % 3 === 0 ? 15 : 0,
  instructor: mockInstructor,
  lessons: baseLessons,
  industry: "Technology",
  views: 1200 + i * 300,
  totalLesson: 5,
}));

/** Full course detail for portfolio (used for course/[id] when id is 1–8) */
function buildMockCourseDetail(id: string): course {
  const idx = Math.max(0, parseInt(id, 10) - 1) || 0;
  const c = mockCoursesList[idx];
  return {
    ...c,
    id,
    title: c.title,
    description: c.description + " This course includes hands-on projects, quizzes, and a certificate of completion. Join thousands of students who have already transformed their careers.",
    rating: 4.7,
    lessons: baseLessons,
    thumbnail_url: c.thumbnail_url,
  };
}

export function getMockCourseDetail(id: string): course | undefined {
  const n = parseInt(id, 10);
  if (n >= 1 && n <= 8) return buildMockCourseDetail(id);
  return undefined;
}

/** Mock comments for course detail page (portfolio) */
const mockCommentUsers = [
  { id: "u1", first_name: "Sara", last_name: "Mohammed", phone_number: "", role: "user", created_at: "", updated_at: "", profile_picture: undefined },
  { id: "u2", first_name: "Dawit", last_name: "Tesfaye", phone_number: "", role: "user", created_at: "", updated_at: "", profile_picture: undefined },
  { id: "u3", first_name: "Helen", last_name: "Abebe", phone_number: "", role: "user", created_at: "", updated_at: "", profile_picture: undefined },
  { id: "u4", first_name: "Yonas", last_name: "Girma", phone_number: "", role: "user", created_at: "", updated_at: "", profile_picture: undefined },
];

const mockCommentContents = [
  "Clear explanations and great project examples. Exactly what I needed to switch careers.",
  "The instructor explains complex topics in a way that's easy to follow. Highly recommend.",
  "Finished the course in 3 weeks. The hands-on projects really solidified my understanding.",
  "Best investment I've made in my learning. Certificate looks great on my profile.",
];

export function getMockComments(courseId: string): Comment[] {
  return mockCommentContents.map((content, i) => ({
    id: `comment-${courseId}-${i}`,
    content,
    user_id: mockCommentUsers[i].id,
    course_id: courseId,
    created_at: new Date(Date.now() - (4 - i) * 86400000 * 7).toISOString(),
    updated_at: null,
    user: mockCommentUsers[i],
  }));
}
