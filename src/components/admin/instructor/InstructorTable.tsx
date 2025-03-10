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
import { userProfile } from "@/types/user";

type SortField = "first_name" | "views" | "industry" | "courses";
// type SortField = "first_name";
type SortOrder = "asc" | "desc";

export function InstructorTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>("first_name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [selectedInstructor, setSelectedInstructor] = useState<string | null>(
    null
  );
  const itemsPerPage = 5;

  const { data, loading, error } = useFetchListData<userProfile[]>({
    url: "/api/users",
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(error, "error in instructor table");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedInstructors = [...data].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const totalPages = Math.ceil(sortedInstructors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInstructors = sortedInstructors.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
            {paginatedInstructors.map((instructor) => (
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
                  <Badge
                    variant={
                      // instructor.views > 1000 ? "default" : "destructive"
                      "default"
                    }
                    className="rounded-full"
                  >
                    {/* {instructor.views} */}
                    2198
                  </Badge>
                </TableCell>
                <TableCell>
                  {/* {instructor.industry} */}
                  Software Development
                </TableCell>
                <TableCell>
                  {/* {instructor.courses} */}
                  12
                </TableCell>
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
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, sortedInstructors.length)} of{" "}
          {sortedInstructors.length} entries
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
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
