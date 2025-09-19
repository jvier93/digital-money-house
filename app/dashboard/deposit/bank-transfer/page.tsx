import React from "react";
import CurrentPageBreadcrumb from "@/components/dashboard/current-page-breadcrumb";
import { getAccountData } from "@/services";
import { auth } from "@/auth";
import UserInfoClipboard from "@/components/dashboard/profile/user-info-clipboard";

const BankTransferPage = async () => {
  const session = await auth();
  const accountData = await getAccountData(session!.user.token);

  return (
    <main className="bg-light flex-1 space-y-4 p-4 md:px-10 md:py-20 lg:px-20">
      <CurrentPageBreadcrumb
        currentPageTitle="Transferencia bancaria"
        href="/dashboard/deposit"
      />
      <UserInfoClipboard alias={accountData.alias} cvu={accountData.cvu} />
    </main>
  );
};

export default BankTransferPage;
