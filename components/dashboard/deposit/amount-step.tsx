"use client";

import { Control, FieldErrors } from "react-hook-form";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { FormEvent, useEffect } from "react";
import { ControlledInputField } from "@/components/ui/controlled-input-field";
import { DepositFormValues } from "./deposit-card-flow";
import clsx from "clsx";

type AmountStepProps = {
  control: Control<DepositFormValues>;
  errors: FieldErrors<DepositFormValues>;
  amount: number;
  setFocus: (name: keyof DepositFormValues) => void;
  onNext: (e: FormEvent) => void;
};

export default function AmountStep({
  control,
  errors,
  amount,
  setFocus,
  onNext,
}: AmountStepProps) {
  useEffect(() => {
    setFocus("amount");
  }, [setFocus]);

  return (
    <form onSubmit={onNext}>
      <Card>
        <Card.Header>
          <h2 className="heading-2 text-accent">
            ¿Cuánto querés ingresar a la cuenta?
          </h2>
        </Card.Header>
        <Card.Content>
          <ControlledInputField
            name="amount"
            label="$0"
            type="number"
            control={control}
            className="max-w-full lg:max-w-xs"
            error={errors.amount?.message}
          />
        </Card.Content>
        <Card.Footer className="lg:flex lg:justify-end">
          <Button
            type="submit"
            variant={amount > 0 ? "accent" : "gray"}
            className={clsx(
              amount >= 0 ? "cursor-not-allowed" : "",
              "!hidden md:!block md:w-full lg:w-auto lg:px-12",
            )}
            data-testid="amount-continue-button-desktop"
          >
            Continuar
          </Button>
        </Card.Footer>
      </Card>
      <div className="mt-4 flex justify-end">
        <Button
          type="submit"
          fullWidth={false}
          variant={amount > 0 ? "accent" : "gray"}
          className={"md:hidden"}
          data-testid="amount-continue-button-mobile"
        >
          Continuar
        </Button>
      </div>
    </form>
  );
}
