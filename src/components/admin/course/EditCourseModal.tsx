"use client";

import { useState, useEffect, useRef } from "react";
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
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCourseSchema } from "@/lib/scheme/course-scheme";
import type { UpdateCourseSchemaType } from "@/lib/scheme/course-scheme";
import { course } from "@/types/courses";
import { toast } from "sonner";

interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
}

export function EditCourseModal({
  isOpen,
  onClose,
  courseId,
}: EditCourseModalProps) {
  // Ref to control file input value for clearing
  const thumbnailInputRef = useRef<HTMLInputElement | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [courseData, setCourseData] = useState<course | null>(null);
  const [loading, setLoading] = useState(false);
  const [instructorId, setInstructorId] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<UpdateCourseSchemaType>({
    resolver: zodResolver(updateCourseSchema),
  });

  // Fetch course data when modal opens
  useEffect(() => {
    if (isOpen && courseId) {
      fetchCourseData();
    }
  }, [isOpen, courseId]);

  const fetchCourseData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/course/${courseId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch course data");
      }
      const data: course = await response.json();
      setCourseData(data);

      // Pre-fill form fields
      setValue("title", data.title);
      setValue("price", data.price);
      setValue("description", data.description);
      setValue("discount", data.discount);
      setInstructorId(data.instructor.id);

      // Set thumbnail preview if exists
      if (data.thumbnail_url) {
        setThumbnailPreview(data.thumbnail_url);
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
      toast.error("Failed to load course data");
    } finally {
      setLoading(false);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: UpdateCourseSchemaType) => {
    try {
      // Step 1: Update the course
      const courseResponse = await fetch("/api/course/add", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          instructor_id: instructorId,
          ...data,
        }),
      });

      if (!courseResponse.ok) {
        const errorData = await courseResponse.json();
        throw new Error(errorData.detail || "Course update failed");
      }

      await courseResponse.json();

      // Step 2: Upload thumbnail if selected
      if (thumbnail) {
        const formData = new FormData();
        formData.append("thumbnail", thumbnail);

        const uploadResponse = await fetch(`/api/thumbnail/${courseId}`, {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          console.error("Thumbnail upload failed");
          toast.error("Course updated, but failed to upload thumbnail");
        } else {
          console.log("Thumbnail uploaded successfully");
        }
      }

      // Step 3: Reset form and close modal
      reset();
      setThumbnail(null);
      setThumbnailPreview("");
      toast.success("Course updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update course");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-600">
            Edit Course
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="p-4 text-center">Loading course data...</div>
        ) : (
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
                <Input
                  type="text"
                  id="instructor"
                  value={
                    courseData?.instructor?.first_name +
                      " " +
                      courseData?.instructor?.last_name || ""
                  }
                  disabled
                  className="bg-gray-100"
                />
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
              <div className="space-y-2">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  type="number"
                  id="discount"
                  placeholder="0"
                  min="0"
                  max="100"
                  step="1"
                  {...register("discount")}
                />
                {errors.discount && (
                  <p className="text-red-500 text-sm">
                    {errors.discount.message}
                  </p>
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
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-full h-48 object-cover rounded-lg"
                      width={400}
                      height={192}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setThumbnail(null);
                        setThumbnailPreview("");
                        // clear any previously selected file
                        if (thumbnailInputRef.current)
                          thumbnailInputRef.current.value = "";
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
                      accept="image/*"
                      ref={thumbnailInputRef}
                      onChange={handleThumbnailChange}
                      className="hidden"
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
                {isSubmitting ? "Updating..." : "Update Course"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
