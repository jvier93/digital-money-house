"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ServicesSearchForm } from "@/components/dashboard/payments/services-search-form";
import { type Service } from "@/services";
import Container from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { ServiceItem } from "@/components/dashboard/payments/service-item";

type InteractiveServicesPanelProps = {
  initialServices: Service[];
};

export function InteractiveServicesPanel({
  initialServices,
}: InteractiveServicesPanelProps) {
  const searchParams = useSearchParams();

  // States for filters and pagination
  const [query, setQuery] = useState("");

  // Synchronize states with URL params
  useEffect(() => {
    setQuery(searchParams.get("search") || "");
  }, [searchParams]);

  // Filter by search query
  const filteredServices = useMemo(() => {
    if (!query.trim()) return initialServices;
    return initialServices.filter((service) =>
      service.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [initialServices, query]);

  // Determine the appropriate message for empty state
  const getEmptyStateMessage = () => {
    if (initialServices.length === 0) {
      return "No hay servicios disponibles";
    }
    return "No se encontraron servicios para la búsqueda realizada";
  };

  return (
    <>
      {/* Search Form */}
      <ServicesSearchForm />

      {/* Services Panel */}
      <Container>
        <Container.Header>Servicios disponibles</Container.Header>

        <Container.Content data-testid="services-container">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))
          ) : (
            <EmptyState
              type={initialServices.length === 0 ? "empty" : "empty"}
              message={getEmptyStateMessage()}
            />
          )}
        </Container.Content>

        <Container.Footer showBorder={false}>{""}</Container.Footer>
      </Container>
    </>
  );
}
