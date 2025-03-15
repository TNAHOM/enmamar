"use client";

import type React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { userProfile } from "@/types/user";
import { useAuthStore } from "@/lib/store/auth-store";
import { useEffect, useState } from "react";
import { z } from "zod";

interface AddInstructorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddInstructorModal({
  isOpen,
  onClose,
}: AddInstructorModalProps) {
  const [instructors, setInstructors] = useState<userProfile[]>([]);

  const instructorSchema = z.object({
    instructor_id: z.string().nonempty("Instructor is required"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(instructorSchema),
  });
  const { isLoading } = useAuthStore();

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await fetch("/api/users/instructors");
        if (!response.ok) throw new Error("Failed to fetch instructors");
        const data = await response.json();
        setInstructors(data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
        throw new Error("Failed to fetch instructors");
      }
    };

    fetchInstructors();
  }, []);

  const onSubmit = async ({ instructor_id }: { instructor_id: string }) => {
    try {
      const response = await fetch(`/api/users/role/${instructor_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ role: "instructor" }),
      });
      // console.log(response, "response from role/id");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to update instructor role");
      }

      onClose();
    } catch (error) {
      console.error("Error updating instructor role:", error);
      throw new Error("Failed to update instructor role");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-600">
            Add New Instructor
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Course Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor</Label>
              <Controller
                name="instructor_id"
                disabled={isLoading}
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
              {errors.instructor_id && (
                <p className="text-red-500 text-sm">
                  {errors.instructor_id.message}
                </p>
              )}
            </div>
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
              {isSubmitting ? "Creating..." : "Promote to Instructor"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
