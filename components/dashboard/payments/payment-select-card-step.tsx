"use client";

import Container from "@/components/ui/container";
import Button from "@/components/ui/button";
import { CardType, ServiceDetail } from "@/services";
import Card from "@/components/ui/card";
import { CirclePlus } from "lucide-react";
import { FormEvent, useState } from "react";
import clsx from "clsx";
import { formatCurrency } from "@/utils";

type PaymentSelectCardStepProps = {
  cards: CardType[];
  selectedCard: CardType | null;
  onCardSelection: (card: CardType) => void;
  onPayment: (e: FormEvent) => void;
  serviceName: string;
  service: ServiceDetail;
};

export default function PaymentSelectCardStep({
  cards,
  selectedCard,
  onCardSelection,
  onPayment,
  serviceName,
  service,
}: PaymentSelectCardStepProps) {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(
    selectedCard?.id || null,
  );

  const handleCardSelection = (card: CardType) => {
    setSelectedCardId(card.id);
    onCardSelection(card);
  };

  const handlePayment = (e: FormEvent) => {
    e.preventDefault();
    if (selectedCard) {
      onPayment(e);
    }
  };

  return (
    <form onSubmit={handlePayment} className="flex h-full flex-col">
      <div className="flex-1 space-y-4">
        <Card>
          <Card.Header>
            <h2 className="heading-2 text-accent">{serviceName}</h2>
          </Card.Header>
          <Card.Content className="border-gray text-light heading-3 flex justify-between border-t pt-2">
            <span>Total a pagar: </span>
            <span>{formatCurrency(Number(service.invoice_value))} </span>
          </Card.Content>
          <Card.Footer>
            <Button
              href="/dashboard/cards/new"
              variant="primary"
              size="xl"
              fullWidth={false}
              className={`!text-accent`}
            >
              <CirclePlus className="h-6 w-6" />
              <span className="heading-3">Nueva tarjeta</span>
            </Button>
          </Card.Footer>
        </Card>
        <Container>
          <Container.Header>Tus tarjetas</Container.Header>
          <Container.Content>
            {cards.length === 0 ? (
              <Container.Item>
                <span className="text-primary text-body-1">
                  No tienes tarjetas agregadas
                </span>
              </Container.Item>
            ) : (
              cards.map((card) => (
                <Container.Item
                  key={card.id}
                  className={"cursor-pointer"}
                  data-testid="payment-card-item"
                >
                  <label className="flex cursor-pointer items-center justify-between py-3">
                    <div className="flex items-center gap-4">
                      <Container.GreenIndicator />
                      <span className="text-primary text-body-1">
                        Terminada en {card.number_id.toString().slice(-4)}
                      </span>
                    </div>
                    <input
                      type="radio"
                      name="cardSelection"
                      value={card.id}
                      checked={selectedCardId === card.id}
                      onChange={() => handleCardSelection(card)}
                      className="text-primary focus:ring-primary border-light h-4 w-4 cursor-pointer"
                      data-testid={`payment-card-radio-${card.id}`}
                    />
                  </label>
                </Container.Item>
              ))
            )}
          </Container.Content>
          <Container.Footer showBorder={false}></Container.Footer>
        </Container>
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          type="submit"
          variant={selectedCardId === null ? "gray" : "accent"}
          size="md"
          fullWidth={false}
          className={clsx(
            selectedCardId === null ? "cursor-not-allowed" : "",
            "!px-10 md:!px-12",
          )}
          data-testid="pay-button-mobile"
        >
          Pagar
        </Button>
      </div>
    </form>
  );
}
