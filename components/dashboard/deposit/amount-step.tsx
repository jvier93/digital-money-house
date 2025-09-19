import { Control, FieldErrors } from "react-hook-form";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { ControlledInputField } from "@/components/ui/controlled-input-field";
import { DepositFormValues } from "./deposit-card-flow";

type AmountStepProps = {
  control: Control<DepositFormValues>;
  errors: FieldErrors<DepositFormValues>;
  amount: number;
  onNext: () => void;
  onBack: () => void;
};

export default function AmountStep({
  control,
  errors,
  amount,
  onNext,
  onBack,
}: AmountStepProps) {
  return (
    <Card>
      <Card.Header>
        <h3 className="heading-3 text-white">
          ¿Cuánto querés ingresar a la cuenta?
        </h3>
      </Card.Header>
      <Card.Content>
        <ControlledInputField
          name="amount"
          label="$"
          type="number"
          control={control}
          error={errors.amount?.message}
        />
      </Card.Content>
      <Card.Footer>
        <div className="flex gap-4">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Volver
          </Button>
          <Button
            onClick={onNext}
            variant={amount > 0 ? "accent" : "light"}
            disabled={amount <= 0}
            className="flex-1"
          >
            Continuar
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
}
