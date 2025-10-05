"use client";

import Container from "@/components/ui/container";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { ServiceItem } from "./service-item";
import { type Service } from "@/services";

type ServicesPanelProps = {
  services: Service[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  emptyStateMessage?: string;
};

export function ServicesPanel({
  services,
  currentPage,
  totalPages,
  onPageChange,
  emptyStateMessage,
}: ServicesPanelProps) {
  const hasServices = services.length > 0;
  const showPagination =
    totalPages && onPageChange && currentPage && hasServices;

  return (
    <Container>
      {/* Header */}
      <Container.Header>Servicios disponibles</Container.Header>

      {/* Content */}
      <Container.Content>
        {hasServices ? (
          services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))
        ) : (
          <EmptyState
            type={emptyStateMessage?.includes("Error") ? "error" : "empty"}
            message={emptyStateMessage || "No hay servicios disponibles"}
          />
        )}
      </Container.Content>

      {/* Footer */}
      <Container.Footer>
        {showPagination && (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </Container.Footer>
    </Container>
  );
}
