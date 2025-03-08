"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { InstructorTable } from "@/components/admin/InstructorTable";
import { AddInstructorModal } from "@/components/admin/AddInstructorModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function InstructorsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Instructor Management</h1>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Instructor
        </Button>
      </div>

      <InstructorTable />

      <AddInstructorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </AdminLayout>
  );
}
