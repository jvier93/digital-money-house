"use client";

import React, { createContext, useContext, useState } from "react";

interface DateFilterContextType {
  isFilterModalOpen: boolean;
  openFilterModal: () => void;
  closeFilterModal: () => void;
}

const DateFilterContext = createContext<DateFilterContextType | null>(null);

export function DateFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const openFilterModal = () => setIsFilterModalOpen(true);
  const closeFilterModal = () => setIsFilterModalOpen(false);

  return (
    <DateFilterContext.Provider
      value={{
        isFilterModalOpen,
        openFilterModal,
        closeFilterModal,
      }}
    >
      {children}
    </DateFilterContext.Provider>
  );
}

export function useDateFilter() {
  const context = useContext(DateFilterContext);
  if (!context) {
    throw new Error("useDateFilter must be used within a DateFilterProvider");
  }
  return context;
}
