import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { CardType as CardType } from "@/services";
import { formatCurrency } from "@/utils";
import { SquarePen } from "lucide-react";
import { FormEvent } from "react";

type ConfirmStepProps = {
  amount: number;
  selectedCard: CardType | null;
  onConfirm: (e: FormEvent) => void;
  onBack: () => void;
  cvu: string;
};

export default function ConfirmStep({
  amount,
  cvu,
  onConfirm,
  onBack,
}: ConfirmStepProps) {
  return (
    <form onSubmit={onConfirm}>
      <Card>
        <Card.Header>
          <h2 className="heading-2 text-accent">Revisá que está todo bien</h2>
        </Card.Header>
        <Card.Content className="border-secondary text-body-1 space-y-4 border-t px-2 pt-2">
          <div>
            <div className="flex gap-2">
              <p className="text-gray text-body-2">Vas a transferir</p>
              <button
                className="cursor-pointer"
                onClick={onBack}
                data-testid="edit-amount-button"
              >
                <SquarePen className="text-accent" />
              </button>
            </div>

            <p className="heading-2" data-testid="confirm-amount">
              {formatCurrency(amount)}
            </p>
          </div>

          <div>
            <p className="text-gray text-body-2">Para</p>
            <p className="heading-2">Cuenta Propia</p>
          </div>

          <div>
            <p className="text-gray text-body-1">Brubank</p>
            <p>CVU {cvu}</p>
          </div>
        </Card.Content>
        <Card.Footer className="lg:flex lg:justify-end">
          <Button
            type="submit"
            variant={amount > 0 ? "accent" : "gray"}
            className={"!hidden md:!block md:w-full lg:w-auto lg:px-12"}
            data-testid="transfer-button-desktop"
          >
            Transferir
          </Button>
        </Card.Footer>
      </Card>
      <div className="mt-4 flex justify-end">
        <Button
          type="submit"
          fullWidth={false}
          variant={"accent"}
          className={"md:hidden"}
          data-testid="transfer-button-mobile"
        >
          Transferir
        </Button>
      </div>
    </form>
  );
}
