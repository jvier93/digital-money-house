"use client";

import { Control, FieldErrors } from "react-hook-form";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { FormEvent, useEffect } from "react";
import { ControlledInputField } from "@/components/ui/controlled-input-field";
import { PaymentFormValues } from "./service-payment-flow";
import clsx from "clsx";

type AccountNumberStepProps = {
  control: Control<PaymentFormValues>;
  errors: FieldErrors<PaymentFormValues>;
  accountNumber: string;
  setFocus: (name: keyof PaymentFormValues) => void;
  onNext: (e: FormEvent) => void;
  serviceName: string;
};

export default function AccountNumberStep({
  control,
  errors,
  accountNumber,
  setFocus,
  onNext,
}: AccountNumberStepProps) {
  useEffect(() => {
    setFocus("accountNumber");
  }, [setFocus]);

  const isValidLength = accountNumber.length === 16;

  return (
    <form onSubmit={onNext}>
      <Card>
        <Card.Header>
          <h2 className="heading-2 text-accent">
            Número de cuenta sin el primer 2
          </h2>
        </Card.Header>
        <Card.Content>
          <ControlledInputField
            name="accountNumber"
            label="Número de cuenta (16 dígitos)"
            type="text"
            control={control}
            className="max-w-full lg:max-w-xs"
            error={errors.accountNumber?.message}
            maxLenght={16}
          />
        </Card.Content>
        <Card.Footer className="lg:flex lg:justify-end">
          <Button
            type="submit"
            variant={isValidLength ? "accent" : "gray"}
            className={clsx(
              !isValidLength ? "cursor-not-allowed" : "",
              "!hidden md:!block md:w-full lg:w-auto lg:px-12",
            )}
            data-testid="account-number-continue-button-desktop"
          >
            Continuar
          </Button>
        </Card.Footer>
      </Card>
      <div className="mt-4 flex justify-end">
        <Button
          type="submit"
          fullWidth={false}
          variant={isValidLength ? "accent" : "gray"}
          className={clsx(
            !isValidLength ? "cursor-not-allowed" : "",
            "md:hidden",
          )}
          data-testid="account-number-continue-button-mobile"
        >
          Continuar
        </Button>
      </div>
    </form>
  );
}
