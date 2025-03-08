import { userProfile } from "./user";

export interface course {
    id: string;
    title: string;
    description: string;
    rating: number;
    price: string;
    image: string;
    instructor_id: string;
    created_at: string;
    updated_at: string;
    instructor: userProfile
    // lessons: Lesson[];
}

export interface Lesson {
    id: string;
    title: string;
    description: string;
    videoFile?: File | null; // Optional for the being
    video_url: string;
    duration: number;
}