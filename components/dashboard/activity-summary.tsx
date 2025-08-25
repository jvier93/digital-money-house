import React from "react";
import { ActivitySearchForm } from "@/components/dashboard/activity-search-form";
import { ActivityListClient } from "@/components/dashboard/activity-list-client";
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
      <ActivityListClient activity={activity} />
    </>
  );
};

export default ActivitySummary;
