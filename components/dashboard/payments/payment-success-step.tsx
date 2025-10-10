import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { formatCurrency } from "@/utils";
import { parseISO, format } from "date-fns";
import { es } from "date-fns/locale";
import { Transaction, CardType } from "@/services";

type PaymentSuccessStepProps = {
  transaction: Transaction;
  selectedCard: CardType;
};

export default function PaymentSuccessStep({
  transaction,
  selectedCard,
}: PaymentSuccessStepProps) {
  console.log(transaction);

  return (
    <div className="space-y-4">
      <Card
        className="!bg-accent flex items-center justify-center"
        data-testid="payment-success-card"
      >
        <Card.Content className="space-y-2">
          <CheckCircle
            className="text-primary h-8 w-full"
            data-testid="payment-success-icon"
          />
          <h3
            className="heading-3 text-primary"
            data-testid="payment-success-title"
          >
            Ya realizamos tu pago
          </h3>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content className="text-body-1 space-y-4 px-2 pt-2 md:border-0">
          <div>
            <p
              className="text-gray text-body-2"
              data-testid="payment-success-date"
            >
              {format(
                parseISO(transaction.dated),
                "d 'de' MMMM yyyy 'a' HH:mm 'hs.'",
                { locale: es },
              )}
            </p>

            <p
              className="heading-2 text-accent"
              data-testid="payment-success-amount"
            >
              {formatCurrency(transaction.amount)}
            </p>
          </div>

          <div>
            <p className="text-gray text-body-2">Para</p>
            <p className="text-accent heading-2">Cuenta propia</p>
          </div>

          <div>
            <p className="text-body-1 text-gray">Tarjeta</p>
            <p
              className="text-body-1 text-gray"
              data-testid="payment-success-origin"
            >
              Terminada en {selectedCard.number_id.toString().slice(-4)}
            </p>
          </div>
        </Card.Content>
        <Card.Footer>{""}</Card.Footer>
      </Card>

      <div className="space-y-4 md:flex md:flex-row-reverse md:gap-4 md:space-y-0">
        <Button
          href="/dashboard/payments"
          variant="accent"
          className="md:w-1/2 lg:w-60"
          data-testid="back-to-payments-button"
        >
          Volver a servicios
        </Button>
        <Button
          href="/dashboard"
          variant="gray"
          className="md:w-1/2 lg:w-60"
          data-testid="back-to-dashboard-button"
        >
          Ir al inicio
        </Button>
      </div>
    </div>
  );
}
