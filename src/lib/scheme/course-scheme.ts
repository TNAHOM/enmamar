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
      // id: z.string().nonempty("Lesson ID is required"),
      title: z.string().nonempty("Lesson title is required"),
      description: z.string().nonempty("Lesson description is required"),
      duration: z.preprocess(val => Number(val), z.number().min(0, "Duration must be a positive number")),
      video: z.object({
        library_id: z.string().nonempty("Library ID is required"),
        video_id: z.string().nonempty("Video ID is required"),
        secret_key: z.string().nonempty("Secret key is required"),
      }).optional(),
    })
  ),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
