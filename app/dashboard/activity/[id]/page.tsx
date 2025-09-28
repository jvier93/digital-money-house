import React from "react";
import CurrentPageBreadcrumb from "@/components/dashboard/current-page-breadcrumb";
import { auth } from "@/auth";
import ActivityCard from "@/components/dashboard/activity-card";
import Button from "@/components/ui/button";
import { getTransactionById } from "@/services";
import { notFound } from "next/navigation";
import DepositSuccessActions from "@/components/dashboard/deposit-success-actions";

type ActivityPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const ActivityPage = async ({ params }: ActivityPageProps) => {
  const session = await auth();

  if (!session?.user.accountId || !session?.user.token) {
    return notFound();
  }

  const { id } = await params;
  const transactionId = parseInt(id);

  if (isNaN(transactionId)) {
    return notFound();
  }

  try {
    const transaction = await getTransactionById(
      session.user.accountId,
      transactionId,
      session.user.token,
    );

    return (
      <main className="bg-light flex-1 space-y-4 p-4 md:px-10 md:py-20 lg:px-20">
        <CurrentPageBreadcrumb
          currentPageTitle="Tu actividad"
          href="/dashboard/activity"
        />
        <ActivityCard transaction={transaction} />
        <DepositSuccessActions />
      </main>
    );
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return notFound();
  }
};

export default ActivityPage;
