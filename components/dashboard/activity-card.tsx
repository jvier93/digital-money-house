"use client";

import React from "react";
import { CircleCheck } from "lucide-react";
import Card from "../ui/card";
import { Transaction } from "@/services";
import { formatCurrency } from "@/utils";

type ActivityCardProps = {
  transaction: Transaction;
};

function ActivityCard({ transaction }: ActivityCardProps) {
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return `Creada el ${date.toLocaleDateString("es-ES", options)} hs.`;
  };

  // Determine transaction type based on the description or type
  const getTransactionType = () => {
    if (
      transaction.type === "Transfer" ||
      transaction.description.toLowerCase().includes("transferencia")
    ) {
      return "Transferencia de dinero";
    }
    return transaction.description;
  };

  // Extract recipient from destination field
  const getRecipient = () => {
    return transaction.destination || "Destinatario no especificado";
  };

  return (
    <Card>
      <Card.Header>
        <div className="hidden py-4 md:block">
          <p className="text-body-1 text-light text-end">
            {formatDate(transaction.dated)}
          </p>
        </div>

        <div className="mb-2 flex items-center gap-2 px-2">
          <CircleCheck className="text-accent h-8 w-8" />
          <h2 className="text-accent heading-2">Aprobada</h2>
        </div>
      </Card.Header>

      <Card.Content>
        <div className="border-secondary text-accent text-body-1 space-y-4 border-t px-2 pt-2">
          <p className="text-body-1 text-gray md:hidden">
            {formatDate(transaction.dated)}
          </p>
          <div>
            <p className="text-gray">{getTransactionType()}</p>
            <p className="heading-2">{formatCurrency(transaction.amount)}</p>
          </div>

          <div>
            <p className="text-gray">Le transferiste a</p>
            <p className="heading-2">{getRecipient()}</p>
          </div>

          <div>
            <p className="text-gray">Número de operación</p>
            <p className="">{transaction.id}</p>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}

export default ActivityCard;
