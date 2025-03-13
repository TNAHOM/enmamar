import { userProfile } from "./user";

export interface course {
    id: string;
    title: string;
    description: string;
    rating: number;
    price: string;
    tags: string;
    thumbnail_url: string;
    instructor_id: string;
    created_at: string;
    updated_at: string;
    instructor: userProfile;
    lessons: Lesson[];
    industry: string;
    views: number;
    totalLesson: number;
}

export interface Lesson {
    id: string;
    title: string;
    description: string;
    duration: number;
    video_url: string;
    video: Video;
}

export interface Video {
    library_id: string;
    video_id: string;
    secret_key: string;
}