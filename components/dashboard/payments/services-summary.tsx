import React from "react";
import { ServicesSearchForm } from "@/components/dashboard/payments/services-search-form";
import { ServicesPanel } from "@/components/dashboard/payments/services-panel";
import { getPaymentServices } from "@/services";

const ServicesSummary = async () => {
  const services = await getPaymentServices();

  return (
    <>
      <ServicesSearchForm />
      <ServicesPanel services={services} />
    </>
  );
};

export default ServicesSummary;
