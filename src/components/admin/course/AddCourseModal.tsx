"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseSchema } from "@/lib/scheme/course-scheme";
import type { CourseSchemaType } from "@/lib/scheme/course-scheme";
import { Lesson, Video } from "@/types/courses";
import Link from "next/link";
import { useInstructors } from "@/hooks/useInstructors";

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCourseModal({ isOpen, onClose }: AddCourseModalProps) {
  const [, setThumbnail] = useState<File | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const { instructors, error, clearError } = useInstructors();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
  });

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addLesson = () => {
    setLessons([
      ...lessons,
      {
        id: `lesson-${lessons.length + 1}`,
        title: "",
        description: "",
        duration: 0,
        video: {
          library_id: "",
          video_id: "",
          secret_key: "",
        },
      },
    ]);
  };

  const removeLesson = (lessonId: string) => {
    setLessons(lessons.filter((lesson) => lesson.id !== lessonId));
  };

  const handleLessonChange = (
    lessonId: string,
    field: keyof Lesson | keyof Video,
    value: string | File | null | number
  ) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.id === lessonId
          ? {
              ...lesson,
              ...(field in lesson ? { [field]: value } : {}),
              video: {
                ...lesson.video,
                ...(field in lesson.video ? { [field]: value } : {}),
              },
            }
          : lesson
      )
    );
  };

  const onSubmit = async (data: CourseSchemaType) => {
    console.log("Submitting form data:", data);
    console.log("Lessons:", lessons);

    const lessonsWithOrder = lessons.map((lesson, index) => ({
      ...lesson,
      order: index + 1,
    }));

    try {
      const response = await fetch(`/api/course/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          instructor_id: data.instructor,
          lessons: lessonsWithOrder,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Course creation failed");
      }

      const result = await response.json();
      console.log("Course created successfully:", result);
      reset();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  console.log(errors, "errors from Add course modal");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-600">
            Add New Course
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 mb-2">{error}</p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  clearError();
                  onClose();
                }}
              >
                Close
              </Button>
              <Link href="/">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Only show form if there's no error */}
        {!error && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Course Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Enter course title"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Controller
                  name="instructor"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select instructor" />
                      </SelectTrigger>
                      <SelectContent>
                        {instructors.map((instructor) => (
                          <SelectItem key={instructor.id} value={instructor.id}>
                            {instructor.first_name +
                              " " +
                              instructor.last_name +
                              " " +
                              instructor.email}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.instructor && (
                  <p className="text-red-500 text-sm">
                    {errors.instructor.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (Birr)</Label>
                <Input
                  type="number"
                  id="price"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  {...register("price")}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>
            </div>

            {/* Thumbnail Upload */}
            <div className="space-y-2">
              <Label>Course Thumbnail</Label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
                {thumbnailPreview ? (
                  <div className="relative">
                    <Image
                      src={thumbnailPreview || "/placeholder.svg"}
                      alt="Thumbnail preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setThumbnail(null);
                        setThumbnailPreview("");
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-48 cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
                      Click to upload thumbnail
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Course Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Course Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Enter a detailed description of the course"
                className="h-24"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Lessons */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Lessons</Label>
                <Button type="button" onClick={addLesson} variant="outline">
                  Add Lesson
                </Button>
              </div>
              {lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="space-y-4 p-4 border rounded-lg relative"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeLesson(lesson.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  {/* <div className="space-y-2">
                    <Label htmlFor={`lesson-id-${lesson.id}`}>Lesson ID</Label>
                    <Input
                      id={`lesson-id-${lesson.id}`}
                      {...register(`lessons.${index}.id` as const)}
                      value={lesson.id}
                      onChange={(e) =>
                        handleLessonChange(lesson.id, "id", e.target.value)
                      }
                      placeholder="Enter lesson ID"
                    />
                    {errors.lessons && errors.lessons[index]?.id && (
                      <p className="text-red-500 text-sm">
                        {errors.lessons[index]?.id?.message}
                      </p>
                    )}
                  </div> */}
                  <div className="space-y-2">
                    <Label htmlFor={`lesson-title-${lesson.id}`}>
                      Lesson {index + 1} Title
                    </Label>
                    <Input
                      id={`lesson-title-${lesson.id}`}
                      {...register(`lessons.${index}.title` as const)}
                      value={lesson.title}
                      onChange={(e) =>
                        handleLessonChange(lesson.id, "title", e.target.value)
                      }
                      placeholder="Enter lesson title"
                    />
                    {errors.lessons && errors.lessons[index]?.title && (
                      <p className="text-red-500 text-sm">
                        {errors.lessons[index]?.title?.message}
                      </p>
                    )}
                  </div>
                  <div className="">
                    <Label>Lesson Duration</Label>
                    <Input
                      type="number"
                      min="0"
                      step="1"
                      {...register(`lessons.${index}.duration` as const)}
                      onChange={(e) =>
                        handleLessonChange(
                          lesson.id,
                          "duration",
                          parseInt(e.target.value)
                        )
                      }
                      value={String(lesson.duration)}
                      placeholder="Enter lesson duration in minutes"
                    />
                    {errors.lessons && errors.lessons[index]?.duration && (
                      <p className="text-red-500 text-sm">
                        {errors.lessons[index]?.duration?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`lesson-description-${lesson.id}`}>
                      Lesson Description
                    </Label>
                    <Textarea
                      id={`lesson-description-${lesson.id}`}
                      {...register(`lessons.${index}.description` as const)}
                      value={lesson.description}
                      onChange={(e) =>
                        handleLessonChange(
                          lesson.id,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Enter lesson description"
                    />
                    {errors.lessons && errors.lessons[index]?.description && (
                      <p className="text-red-500 text-sm">
                        {errors.lessons[index]?.description?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Library Id</Label>
                    <Input
                      type="text"
                      {...register(
                        `lessons.${index}.video.library_id` as const
                      )}
                      value={lesson.video.library_id}
                      onChange={(e) =>
                        handleLessonChange(
                          lesson.id,
                          "library_id",
                          e.target.value
                        )
                      }
                      placeholder="Enter library id"
                    />
                    {errors.lessons &&
                      errors.lessons[index]?.video?.library_id && (
                        <p className="text-red-500 text-sm">
                          {errors.lessons[index]?.video?.library_id?.message}
                        </p>
                      )}
                  </div>

                  <div className="space-y-2">
                    <Label>Video Id</Label>
                    <Input
                      type="text"
                      {...register(`lessons.${index}.video.video_id` as const)}
                      value={lesson.video.video_id}
                      onChange={(e) =>
                        handleLessonChange(
                          lesson.id,
                          "video_id",
                          e.target.value
                        )
                      }
                      placeholder="Enter Video id"
                    />
                    {errors.lessons &&
                      errors.lessons[index]?.video?.video_id && (
                        <p className="text-red-500 text-sm">
                          {errors.lessons[index]?.video?.video_id?.message}
                        </p>
                      )}
                  </div>

                  <div className="space-y-2">
                    <Label>Secret Key</Label>
                    <Input
                      type="text"
                      {...register(
                        `lessons.${index}.video.secret_key` as const
                      )}
                      value={lesson.video.secret_key}
                      onChange={(e) =>
                        handleLessonChange(
                          lesson.id,
                          "secret_key",
                          e.target.value
                        )
                      }
                      placeholder="Enter Secret Key"
                    />
                    {errors.lessons &&
                      errors.lessons[index]?.video?.secret_key && (
                        <p className="text-red-500 text-sm">
                          {errors.lessons[index]?.video?.secret_key?.message}
                        </p>
                      )}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Course"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
