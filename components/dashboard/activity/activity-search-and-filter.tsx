"use client";

import { ActivitySearchForm } from "@/components/dashboard/activity/activity-search-form";
import { DateFilterTrigger } from "@/components/ui/date-filter-trigger";
import { useDateFilter } from "@/contexts/date-filter-context";

export function ActivitySearchAndFilter() {
  const { openFilterModal } = useDateFilter();

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-stretch md:gap-3">
      {/* Search form takes full width on mobile, grows on desktop */}
      <div className="flex-1">
        <ActivitySearchForm />
      </div>

      {/* Filter trigger - hidden on mobile, shown on desktop */}
      <div className="hidden md:block">
        <DateFilterTrigger onClick={openFilterModal} variant="desktop" />
      </div>
    </div>
  );
}
