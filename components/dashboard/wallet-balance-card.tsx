"use client";

import React from "react";
import Card from "@/components/ui/card";
import Link from "next/link";

type WalletBalanceCardProps = {
  ammount: number;
};

const WalletBalanceCard = ({ ammount }: WalletBalanceCardProps) => {
  return (
    <Card>
      <Card.Header>
        <div className="flex w-full justify-end gap-2">
          <Link href="/dashboard" className="text-xs font-normal underline">
            Ver tarjetas
          </Link>
          <Link
            href="/dashboard"
            className="text-normal text-xs font-normal underline"
          >
            Ver CVU
          </Link>
        </div>
      </Card.Header>
      <Card.Content>
        <div className="space-y-2">
          <span className="text-body-1 block">Dinero disponible</span>
          <div className="border-accent heading-1 w-fit rounded-full border-1 px-4 py-2">
            {new Intl.NumberFormat("es-AR", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              currencyDisplay: "narrowSymbol",
            }).format(Math.abs(ammount))}
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default WalletBalanceCard;
