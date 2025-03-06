import { z } from "zod";

export const courseSchema = z.object({
  instructor: z.string().nonempty("Instructor is required"),
  title: z.string().nonempty("Title is required"),
  price: z
    .preprocess(val => Number(val), z.number().min(0, "Price must be a positive number")),
  thumbnail: z.any().optional(),
  description: z.string().nonempty("Description is required"),
  lessons: z.array(
    z.object({
      title: z.string().nonempty("Lesson title is required"),
      description: z.string().nonempty("Lesson description is required"),
      videoFile: z.any().optional(),
      duration: z.preprocess(val => Number(val), z.number().min(0, "Duration must be a positive number")),
      video_url: z.string().nonempty("Video URL is required"),
    })
  ),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
