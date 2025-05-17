"use client";

import { useState, useMemo } from "react";

export type SortOrder = "asc" | "desc";

/**
 * Combined hook for handling sortable and paginated table data
 * 
 * @param data - Array of data to display in table
 * @param initialSortField - Initial field to sort by
 * @param initialSortOrder - Initial sort order (asc or desc)
 * @param itemsPerPage - Number of items to display per page
 * @returns Object containing table data and control functions
 */
export function useTableData<T extends Record<string, unknown>, K extends keyof T>({
    data,
    initialSortField,
    initialSortOrder = "asc",
    itemsPerPage = 5,
}: {
    data: T[];
    initialSortField: K;
    initialSortOrder?: SortOrder;
    itemsPerPage?: number;
}) {
    const [sortField, setSortField] = useState<K>(initialSortField);
    const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder);
    const [currentPage, setCurrentPage] = useState(1);

    // Handle toggling sort direction or changing sort field
    const handleSort = (field: K) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
        // Reset to first page when sorting changes
        setCurrentPage(1);
    };

    // Memoized sorted data
    const sortedData = useMemo(() => {
        if (!data || data.length === 0) {
            return [];
        }

        return [...data].sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            // Handle string comparison
            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortOrder === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            // Handle number comparison
            if (typeof aValue === "number" && typeof bValue === "number") {
                return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
            }

            // Handle date comparison
            if (aValue instanceof Date && bValue instanceof Date) {
                return sortOrder === "asc"
                    ? aValue.getTime() - bValue.getTime()
                    : bValue.getTime() - aValue.getTime();
            }

            // Default case for other types
            return 0;
        });
    }, [data, sortField, sortOrder]);

    // Calculate pagination metrics
    const totalItems = sortedData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    // Memoized paginated data
    const paginatedData = useMemo(() => {
        return sortedData.slice(startIndex, endIndex);
    }, [sortedData, startIndex, endIndex]);

    // Pagination navigation functions
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return {
        // Sorted and paginated data
        paginatedData,
        sortedData,

        // Sort state and controls
        sortField,
        sortOrder,
        handleSort,

        // Pagination state and metrics
        currentPage,
        totalPages,
        startIndex,
        endIndex,
        totalItems,

        // Pagination controls
        goToNextPage,
        goToPreviousPage,
        goToPage,
        setCurrentPage,
    };
}