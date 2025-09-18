"use client";

import type React from "react";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export function ActivitySearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (searchValue.trim()) {
        params.set("search", searchValue.trim());
      } else {
        params.delete("search");
      }

      router.push(`/dashboard/activity?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="text-body-1 relative rounded-xl bg-white py-2 shadow-md">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Buscar en tu actividad"
          className="w-full py-2 pr-4 pl-10 outline-none focus:border-transparent"
          disabled={isPending}
        />
      </div>
    </form>
  );
}
