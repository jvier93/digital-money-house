import React from "react";
import { auth } from "@/auth";
import { getAccountCards, getAccountData } from "@/services";
import CurrentPageBreadcrumb from "@/components/dashboard/current-page-breadcrumb";
import DepositCardFlow from "@/components/dashboard/deposit/deposit-card-flow";

const DepositCardPage = async () => {
  const session = await auth();

  const cards = await getAccountCards(
    session!.user.accountId,
    session!.user.token,
  );
  const token = session!.user.token;
  const cvu = (await getAccountData(token)).cvu;

  return (
    <main className="bg-light flex-1 space-y-4 p-4 md:px-10 md:py-20 lg:px-20">
      <CurrentPageBreadcrumb
        currentPageTitle="Cargar dinero"
        href="/dashboard/deposit"
      />
      <DepositCardFlow cvu={cvu} cards={cards} />
    </main>
  );
};

export default DepositCardPage;
