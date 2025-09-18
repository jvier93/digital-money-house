"use client";

import Container from "@/components/ui/container";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { ActivityItem } from "./activity-item";
import { ActivityPanelProps } from "./types";

export function ActivityPanel({
  activity,
  currentPage,
  totalPages,
  onPageChange,
  showViewAllLink = true,
  emptyStateMessage,
}: ActivityPanelProps) {
  const hasActivity = activity.length > 0;
  const showPagination =
    totalPages && onPageChange && currentPage && hasActivity;
  const showViewAll = showViewAllLink && hasActivity;

  return (
    <Container>
      {/* Header */}
      <Container.Header>Tu actividad</Container.Header>

      {/* Content */}
      <Container.Content>
        {hasActivity ? (
          activity.map((transaction) => (
            <ActivityItem key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <EmptyState
            type={emptyStateMessage?.includes("Error") ? "error" : "empty"}
            message={emptyStateMessage || "No hay actividad reciente"}
          />
        )}
      </Container.Content>

      {/* Footer */}
      <Container.Footer>
        {showPagination ? (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        ) : showViewAll ? (
          <Container.LinkWithArrow href="/dashboard/activity">
            Ver toda tu actividad
          </Container.LinkWithArrow>
        ) : null}
      </Container.Footer>
    </Container>
  );
}
