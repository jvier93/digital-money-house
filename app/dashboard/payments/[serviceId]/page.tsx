import React from "react";
import { auth } from "@/auth";
import { getAccountCards, getPaymentServiceById } from "@/services";
import CurrentPageBreadcrumb from "@/components/dashboard/current-page-breadcrumb";
import ServicePaymentFlow from "@/components/dashboard/payments/service-payment-flow";

type Props = {
  params: {
    serviceId: string;
  };
};

const Page = async ({ params }: Props) => {
  const session = await auth();
  const { serviceId } = await params;

  const serviceDetail = await getPaymentServiceById(parseInt(serviceId));
  const cards = await getAccountCards(
    session!.user.accountId,
    session!.user.token,
  );

  return (
    <main className="bg-light flex-1 space-y-4 p-4 md:px-10 md:py-20 lg:px-20">
      <CurrentPageBreadcrumb
        currentPageTitle={`Pagar servicios`}
        href="/dashboard/payments"
      />
      <ServicePaymentFlow service={serviceDetail} cards={cards} />
    </main>
  );
};

export default Page;
