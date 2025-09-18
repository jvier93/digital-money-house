import { Transaction } from "@/services";

export type ActivityPanelVariant = "default" | "filtered";

export type ActivityPanelProps = {
  activity: Transaction[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  showViewAllLink?: boolean;
  emptyStateMessage?: string;
  variant?: ActivityPanelVariant;
};

export type ActivityItemProps = {
  transaction: Transaction;
};

export type ActivityHeaderProps = {
  showFilter: boolean;
  onFilterClick?: () => void;
  title?: string;
};

export type ActivityFooterProps = {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  showViewAllLink: boolean;
  hasActivity: boolean;
};
