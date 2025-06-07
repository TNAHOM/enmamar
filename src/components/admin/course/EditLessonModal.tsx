"use client";

import type React from "react";
import { useEffect } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { lessonSchema, LessonSchemaType } from "@/lib/scheme/course-scheme";
import { Lesson } from "@/types/courses";
import { toast } from "sonner";

interface EditLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  lessonId: string;
  lessonData: Lesson | null;
}

export function EditLessonModal({
  isOpen,
  onClose,
  courseId,
  lessonId,
  lessonData,
}: EditLessonModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<LessonSchemaType>({
    resolver: zodResolver(lessonSchema),
  });

  // Pre-fill form fields when lesson data is available
  useEffect(() => {
    if (isOpen && lessonData) {
      setValue("title", lessonData.title);
      setValue("description", lessonData.description);
      setValue("duration", lessonData.duration);
    }
  }, [isOpen, lessonData, setValue]);

  const onSubmit = async (data: LessonSchemaType) => {

    try {
      const id = courseId;
      const response = await fetch(`/api/course/${id}/lesson/${lessonId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Lesson update failed");
      }

      reset();
      toast.success("Lesson updated successfully");
      window.location.reload();
      onClose();
    } catch (error) {
      console.error("Error updating lesson:", error);
      toast.error("Failed to update lesson");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-600">
            Edit Lesson
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Lesson Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Lesson Title</Label>
            <Input
              type="text"
              id="title"
              placeholder="Enter lesson title"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Lesson Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              type="number"
              id="duration"
              placeholder="Enter lesson duration"
              min="0"
              step="1"
              {...register("duration", { valueAsNumber: true })}
            />
            {errors.duration && (
              <p className="text-red-500 text-sm">{errors.duration.message}</p>
            )}
          </div>

          {/* Lesson Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Lesson Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Enter a detailed description of the lesson"
              className="h-32"
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
              {isSubmitting ? "Updating..." : "Update Lesson"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
