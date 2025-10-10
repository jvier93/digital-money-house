"use client";

import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CardType, ServiceDetail, Transaction } from "@/services";
import { payServiceAction } from "@/actions";
import { toast } from "sonner";
import AccountNumberStep from "./account-number-step";
import PaymentSelectCardStep from "./payment-select-card-step";
import PaymentSuccessStep from "./payment-success-step";
import PaymentErrorStep from "./payment-error-step";
type PaymentStep = "account-number" | "select-card" | "success" | "error";

// Hardcoded account number for validation
const VALID_ACCOUNT_NUMBER = "1234567890123456";



const paymentSchema = z.object({
  accountNumber: z
    .string()
    .regex(/^\d{16}$/, "El número de cuenta debe tener 16 dígitos"),
  cardId: z.number().min(1, "Debe seleccionar una tarjeta"),
});

export type PaymentFormValues = z.infer<typeof paymentSchema>;

type Props = {
  service: ServiceDetail;
  cards: CardType[];
};

type ErrorType = "account-validation" | "transaction-error";

export default function ServicePaymentFlow({ service, cards }: Props) {
  const [step, setStep] = useState<PaymentStep>("account-number");
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [errorType, setErrorType] = useState<ErrorType | null>(null);
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const {
    control,
    watch,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { accountNumber: "", cardId: 0 },
  });

  const watchedValues = watch();

  const handleAccountNumberNext = (e: FormEvent) => {
    e.preventDefault();
    if (watchedValues.accountNumber.length === 16) {
      // Validate account number
      if (watchedValues.accountNumber !== VALID_ACCOUNT_NUMBER) {
        setErrorType("account-validation");
        setStep("error");
      } else {
        setStep("select-card");
      }
    }
  };

  const handleCardSelection = (card: CardType) => {
    setSelectedCard(card);
    setValue("cardId", card.id);
  };

  const handlePayment = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await payServiceAction({
        amount: parseFloat(service.invoice_value),
        serviceName: service.name,
      });
      
      setTransaction(result.transaction);
      setStep("success");
      toast.success("Pago realizado exitosamente");
    } catch (error) {
      setErrorType("transaction-error");
      setStep("error");
      toast.error(
        error instanceof Error
          ? error.message
          : "Error al procesar el pago"
      );
    }
  };

  const handleRetry = () => {
    if (errorType === "account-validation") {
      setStep("account-number");
    } else if (errorType === "transaction-error") {
      setStep("select-card");
    }
    setErrorType(null);
  };

  const renderStep = () => {
    switch (step) {
      case "account-number":
        return (
          <AccountNumberStep
            control={control}
            setFocus={setFocus}
            errors={errors}
            accountNumber={watchedValues.accountNumber}
            onNext={handleAccountNumberNext}
            serviceName={service.name}
          />
        );
      case "select-card":
        return (
          <PaymentSelectCardStep
            cards={cards}
            selectedCard={selectedCard}
            onCardSelection={handleCardSelection}
            onPayment={handlePayment}
            serviceName={service.name}
            service={service}
          />
        );
      case "success":
        return transaction && selectedCard ? (
          <PaymentSuccessStep transaction={transaction} selectedCard={selectedCard} />
        ) : null;
      case "error":
        return (
          <PaymentErrorStep
            errorType={errorType}
            onRetry={handleRetry}
            serviceName={service.name}
          />
        );
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}
