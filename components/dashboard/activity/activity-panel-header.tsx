"use client";

import Container from "@/components/ui/container";
import { DateFilterTrigger } from "@/components/ui/date-filter-trigger";
import { useDateFilter } from "@/contexts/date-filter-context";

export function ActivityPanelHeader() {
  const { openFilterModal } = useDateFilter();

  return (
    <Container.CustomHeader>
      <div className="flex items-center justify-between">
        <h3 className="text-primary heading-3">Tu actividad</h3>
        {/* Filter trigger - shown only on mobile */}
        <div className="md:hidden">
          <DateFilterTrigger onClick={openFilterModal} variant="mobile" />
        </div>
      </div>
    </Container.CustomHeader>
  );
}
