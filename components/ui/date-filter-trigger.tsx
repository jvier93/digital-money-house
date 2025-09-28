"use client";

import { SlidersHorizontal } from "lucide-react";
import clsx from "clsx";
import Button from "./button";

interface FilterTriggerProps {
  onClick: () => void;
  variant?: "mobile" | "desktop";
  className?: string;
}

export function DateFilterTrigger({
  onClick,
  variant = "mobile",
  className,
}: FilterTriggerProps) {
  if (variant === "desktop") {
    return (
      <Button
        onClick={onClick}
        variant="accent"
        size="sm"
        icon={<SlidersHorizontal className="h-4 w-4" />}
        className={clsx("h-full gap-10", className)}
        data-testid="date-filter-desktop"
      >
        Filtrar
      </Button>
    );
  }

  // Mobile variant (current style)
  return (
    <Button
      onClick={onClick}
      icon={<SlidersHorizontal className="h-4 w-4" />}
      variant="outline"
      size="sm"
      className="underline"
      data-testid="date-filter-mobile"
    >
      Filtrar
    </Button>
  );
}
