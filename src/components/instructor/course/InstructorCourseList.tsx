"use client";

import React, { useState } from "react";
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
import { Eye } from "lucide-react";
import { InstructorCourse } from "@/utilities/instructor";
import { useTableData } from "@/hooks/useTableData";
import { Lesson } from "@/types/courses";

interface InstructorCourseListProps {
  courses: InstructorCourse[];
}

const InstructorCourseList = ({ courses }: InstructorCourseListProps) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

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
  } = useTableData<InstructorCourse, keyof InstructorCourse>({
    data: courses,
    initialSortField: "title",
    itemsPerPage: 5,
  });

  const handleDropdown = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

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
                Course Name{" "}
                {sortField === "title" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("views")}
              >
                Views{" "}
                {sortField === "views" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("enrollments")}
              >
                Enrollments{" "}
                {sortField === "enrollments" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("revenue")}
              >
                Revenue{" "}
                {sortField === "revenue" && (sortOrder === "asc" ? "↑" : "↓")}
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
                    <Badge variant="secondary" className="rounded-full">
                      {course.views}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default" className="rounded-full">
                      {course.enrollments}
                    </Badge>
                  </TableCell>
                  <TableCell>${course.revenue}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                {expandedRow === course.id && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <div className="p-4 bg-muted/50 rounded-md">
                        <h4 className="font-medium mb-2">Course Lessons</h4>
                        <ul className="space-y-2">
                          {course.lessons.map((lesson: Lesson) => (
                            <li
                              key={lesson.id}
                              className="flex items-center justify-between bg-background p-2 rounded"
                            >
                              <span>{lesson.title}</span>
                              <span className="text-muted-foreground">
                                {lesson.duration}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
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

export default InstructorCourseList;
