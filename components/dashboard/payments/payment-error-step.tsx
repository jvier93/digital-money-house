import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { XCircle } from "lucide-react";

type ErrorType = "account-validation" | "transaction-error";

type PaymentErrorStepProps = {
  errorType: ErrorType | null;
  onRetry: () => void;
  serviceName: string;
};

export default function PaymentErrorStep({
  errorType,
  onRetry,
  serviceName,
}: PaymentErrorStepProps) {
  const getErrorMessage = () => {
    switch (errorType) {
      case "account-validation":
        return `No encontramos facturas de ${serviceName} asociadas a este dato`;
      case "transaction-error":
        return `Hubo un problema con tu pago de ${serviceName}`;
      default:
        return "Ocurrió un error inesperado";
    }
  };

  const getErrorDescription = () => {
    switch (errorType) {
      case "account-validation":
        return "Revisá el dato ingresado. Si es correcto, es posible que la empresa aún no haya cargado tu factura.";
      case "transaction-error":
        return "Puede deberse a fondos insuficientes Comunicate con la entidad emisora de la tarjeta";
      default:
        return "Por favor, intentá nuevamente.";
    }
  };

  const getButtonText = () => {
    switch (errorType) {
      case "account-validation":
        return "Revisar dato";
      default:
        return "Volver a intentarlo";
    }
  };

  return (
    <div className="space-y-4">
      <Card
        className="!bg-primary flex items-center justify-center"
        data-testid="payment-success-card"
      >
        <Card.Content className="space-y-2">
          <XCircle
            className="text-error h-8 w-full"
            data-testid="payment-success-icon"
          />
          <h2
            className="heading-2 text-light text-center"
            data-testid="payment-success-title"
          >
            {getErrorMessage()}
          </h2>
          <div className="border-gray border-t pt-2">
            <p className="text-gray text-body-2 text-center">
              {getErrorDescription()}
            </p>
          </div>
        </Card.Content>
      </Card>
      <div className="mt-4 flex justify-end">
        <Button
          onClick={onRetry}
          type="button"
          fullWidth={false}
          variant={"accent"}
          className={"md:hidden"}
          data-testid="account-number-continue-button-mobile"
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
}
