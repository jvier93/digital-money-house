"use client";

import React, { useState, useEffect, useMemo, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ActivitySearchAndFilter } from "@/components/dashboard/activity/activity-search-and-filter";
import { ActivityPanelHeader } from "@/components/dashboard/activity/activity-panel-header";
import {
  DateFilterModal,
  type DateFilterType,
} from "@/components/ui/date-filter-modal";
import { DateFilterProvider } from "@/contexts/date-filter-context";
import { type Transaction } from "@/services";
import Container from "@/components/ui/container";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { ActivityItem } from "@/components/dashboard/activity-item";

type InteractiveActivityPanelProps = {
  initialActivity: Transaction[];
};

export function InteractiveActivityPanel({
  initialActivity,
}: InteractiveActivityPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // States for filters and pagination
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 1;

  // Get current filter from URL
  const currentFilter = (searchParams.get("filter") as DateFilterType) || "all";

  // Synchronize states with URL params
  useEffect(() => {
    setQuery(searchParams.get("search") || "");
    setPage(Number.parseInt(searchParams.get("page") || "1"));
  }, [searchParams]);

  // Helper function to check if a date is in the range
  const isDateInRange = (itemDate: Date, filter: DateFilterType): boolean => {
    const now = new Date();

    switch (filter) {
      case "today":
        return itemDate.toDateString() === now.toDateString();
      case "yesterday": {
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        return itemDate.toDateString() === yesterday.toDateString();
      }
      case "week": {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return itemDate >= weekAgo;
      }
      case "15days": {
        const fifteenDaysAgo = new Date();
        fifteenDaysAgo.setDate(now.getDate() - 15);
        return itemDate >= fifteenDaysAgo;
      }
      case "month": {
        const monthAgo = new Date();
        monthAgo.setMonth(now.getMonth() - 1);
        return itemDate >= monthAgo;
      }
      case "year": {
        const yearAgo = new Date();
        yearAgo.setFullYear(now.getFullYear() - 1);
        return itemDate >= yearAgo;
      }
      default:
        return true;
    }
  };

  // Filter by search query
  const filteredByQuery = useMemo(() => {
    if (!query.trim()) return initialActivity;
    return initialActivity.filter((item) =>
      item.description.toLowerCase().includes(query.toLowerCase()),
    );
  }, [initialActivity, query]);

  // Filter by date
  const filteredByDate = useMemo(() => {
    if (currentFilter === "all") return filteredByQuery;

    return filteredByQuery.filter((item) => {
      const itemDate = new Date(item.dated);
      return isDateInRange(itemDate, currentFilter);
    });
  }, [filteredByQuery, currentFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredByDate.length / pageSize);
  const paginatedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredByDate.slice(start, start + pageSize);
  }, [filteredByDate, page]);

  // Handlers for filter changes
  const handlePageChange = (newPage: number) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (newPage === 1) {
        params.delete("page");
      } else {
        params.set("page", newPage.toString());
      }

      setPage(newPage);
      router.push(`/dashboard/activity?${params.toString()}`);
    });
  };

  // Determine the appropriate message for empty state
  const getEmptyStateMessage = () => {
    if (initialActivity.length === 0) {
      return "No tienes actividad aún";
    }
    return "No se encontraron resultados para los filtros aplicados";
  };

  return (
    <DateFilterProvider>
      {/* Search and Filter - Desktop layout */}
      <ActivitySearchAndFilter />

      {/* Activity Panel with Custom Header for Mobile Filter */}
      <Container>
        <ActivityPanelHeader />

        <Container.Content>
          {paginatedItems.length > 0 ? (
            paginatedItems.map((transaction) => (
              <ActivityItem key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <EmptyState
              type={initialActivity.length === 0 ? "empty" : "empty"}
              message={getEmptyStateMessage()}
            />
          )}
        </Container.Content>

        <Container.Footer>
          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </Container.Footer>
      </Container>

      {/* Date filter modal */}
      <DateFilterModal />
    </DateFilterProvider>
  );
}
