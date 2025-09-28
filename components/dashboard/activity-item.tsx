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
    <Container.Item>
      <Link href={`/dashboard/activity/${transaction.id}`} data-testid="transaction-item">
        <div className="text-body-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Container.GreenIndicator />
            <p data-testid="transaction-description">{transaction.description}</p>
          </div>
          <div className="text-right">
            <p data-testid="transaction-amount">{formatCurrency(transaction.amount)}</p>
            <p className="text-primary/50 capitalize" data-testid="transaction-date">
              {getDayName(transaction.dated)}
            </p>
          </div>
        </div>
      </Link>
    </Container.Item>
  );
}
