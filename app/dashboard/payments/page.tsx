import React from "react";
import CurrentPageBreadcrumb from "@/components/dashboard/current-page-breadcrumb";
import { InteractiveServicesPanel } from "@/components/dashboard/payments/interactive-services-panel";
import { getPaymentServices } from "@/services";

const PaymentsPage = async () => {
  const services = await getPaymentServices();

  return (
    <main className="bg-light flex-1 space-y-4 p-4 md:px-10 md:py-20 lg:px-20">
      <CurrentPageBreadcrumb
        currentPageTitle="Pagar servicios"
        href="/dashboard/payments"
      />
      <InteractiveServicesPanel initialServices={services} />
    </main>
  );
};

export default PaymentsPage;
