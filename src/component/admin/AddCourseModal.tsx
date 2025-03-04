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

// Mock data for instructors
const MOCK_INSTRUCTORS = [
  { id: "1", name: "Tishun Alebe" },
  { id: "2", name: "Terhun Abera" },
  { id: "3", name: "Natnael Melaku" },
  { id: "4", name: "Kidist Haile" },
];

interface Lesson {
  id: string;
  title: string;
  description: string;
  videoFile: File | null;
}

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCourseModal({ isOpen, onClose }: AddCourseModalProps) {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");

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
    const newLesson: Lesson = {
      id: `lesson-${lessons.length + 1}`,
      title: "",
      description: "",
      videoFile: null,
    };
    setLessons([...lessons, newLesson]);
  };

  const removeLesson = (lessonId: string) => {
    setLessons(lessons.filter((lesson) => lesson.id !== lessonId));
  };

  const handleLessonChange = (
    lessonId: string,
    field: keyof Lesson,
    value: string | File | null
  ) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-600">
            Add New Course
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Course Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select instructor" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_INSTRUCTORS.map((instructor) => (
                    <SelectItem key={instructor.id} value={instructor.id}>
                      {instructor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (Birr)</Label>
              <Input
                type="number"
                id="price"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <Label>Course Thumbnail</Label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
              {thumbnailPreview ? (
                <div className="relative">
                  <img
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
              placeholder="Enter a detailed description of the course"
              className="h-24"
            />
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
                    value={lesson.title}
                    onChange={(e) =>
                      handleLessonChange(lesson.id, "title", e.target.value)
                    }
                    placeholder="Enter lesson title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`lesson-description-${lesson.id}`}>
                    Lesson Description
                  </Label>
                  <Textarea
                    id={`lesson-description-${lesson.id}`}
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
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Create Course
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
