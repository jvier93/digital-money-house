import React from "react";

import ActivitySummary from "@/components/dashboard/activity-summary";
import WalletBalance from "@/components/dashboard/wallet-balance";
import CurrentPageBreadcrumb from "@/components/dashboard/current-page-breadcrumb";
import Button from "@/components/ui/button";

const DashboardPage = () => {
  return (
    <main className="bg-light flex-1 space-y-4 p-4 md:px-10 md:py-20 lg:px-20">
      <CurrentPageBreadcrumb currentPageTitle="Inicio" href="/dashboard" />
      <WalletBalance />
      <div className="space-y-4 lg:flex lg:gap-4 lg:space-y-0">
        <Button size="lg" variant="accent" href="/dashboard/deposit">
          Ingresar dinero
        </Button>
        <Button size="lg" variant="accent" href="/dashboard/payments">
          Pago de servicios
        </Button>
      </div>

      <ActivitySummary />
    </main>
  );
};

export default DashboardPage;
