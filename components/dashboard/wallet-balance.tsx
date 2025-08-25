import React from "react";
import WalletBalanceCard from "@/components/dashboard/wallet-balance-card";
import { auth } from "@/auth";
import { getAccountData } from "@/services";

const WalletBalance = async () => {
  const session = await auth();
  const accountData = await getAccountData(session!.user.token);

  return (
    <div>
      <WalletBalanceCard ammount={accountData.available_amount} />
    </div>
  );
};

export default WalletBalance;
