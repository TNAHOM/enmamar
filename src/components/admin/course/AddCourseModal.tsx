"use client";

import type React from "react";

import { useEffect, useState } from "react";
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
import { Lesson } from "@/types/courses";
import { userProfile } from "@/types/user";
import Link from "next/link";

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCourseModal({ isOpen, onClose }: AddCourseModalProps) {
  const [, setThumbnail] = useState<File | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [instructors, setInstructors] = useState<userProfile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
  });

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await fetch("/api/instructors");
        if (!response.ok) {
          const errorMsg = "Failed to fetch instructors";
          setError(errorMsg);
          return;
        }
        const data = await response.json();
        setInstructors(data);
      } catch (error) {
        const errorMsg =
          (error as Error).message || "Failed to fetch instructors";
        setError(errorMsg);
      }
    };
    fetchInstructors();
  }, []);

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
        video_url: "hello.com",
        duration: 0,
      },
    ]);
  };

  const removeLesson = (lessonId: string) => {
    setLessons(lessons.filter((lesson) => lesson.id !== lessonId));
  };

  const handleLessonChange = (
    lessonId: string,
    field: keyof Lesson,
    value: string | File | null | number
  ) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.id === lessonId
          ? {
              ...lesson,
              duration:
                field === "duration"
                  ? parseInt(value as string)
                  : lesson.duration,
              [field]: value,
            }
          : lesson
      )
    );
  };

  const onSubmit = async (data: CourseSchemaType) => {
    console.log("Submitting form data:", data);
    console.log("Lessons:", lessons);
    try {
      const response = await fetch(`/api/course/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, instructor_id: data.instructor }),
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

  // console.log(error);
  // if (error) {
  //   return <ErrorTemplate />;
  // }

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
                  setError(null);
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
                  {/* for video_url input text field */}
                  <div className="space-y-2">
                    <Label htmlFor={`lesson-video_url-${lesson.id}`}>
                      Lesson Video URL
                    </Label>
                    <Input
                      id={`lesson-video_url-${lesson.id}`}
                      {...register(`lessons.${index}.video_url` as const)}
                      value={lesson.video_url}
                      onChange={(e) =>
                        handleLessonChange(
                          lesson.id,
                          "video_url",
                          e.target.value
                        )
                      }
                      placeholder="Enter lesson video url"
                    />
                    {errors.lessons && errors.lessons[index]?.video_url && (
                      <p className="text-red-500 text-sm">
                        {errors.lessons[index]?.video_url?.message}
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
                    <Label>Lesson Video</Label>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
                      <label className="flex flex-col items-center justify-center h-24 cursor-pointer">
                        <Upload className="h-6 w-6 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">
                          {lesson.videoFile
                            ? lesson.videoFile.name
                            : "Click to upload video"}
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          accept="video/*"
                          onChange={(e) =>
                            handleLessonChange(
                              lesson.id,
                              "videoFile",
                              e.target.files?.[0] || null
                            )
                          }
                        />
                      </label>
                    </div>
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
