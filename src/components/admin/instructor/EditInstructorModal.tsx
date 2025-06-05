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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOCK_INSTRUCTORS } from "@/utilities/mock";

interface EditInstructorModalProps {
  isOpen: boolean;
  onClose: () => void;
  instructorId: string | null;
}

const PROFESSIONS = [
  "Product Designer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UI Designer",
  "UX Designer",
  "Product Manager",
  "UX Copywriter",
];

export function EditInstructorModal({
  isOpen,
  onClose,
  instructorId,
}: EditInstructorModalProps) {
  const [formData, setFormData] = useState({
    phone: "",
    firstName: "",
    lastName: "",
    profession: "",
  });

  useEffect(() => {
    if (instructorId) {
      const instructor = MOCK_INSTRUCTORS.find((i) => i.id === instructorId);
      if (instructor) {
        const [firstName, lastName] = instructor.name.split(" ");
        setFormData({
          phone: instructor.phone,
          firstName,
          lastName,
          profession: instructor.industry,
        });
      }
    }
  }, [instructorId]);

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
            Edit Instructor
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profession">Profession</Label>
            <Select
              value={formData.profession}
              onValueChange={(value) =>
                setFormData({ ...formData, profession: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select profession" />
              </SelectTrigger>
              <SelectContent>
                {PROFESSIONS.map((profession) => (
                  <SelectItem key={profession} value={profession}>
                    {profession}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
