import React from "react";
import { ActivitySearchForm } from "@/components/dashboard/activity-search-form";
import { ActivityPanel } from "@/components/dashboard/activity-panel";
import { auth } from "@/auth";
import { getAccountActivity } from "@/services";

const ActivitySummary = async () => {
  const session = await auth();

  const activity = await getAccountActivity(
    session!.user.accountId,
    session!.user.token,
    {
      sortByDate: "desc",
      limit: 10,
    },
  );

  return (
    <>
      <ActivitySearchForm />
      <ActivityPanel activity={activity} />
    </>
  );
};

export default ActivitySummary;
