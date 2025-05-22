import { useEffect, useState, useCallback } from "react";
import type { userProfile } from "@/types/user";

export function useInstructors() {
  const [instructors, setInstructors] = useState<userProfile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchInstructors = useCallback(async () => {
    try {
      const res = await fetch("/api/instructors");
      if (!res.ok) {
        setError("Failed to fetch instructors");
        return;
      }
      setInstructors(await res.json());
    } catch (err) {
      setError((err as Error).message || "Failed to fetch instructors");
    }
  }, []);

  useEffect(() => {
    fetchInstructors();
  }, [fetchInstructors]);

  const clearError = () => setError(null);
  return { instructors, error, fetchInstructors, clearError };
}
