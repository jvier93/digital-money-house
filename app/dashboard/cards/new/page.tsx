import NewCardForm from "@/components/dashboard/cards/new/new-card-form";
import CurrentPageBreadcrumb from "@/components/dashboard/current-page-breadcrumb";
import React from "react";

const page = () => {
  return (
    <main className="bg-light flex-1 space-y-4 p-4 md:px-10 lg:px-20">
      <CurrentPageBreadcrumb
        currentPageTitle="Tarjetas"
        href="/dashboard/cards/new"
      />

      <NewCardForm />
    </main>
  );
};

export default page;
