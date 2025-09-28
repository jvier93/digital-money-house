import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { formatCurrency } from "@/utils";
import { parseISO, format } from "date-fns";
import { es } from "date-fns/locale";
import { Transaction } from "@/services";
import DepositSuccessActions from "../deposit-success-actions";

type SuccessStepProps = {
  transaction: Transaction;
};

export default function SuccessStep({ transaction }: SuccessStepProps) {
  console.log(transaction);

  return (
    <div className="space-y-4">
      <Card
        className="!bg-accent flex items-center justify-center"
        data-testid="success-card"
      >
        <Card.Content className="space-y-2">
          <CheckCircle
            className="text-primary h-8 w-full"
            data-testid="success-icon"
          />
          <h3 className="heading-3 text-primary" data-testid="success-title">
            Ya cargamos el dinero en tu cuenta
          </h3>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>
          <h2 className="heading-2 text-accent md:hidden">
            Detalles de la transacción
          </h2>
        </Card.Header>
        <Card.Content className="border-secondary text-body-1 space-y-4 border-t px-2 pt-2 md:border-0">
          <p className="text-gray text-body-2" data-testid="success-date">
            {" "}
            {format(
              parseISO(transaction.dated),
              "d 'de' MMMM yyyy 'a' HH:mm 'hs.'",
              { locale: es },
            )}
          </p>

          <p className="heading-2 text-accent" data-testid="success-amount">
            {formatCurrency(transaction.amount)}
          </p>

          <div>
            <p className="text-gray text-body-2">Para</p>
            <p className="text-accent heading-2">Cuenta propia</p>
          </div>

          <div>
            <p className="text-gray text-body-1">Brubank</p>
            <p data-testid="success-cvu">CVU {transaction.destination}</p>
          </div>
        </Card.Content>
        <Card.Footer>{""}</Card.Footer>
      </Card>
      <DepositSuccessActions />
    </div>
  );
}
