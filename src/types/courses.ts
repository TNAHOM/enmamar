export interface course {
    id: string;
    title: string;
    instructor: string;
    description: string;
    rating: number;
    price: string;
    image: string;
}

export interface Lesson {
    id: string;
    title: string;
    description: string;
    videoFile?: File | null; // Optional for the being
    video_url: string;
    duration: number;
}