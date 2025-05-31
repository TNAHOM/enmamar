import { z } from "zod";

export const courseSchema = z.object({
  instructor: z.string().nonempty("Instructor is required"),
  title: z.string().nonempty("Title is required"),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Price must be a positive number")
  ),
  thumbnail: z.instanceof(File).refine((file) => file.size > 0, {
    message: "Thumbnail is required",
  }),
  description: z.string().nonempty("Description is required"),
  lessons: z.array(
    z.object({
      // id: z.string().nonempty("Lesson ID is required"),
      title: z.string().nonempty("Lesson title is required"),
      description: z.string().nonempty("Lesson description is required"),
      duration: z.preprocess(
        (val) => Number(val),
        z.number().min(0, "Duration must be a positive number")
      ),
      video: z
        .object({
          library_id: z.string().nonempty("Library ID is required"),
          video_id: z.string().nonempty("Video ID is required"),
          secret_key: z.string().nonempty("Secret key is required"),
        })
        .optional(),
    })
  ),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;

export const lessonSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.number().min(0, "Duration must be a positive number"),
});

export type LessonSchemaType = z.infer<typeof lessonSchema>;

export const updateCourseSchema = z.object({
  title: z.string().optional(),
  price: z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : Number(val)),
    z.number().min(0, "Price must be a positive number").optional()
  ),
  discount: z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : Number(val)),
    z.number().min(0, "Discount must be a positive number").optional()
  ),
  thumbnail: z.instanceof(File).optional(),
  description: z.string().optional(),
  lessons: z
    .array(
      z.object({
        id: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        duration: z.preprocess(
          (val) => (val === "" || val === undefined ? undefined : Number(val)),
          z.number().min(0, "Duration must be a positive number").optional()
        ),
        video: z
          .object({
            library_id: z.string().optional(),
            video_id: z.string().optional(),
            secret_key: z.string().optional(),
          })
          .optional(),
      })
    )
    .optional(),
});

export type UpdateCourseSchemaType = z.infer<typeof updateCourseSchema>;
