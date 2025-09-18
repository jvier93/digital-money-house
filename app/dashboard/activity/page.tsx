import React from "react";
import CurrentPageBreadcrumb from "@/components/dashboard/current-page-breadcrumb";
import { InteractiveActivityPanel } from "@/components/dashboard/activity/interactive-activity-panel";
import { getAccountActivity } from "@/services";
import { auth } from "@/auth";

const ActivityPage = async () => {
  const session = await auth();

  const activity = await getAccountActivity(
    session!.user.accountId,
    session!.user.token,
    {
      sortByDate: "desc",
    },
  );

  return (
    <main className="bg-light flex-1 space-y-4 p-4 md:px-10 lg:px-20">
      <CurrentPageBreadcrumb
        currentPageTitle="Tu actividad"
        href="/dashboard/activity"
      />
      <InteractiveActivityPanel initialActivity={activity} />
    </main>
  );
};

export default ActivityPage;
