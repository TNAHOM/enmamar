import { create } from "zustand";
import { useAuthStore } from "./auth-store";

// Update interface to include enrollment state
interface LessonVideo {
  activeLesson: string;
  isVideoPlaying: boolean;
  videoUrl: string | null;
  isLoading: boolean;
  error: string | null;
  isEnrolled: boolean;
  enrollLoading: boolean;
  enrollError: string | null;
  setActiveLesson: (lesson_id: string, course_id: string) => void;
  fetchLessonVideo: (lesson_id: string, id: string) => Promise<void>;
  resetVideoState(): void;
  fetchEnrollStatus: (course_id: string) => Promise<void>;
}

export const useLessonVideoStore = create<LessonVideo>((set, get) => ({
  activeLesson: "",
  videoUrl: null,
  isVideoPlaying: false,
  isLoading: false,
  error: null,
  isEnrolled: false,
  enrollLoading: false,
  enrollError: null,

  setActiveLesson: (lesson_id: string, course_id: string) => {
    set({ activeLesson: lesson_id });
    get().fetchLessonVideo(lesson_id, course_id);
  },

  fetchLessonVideo: async (lesson_id: string, id: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch(`/api/course/${id}/lesson/${lesson_id}`);
      const responseData = await response.json();
      if (!response.ok) {
        set({
          error: responseData.error,
          isLoading: false,
          isVideoPlaying: false,
        });
        return;
      }

      set({
        videoUrl: responseData.video_url,
        isLoading: false,
        isVideoPlaying: true,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Unknown error",
        isLoading: false,
      });
    }
  },

  // enrollment status state and action
  fetchEnrollStatus: async (course_id: string) => {
    set({ enrollLoading: true, enrollError: null });
    const { user } = useAuthStore.getState();
    
    if (user?.role == "admin") {
      return set({ isEnrolled: true, enrollLoading: false });
    }
    try {
      const response = await fetch(`/api/course/${course_id}/enroll`);
      const responseData = await response.json();

      if (responseData.status === 401) {
        set({
          enrollError: "Please sign up to enroll in the course.",
          enrollLoading: false,
        });
        return;
      }
      if (!response.ok) {
        set({
          enrollError: responseData.detail || "Failed to fetch enroll status",
          enrollLoading: false,
        });
        return;
      }
      set({ isEnrolled: responseData.data, enrollLoading: false });
    } catch (error) {
      set({
        enrollError: error instanceof Error ? error.message : "Unknown error",
        enrollLoading: false,
      });
    }
  },

  resetVideoState: () =>
    set({
      activeLesson: "",
      videoUrl: null,
      isLoading: false,
      error: null,
      isVideoPlaying: false,
    }),
}));
