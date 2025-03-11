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
import { Lesson } from "@/types/courses";
import { Textarea } from "@/components/ui/textarea";

interface EditLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson;
}

export function EditLessonModal({
  isOpen,
  onClose,
  lesson,
}: EditLessonModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    video_url: "",
    duration: 0,
    description: "",
  });

  useEffect(() => {
    setFormData({
      title: lesson.title,
      video_url: lesson.video_url,
      duration: lesson.duration,
      description: lesson.description,
    });
  }, [lesson]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-600">
            Edit Lessons
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Title</Label>
              <Input
                id="firstName"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Duration</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: parseInt(e.target.value, 10),
                  })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Video URL</Label>
            <Input
              id="video_url"
              type="url"
              value={formData.video_url}
              onChange={(e) =>
                setFormData({ ...formData, video_url: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
