"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EditInstructorModal } from "@/components/admin/instructor/EditInstructorModal";
import { Pencil, Trash2 } from "lucide-react";
import { useFetchListData } from "@/hooks/useFetchData";
import { InstructorProfile } from "@/types/user";
import { useTableData } from "@/hooks/useTableData";

type SortField = keyof InstructorProfile | "courses" | "views" | "industry";

export function InstructorTable() {
  const [selectedInstructor, setSelectedInstructor] = useState<string | null>(
    null
  );

  const { data, loading, error } = useFetchListData<InstructorProfile>({
    url: "/api/instructors",
  });

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
  } = useTableData<InstructorProfile, SortField>({
    data: data || [],
    initialSortField: "first_name",
    itemsPerPage: 5,
  });
  console.log(data, "data in instructor table");
  console.log(paginatedData, "paginated data in instructor table");

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(error, "error in instructor table");

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("first_name")}
              >
                Name{" "}
                {sortField === "first_name" &&
                  (sortOrder === "asc" ? "↑" : "↓")}
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
                onClick={() => handleSort("courses")}
              >
                Number of Videos{" "}
                {sortField === "courses" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((instructor) => (
              <TableRow key={instructor.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt={instructor.first_name}
                      />
                      <AvatarFallback>
                        {instructor.first_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{instructor.first_name}</div>
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedInstructor(instructor.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
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

      <EditInstructorModal
        isOpen={!!selectedInstructor}
        onClose={() => setSelectedInstructor(null)}
        instructorId={selectedInstructor}
      />
    </div>
  );
}
