"use client";

// React hooks and Next.js navigation utilities
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// Icons from Lucide React
import { ChevronRight } from "lucide-react";
// Custom UI components
import Container from "@/components/ui/container";
import { useDateFilter } from "@/contexts/date-filter-context";
import Button from "./button";

// Type definition for available date filter options
export type DateFilterType =
  | "all"
  | "today"
  | "yesterday"
  | "week"
  | "15days"
  | "month"
  | "year";

// Interface for filter option structure
interface DateFilterOption {
  value: DateFilterType;
  label: string;
}

// Predefined filter options with Spanish labels
const filterOptions: DateFilterOption[] = [
  { value: "today", label: "Hoy" },
  { value: "yesterday", label: "Ayer" },
  { value: "week", label: "Última semana" },
  { value: "15days", label: "Últimos 15 días" },
  { value: "month", label: "Último mes" },
  { value: "year", label: "Último año" },
];

export function DateFilterModal() {
  // Next.js hooks for navigation and URL parameters
  const router = useRouter();
  const searchParams = useSearchParams();
  // Custom context hook for modal state management
  const { isFilterModalOpen, closeFilterModal } = useDateFilter();

  // Get current filter from URL parameters, default to "all"
  const currentFilter = (searchParams.get("filter") as DateFilterType) || "all";
  // Local state to track selected filter option
  const [selectedFilter, setSelectedFilter] =
    useState<DateFilterType>(currentFilter);

  // Handle applying the selected filter
  const handleApply = () => {
    // Create new URL search parameters
    const params = new URLSearchParams(searchParams);

    // Remove filter parameter if "all" is selected, otherwise set the filter
    if (selectedFilter === "all") {
      params.delete("filter");
    } else {
      params.set("filter", selectedFilter);
    }

    // Reset page to 1 when applying new filter
    params.delete("page");

    // Navigate to activity page with updated parameters
    router.push(`/dashboard/activity?${params.toString()}`);
    // Close the modal
    closeFilterModal();
  };

  // Handle clearing filters (reset to "all" and update URL)
  const handleClear = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("filter");
    router.push(`/dashboard/activity?${params.toString()}`);
    setSelectedFilter("all");
    closeFilterModal();
  };

  // Sync local state with URL changes
  useEffect(() => {
    const currentUrlFilter =
      (searchParams.get("filter") as DateFilterType) || "all";
    setSelectedFilter(currentUrlFilter);
  }, [searchParams]);

  // Don't render anything if modal is closed
  if (!isFilterModalOpen) return null;

  return (
    <>
      {/* Modal backdrop - covers entire screen with dark overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/70"
        onClick={closeFilterModal}
      />

      {/* Modal container - positions modal on screen */}
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4 md:items-center md:justify-end md:pr-6">
        {/* Modal content wrapper - handles sizing, scroll, and click events */}
        <div
          className="pointer-events-auto w-full max-w-sm md:max-h-[90vh] md:max-w-md md:overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Container className="!rounded-none shadow-xl">
            {/* Modal Header */}
            <Container.CustomHeader className="p-4" showBorder={true}>
              <div className="flex items-center justify-between">
                <h3 className="text-primary text-btn-2">Período</h3>
                {/* Clear filters button */}
                <button
                  onClick={handleClear}
                  className="text-secondary cursor-pointer text-sm"
                >
                  Borrar filtros
                </button>
              </div>
            </Container.CustomHeader>

            {/* Modal Content - Filter options */}
            <Container.Content className="p-4">
              <div className="space-y-2">
                {/* Render each predefined filter option as radio button */}
                {filterOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center space-x-3"
                  >
                    <input
                      type="radio"
                      name="dateFilter"
                      value={option.value}
                      checked={selectedFilter === option.value}
                      onChange={() => setSelectedFilter(option.value)}
                      className="text-primary focus:ring-primary border-light h-4 w-4"
                    />
                    <span className="text-body-1 text-primary">
                      {option.label}
                    </span>
                  </label>
                ))}

                {/* Custom date range option (currently disabled) */}
                <label className="flex cursor-pointer items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="dateFilter"
                      value="custom"
                      disabled
                      className="text-primary focus:ring-primary border-light h-4 w-4"
                    />
                    <span className="text-body-1 text-gray-700">
                      Otro período
                    </span>
                  </div>
                  <span className="text-gray-400">
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </label>
              </div>
            </Container.Content>

            {/* Modal Footer - Apply button */}
            <Container.Footer className="p-4">
              <Button onClick={handleApply} variant="accent" size="sm">
                Aplicar
              </Button>
            </Container.Footer>
          </Container>
        </div>
      </div>
    </>
  );
}
