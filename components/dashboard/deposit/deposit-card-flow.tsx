"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/services";
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
  cards: Card[];
};

export default function DepositCardFlow({ cards }: Props) {
  const [step, setStep] = useState<DepositStep>("select-card");
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DepositFormValues>({
    resolver: zodResolver(depositSchema),
    defaultValues: { cardId: 0, amount: 0 },
  });

  const watchedValues = watch();

  const handleSelectCard = (card: Card) => {
    setSelectedCard(card);
    setValue("cardId", card.id);
    setStep("amount");
  };

  const handleAmountNext = () => {
    if (watchedValues.amount > 0) {
      setStep("confirm");
    }
  };

  const handleConfirm = async () => {
    try {
      await depositMoneyAction(watchedValues);
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
        return <SelectCardStep cards={cards} onSelectCard={handleSelectCard} />;
      case "amount":
        return (
          <AmountStep
            control={control}
            errors={errors}
            amount={watchedValues.amount}
            onNext={handleAmountNext}
            onBack={() => setStep("select-card")}
          />
        );
      case "confirm":
        return (
          <ConfirmStep
            amount={watchedValues.amount}
            selectedCard={selectedCard}
            onConfirm={handleConfirm}
            onBack={() => setStep("amount")}
          />
        );
      case "success":
        return <SuccessStep amount={watchedValues.amount} />;
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}
