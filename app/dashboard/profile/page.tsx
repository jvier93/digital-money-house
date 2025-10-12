import CurrentPageBreadcrumb from "@/components/dashboard/current-page-breadcrumb";
import UserProfileForm from "@/components/dashboard/profile/user-profile-form";
import { getUserDetails, getAccountData } from "@/services";
import React from "react";
import { auth } from "@/auth";
import UserInfoClipboard from "@/components/dashboard/profile/user-info-clipboard";
import Button from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const page = async () => {
  const session = await auth();
  const userProfile = await getUserDetails(
    session!.user.id,
    session!.user.token,
  );
  const accountData = await getAccountData(session!.user.token);

  return (
    <main className="bg-light flex-1 space-y-4 p-4 md:px-10 md:py-20 lg:px-20">
      <CurrentPageBreadcrumb
        currentPageTitle="Perfil"
        href="/dashboard/profile"
      />
      <UserProfileForm
        email={userProfile.email}
        firstName={userProfile.firstname}
        lastName={userProfile.lastname}
        phone={userProfile.phone}
        dni={userProfile.dni}
      />
      <Button
        variant="accent"
        size="lg"
        className="!justify-between"
        icon={<ArrowRight />}
        href="/dashboard/deposit"
      >
        Gestioná los medios de pago
      </Button>
      <UserInfoClipboard alias={accountData.alias} cvu={accountData.cvu} />
    </main>
  );
};

export default page;
