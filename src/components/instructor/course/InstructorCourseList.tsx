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
import { useTableData } from "@/hooks/useTableData";
import { InstructorCourseAnalytics } from "@/types/instructor";

const InstructorCourseList = ({
  data,
}: {
  data: InstructorCourseAnalytics[];
}) => {
  console.log(data, "data from instructor course list");
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
  } = useTableData<InstructorCourseAnalytics, keyof InstructorCourseAnalytics>({
    data: data || [],
    initialSortField: "course",
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
                onClick={() => handleSort("course")}
              >
                Course Name{" "}
                {sortField === "course" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("view_count")}
              >
                Views{" "}
                {sortField === "view_count" &&
                  (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("no_of_enrollments")}
              >
                Enrollments{" "}
                {sortField === "no_of_enrollments" &&
                  (sortOrder === "asc" ? "↑" : "↓")}
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
            {paginatedData.map((courseData: InstructorCourseAnalytics) => (
              <React.Fragment key={courseData.course.id}>
                <TableRow>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDropdown(courseData.course.id)}
                    >
                      {expandedRow === courseData.course.id ? "▲" : "▼"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            courseData.course.thumbnail_url ||
                            "/placeholder.svg?height=32&width=32"
                          }
                          alt={courseData.course.title}
                        />
                        <AvatarFallback>
                          {courseData.course.title.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">
                        {courseData.course.title}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="rounded-full">
                      {courseData.view_count}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default" className="rounded-full">
                      {courseData.no_of_enrollments}
                    </Badge>
                  </TableCell>
                  <TableCell>${courseData.revenue}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                {expandedRow === courseData.course.id && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <div className="p-4 bg-muted/50 rounded-md">
                        <h4 className="font-medium mb-2">Course Lessons</h4>
                        <ul className="space-y-2">
                          {courseData.course.lessons.map((lesson) => (
                            <li
                              key={lesson.id}
                              className="flex items-center justify-between bg-background p-2 rounded"
                            >
                              <span>{lesson.title}</span>
                              <span className="text-muted-foreground">
                                {lesson.duration} minutes
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

export const Loading = () => (
  <div className="space-y-4">
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Course Name</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Enrollments</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              Loading...
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
);
