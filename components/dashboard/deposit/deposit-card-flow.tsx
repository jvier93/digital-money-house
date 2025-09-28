"use client";

import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CardType, Transaction } from "@/services";
import { depositMoneyAction } from "@/actions";
import { toast } from "sonner";
import SelectCardStep from "./select-card-step";
import AmountStep from "./amount-step";
import ConfirmStep from "./confirm-step";
import SuccessStep from "./success-step";

type DepositStep = "select-card" | "amount" | "confirm" | "success";

const depositSchema = z.object({
  cardId: z.number().min(1, "Debe seleccionar una tarjeta"),
  amount: z.number().min(1, "El monto debe ser mayor a 0"),
});

export type DepositFormValues = z.infer<typeof depositSchema>;

type Props = {
  cards: CardType[];
  cvu: string;
};

export default function DepositCardFlow({ cards, cvu }: Props) {
  const [step, setStep] = useState<DepositStep>("select-card");
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const {
    control,
    watch,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<DepositFormValues>({
    resolver: zodResolver(depositSchema),
    defaultValues: { cardId: 0, amount: 0 },
  });

  const watchedValues = watch();

  const handleSelectCardNext = (card: CardType) => {
    setSelectedCard(card);
    setValue("cardId", card.id);
    setStep("amount");
  };

  const handleAmountNext = (e: FormEvent) => {
    e.preventDefault();
    if (watchedValues.amount > 0) {
      setStep("confirm");
    }
  };

  const handleConfirm = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await depositMoneyAction(watchedValues);
      setTransaction(result.transaction);
      setStep("success");
      toast.success("Depósito realizado exitosamente");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error al realizar el depósito",
      );
    }
  };

  const renderStep = () => {
    switch (step) {
      case "select-card":
        return <SelectCardStep cards={cards} onNext={handleSelectCardNext} />;
      case "amount":
        return (
          <AmountStep
            control={control}
            setFocus={setFocus}
            errors={errors}
            amount={watchedValues.amount}
            onNext={handleAmountNext}
          />
        );
      case "confirm":
        return (
          <ConfirmStep
            amount={watchedValues.amount}
            selectedCard={selectedCard}
            onConfirm={handleConfirm}
            cvu={cvu}
            onBack={() => setStep("amount")}
          />
        );
      case "success":
        return transaction ? <SuccessStep transaction={transaction} /> : null;
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}
