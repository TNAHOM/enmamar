"use client";

import React from "react";
import { useEffect, useState } from "react";
import { GetAdminCourses } from "@/hooks/useGetCourses";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Lesson } from "@/types/courses";
import { InstructorCourseAnalytics } from "@/types/instructor";
import { useTableData } from "@/hooks/useTableData";
import LessonList from "./LessonList";
import { EditCourseModal } from "./EditCourseModal"; // Update this path as needed
import { toast } from "sonner";

const AllCoursesList = () => {
  const { data, loading } = GetAdminCourses();
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [courseLesson, setCourseLesson] = useState<Lesson[] | null>(null);
  const [errorLesson, setErrorLesson] = useState<string | null>(null);
  const [loadingLesson, setLoadingLesson] = useState<boolean>(false);

  // Edit modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");

  const {
    paginatedData,
    totalItems,
    startIndex,
    endIndex,
    currentPage,
    totalPages,
    handleSort,
    sortField,
    sortOrder,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  } = useTableData<InstructorCourseAnalytics, keyof InstructorCourseAnalytics>({
    data: data || [],
    initialSortField: "title",
    itemsPerPage: 5,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!expandedRow) return;

      setLoadingLesson(true);
      try {
        const response = await fetch(`/api/course/${expandedRow}`);
        const jsonData = await response.json();
        setCourseLesson(jsonData.lessons);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An error has occured";
        setErrorLesson(errorMessage);
      } finally {
        setLoadingLesson(false);
      }
    };
    fetchData();
  }, [expandedRow]);

  const handleDropdown = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id); // Toggle expanded row
  };

  const handleEditClick = (courseId: string) => {
    if (!courseId) {
      console.error("Course ID is missing");
      return;
    }
    setSelectedCourseId(courseId);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedCourseId("");
  };

  // Delete course handler with toast notifications
  const handleDeleteCourse = async (courseId: string) => {
    try {
      const res = await fetch(`/api/course/${courseId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete course");
      toast.success("Course deleted successfully");
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Error deleting course";
      toast.error(msg);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("title")}
              >
                Name{" "}
                {sortField === "title" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("views")}
              >
                Number of Views{" "}
                {sortField === "views" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((course) => (
              <React.Fragment key={course.course.id}>
                <TableRow>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDropdown(course.course.id)}
                    >
                      {expandedRow === course.course.id ? "▲" : "▼"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            course.course.thumbnail_url ||
                            "/placeholder.svg?height=32&width=32"
                          }
                          alt={course.course.title}
                        />
                        <AvatarFallback>
                          {course.course.title.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{course.course.title}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default" className="rounded-full">
                      {course.no_of_enrollments}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(course.course.id)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCourse(course.course.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {expandedRow === course.id && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      {loadingLesson ? (
                        <div>Loading course details...</div>
                      ) : errorLesson ? (
                        <div>Error loading course details</div>
                      ) : courseLesson && courseLesson.length > 0 ? (
                        <LessonList
                          courseLesson={courseLesson}
                          courseId={course.course.id}
                        />
                      ) : (
                        <div>No course details available</div>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1} to {endIndex} of {totalItems} entries
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Edit Course Modal */}
      <EditCourseModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        courseId={selectedCourseId}
      />
    </div>
  );
};

export default AllCoursesList;
