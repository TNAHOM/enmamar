"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useGetCourses } from "@/hooks/useGetCourses";
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
import { course, Lesson } from "@/types/courses";
import { useTableData } from "@/hooks/useTableData";
import LessonList from "./LessonList";

const AllCoursesList = () => {
  const { data, error, loading } = useGetCourses();
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [courseLesson, setCourseLesson] = useState<Lesson[] | null>(null);
  const [errorLesson, setErrorLesson] = useState<string | null>(null);
  const [loadingLesson, setLoadingLesson] = useState<boolean>(false);

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
  } = useTableData<course, keyof course>({
    data: data || [],
    initialSortField: "title",
    itemsPerPage: 5,
  });
  console.log(error, "error from all course list");
  useEffect(() => {
    const fetchData = async () => {
      setLoadingLesson(true);
      try {
        console.log(expandedRow, "expandedRow");
        const response = await fetch(`/api/course/${expandedRow}`);
        const jsonData: course = await response.json();
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
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("industry")}
              >
                Industry{" "}
                {sortField === "industry" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("lessons")}
              >
                Number of lessons{" "}
                {sortField === "lessons" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((course) => (
              <React.Fragment key={course.id}>
                <TableRow>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDropdown(course.id)}
                    >
                      {expandedRow === course.id ? "▲" : "▼"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="/placeholder.svg?height=32&width=32"
                          alt={course.title}
                        />
                        <AvatarFallback>
                          {course.title.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{course.title}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default" className="rounded-full">
                      2198
                    </Badge>
                  </TableCell>
                  <TableCell>Software Development</TableCell>
                  <TableCell>12</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
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
                      ) : courseLesson && courseLesson.length > 0 ? ( // Ensure `courseLesson` is an array
                        <LessonList
                          // key={courseLesson.id}
                          courseLesson={courseLesson}
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
    </div>
  );
};

export default AllCoursesList;
