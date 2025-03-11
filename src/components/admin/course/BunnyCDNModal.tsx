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

interface BunnyCDNModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BunnyCDNModal({ isOpen, onClose }: BunnyCDNModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video_id: "",
    duration: 0,
    library_id: "",
    secret_key: "",
  });

  //   useEffect(() => {
  //     if (instructorId) {
  //       const instructor = MOCK_INSTRUCTORS.find((i) => i.id === instructorId);
  //       if (instructor) {
  //         const [firstName, lastName] = instructor.name.split(" ");
  //         setFormData({
  //         //   email: instructor.email,
  //           phone: instructor.phone,
  //           firstName,
  //           lastName,
  //           profession: instructor.industry,
  //         });
  //       }
  //     }
  //   }, [instructorId]);

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
            Connect Video ID
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Duration</Label>
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

          <div className="space-y-2">
            <Label htmlFor="phone">Library Id</Label>
            <Input
              id="library_id"
              type="text"
              value={formData.library_id}
              onChange={(e) =>
                setFormData({ ...formData, library_id: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Video Id</Label>
            <Input
              id="video_id"
              type="text"
              value={formData.video_id}
              onChange={(e) =>
                setFormData({ ...formData, video_id: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Secret Key</Label>
            <Input
              id="secret_key"
              type="text"
              value={formData.secret_key}
              onChange={(e) =>
                setFormData({ ...formData, secret_key: e.target.value })
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
