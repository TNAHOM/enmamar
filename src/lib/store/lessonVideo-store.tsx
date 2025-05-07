import { create } from "zustand";

interface LessonVideo {
  activeLesson: string;
  isVideoPlaying: boolean;
  videoUrl: string | null;
  isLoading: boolean;
  error: string | null;
  setActiveLesson: (lesson_id: string, course_id: string) => void;
  fetchLessonVideo: (lesson_id: string, id: string) => Promise<void>;
  resetVideoState(): void;
}

export const useLessonVideoStore = create<LessonVideo>((set, get) => ({
  activeLesson: "",
  videoUrl: null,
  isVideoPlaying: false,
  isLoading: false,
  error: null,

  setActiveLesson: (lesson_id: string, course_id: string) => {
    set({ activeLesson: lesson_id });
    get().fetchLessonVideo(lesson_id, course_id);
  },

  fetchLessonVideo: async (lesson_id: string, id: string) => {
    set({ isLoading: true, error: null });
    console.log("fetching lesson video", lesson_id);
    try {
      const response = await fetch(`/api/course/${id}/lesson/${lesson_id}`);
      const responseData = await response.json();
      console.log(response.ok, "response from lesson video");
      //   console.log(response, "responseData from lesson video");
      if (!response.ok) {
        // console.log("Failed to fetch lesson video");
        // throw new Error("Failed to fetch lesson video")0;
        set({
          error: responseData.detail,
          isLoading: false,
          isVideoPlaying: false,
        });
        return;
      }
      console.log(responseData, "responseData from lesson video");
      set({
        videoUrl: responseData.video_url,
        isLoading: false,
        isVideoPlaying: true,
      });
      console.log(responseData, "responseData from lesson video");
    } catch (error) {
      console.log(error, "error from lesson video");
      set({
        error: error instanceof Error ? error.message : "Unknown error",
        isLoading: false,
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
