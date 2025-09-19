import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { Card as CardType } from "@/services";

type ConfirmStepProps = {
  amount: number;
  selectedCard: CardType | null;
  onConfirm: () => void;
  onBack: () => void;
};

export default function ConfirmStep({
  amount,
  selectedCard,
  onConfirm,
  onBack
}: ConfirmStepProps) {
  return (
    <Card>
      <Card.Header>
        <h3 className="heading-3 text-white">Revisá que está todo bien</h3>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-white text-body-1">Vas a transferir:</span>
            <span className="text-white text-body-1 font-semibold">
              ${amount.toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-white text-body-1">Para:</span>
            <span className="text-white text-body-1">Cuenta propia</span>
          </div>

          <div className="flex justify-between">
            <span className="text-white text-body-1">Desde tarjeta:</span>
            <span className="text-white text-body-1">
              Terminada en {selectedCard?.number_id.toString().slice(-4)}
            </span>
          </div>

          <div className="pt-4 border-t border-white/20">
            <div className="flex justify-between">
              <span className="text-white text-body-1">Total:</span>
              <span className="text-white text-body-1 font-semibold">
                ${amount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </Card.Content>
      <Card.Footer>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            Volver
          </Button>
          <Button 
            variant="accent"
            onClick={onConfirm}
            className="flex-1"
          >
            Confirmar
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
}