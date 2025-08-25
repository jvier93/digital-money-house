import React from "react";
import { ArrowRight } from "lucide-react";
import ActivitySummary from "@/components/dashboard/activity-summary";
import WalletBalance from "@/components/dashboard/wallet-balance";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <main className="bg-light flex-1 space-y-4 p-4 md:px-10 lg:px-20">
      <Link href="/dashboard" className="text-btn-3 block md:hidden">
        <div className="flex items-center gap-2">
          <ArrowRight />
          <span className="text-btn-3"> Inicio</span>
        </div>
      </Link>
      <WalletBalance />
      <div className="space-y-4 lg:flex lg:gap-4 lg:space-y-0">
        <Link
          className="text-btn-2 bg-accent block w-full rounded-xl py-4 text-center shadow-md"
          href="/dashboard"
        >
          Ingresar dinero
        </Link>
        <Link
          className="text-btn-2 bg-accent block w-full rounded-xl py-4 text-center shadow-md"
          href="/dashboard"
        >
          Pago de servicios
        </Link>
      </div>

      <ActivitySummary />
    </main>
  );
};

export default DashboardPage;
