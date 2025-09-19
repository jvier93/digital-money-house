import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

type SuccessStepProps = {
  amount: number;
};

export default function SuccessStep({ amount }: SuccessStepProps) {
  return (
    <div className="space-y-4">
      {/* Success message card */}
      <div className="bg-accent rounded-xl p-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <CheckCircle className="text-primary h-6 w-6" />
          <span className="text-primary text-btn-2 font-semibold">
            Ya cargaste dinero en tu cuenta
          </span>
        </div>
      </div>

      {/* Details card */}
      <Card>
        <Card.Header>
          <h3 className="heading-3 text-white">Carga exitosa</h3>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-body-1 text-white">Cargaste:</span>
              <span className="text-body-1 font-semibold text-white">
                ${amount.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-body-1 text-white">Para:</span>
              <span className="text-body-1 text-white">Cuenta propia</span>
            </div>

            <div className="flex justify-between">
              <span className="text-body-1 text-white">Fecha:</span>
              <span className="text-body-1 text-white">
                {new Date().toLocaleDateString("es-AR")}
              </span>
            </div>
          </div>
        </Card.Content>
        <Card.Footer>
          <div className="flex gap-4">
            <Button variant="accent" href="/dashboard" className="flex-1">
              Ir al inicio
            </Button>
            <Button
              variant="outline"
              href="/dashboard/activity"
              className="flex-1"
            >
              Ver actividad
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
