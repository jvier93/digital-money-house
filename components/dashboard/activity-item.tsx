"use client";

import Container from "@/components/ui/container";
import { Transaction } from "@/services";
import { getDayName, formatCurrency } from "@/utils";
import Link from "next/link";

type ActivityItemProps = {
  transaction: Transaction;
};

export function ActivityItem({ transaction }: ActivityItemProps) {
  return (
    <Link href={`/dashboard/activity/${transaction.id}`}>
      <Container.Item className="cursor-pointer">
        <div className="text-body-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Container.GreenIndicator />
            <p>{transaction.description}</p>
          </div>
          <div className="text-right">
            <p>{formatCurrency(transaction.amount)}</p>
            <p className="text-primary/50 capitalize">
              {getDayName(transaction.dated)}
            </p>
          </div>
        </div>
      </Container.Item>
    </Link>
  );
}
