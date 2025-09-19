import React from "react";
import { auth } from "@/auth";
import { getAccountCards } from "@/services";
import CurrentPageBreadcrumb from "@/components/dashboard/current-page-breadcrumb";
import AddCardSection from "@/components/dashboard/cards/add-card-section";
import CardsList from "@/components/dashboard/cards/cards-list";

const page = async () => {
  const session = await auth();

  const accountCards = await getAccountCards(
    session!.user.accountId,
    session!.user.token,
  );

  return (
    <main className="bg-light flex-1 space-y-4 p-4 md:px-10 md:py-20 lg:px-20">
      <CurrentPageBreadcrumb currentPageTitle="Tarjetas" href="/dashboard" />

      <AddCardSection />

      <CardsList cards={accountCards} />
    </main>
  );
};

export default page;
