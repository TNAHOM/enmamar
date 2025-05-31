import { useEffect, useState, useCallback } from "react";
import type { userProfile } from "@/types/user";

export function useUsers() {
  const [users, setUsers] = useState<userProfile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) {
        setError("Failed to fetch users");
        return;
      }
      setUsers(await res.json());
    } catch (err) {
      setError((err as Error).message || "Failed to fetch users");
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const clearError = () => setError(null);
  return { users, error, fetchUsers, clearError };
}
