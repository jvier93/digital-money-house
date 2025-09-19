import React from "react";
import CurrentPageBreadcrumb from "@/components/dashboard/current-page-breadcrumb";
import DepositOption from "@/components/dashboard/deposit/deposit-option";
import { CircleUserRound, CreditCard } from "lucide-react";

const DepositPage = () => {
  return (
    <main className="bg-light flex-1 space-y-4 p-4 md:px-10 md:py-20 lg:px-20">
      <CurrentPageBreadcrumb
        currentPageTitle="Cargar dinero"
        href="/dashboard"
      />

      <div className="space-y-4">
        <DepositOption
          href="/dashboard/deposit/bank-transfer"
          icon={<CircleUserRound className="text-accent h-8 w-8" />}
          title="Transferencia bancaria"
        />

        <DepositOption
          href="/dashboard/deposit/card"
          icon={<CreditCard className="text-accent h-8 w-8" />}
          title="Seleccionar tarjeta"
        />
      </div>
    </main>
  );
};

export default DepositPage;
