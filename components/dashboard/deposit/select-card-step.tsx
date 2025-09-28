"use client";

import Container from "@/components/ui/container";
import Button from "@/components/ui/button";
import { CardType } from "@/services";
import Card from "@/components/ui/card";
import { CirclePlus } from "lucide-react";
import { FormEvent, useState } from "react";
import clsx from "clsx";

type SelectCardStepProps = {
  cards: CardType[];
  onNext: (card: CardType) => void;
};

export default function SelectCardStep({ cards, onNext }: SelectCardStepProps) {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

  const handleCardSelection = (card: CardType) => {
    setSelectedCardId(card.id);
    setSelectedCard(card);
  };

  const handleContinue = (e: FormEvent) => {
    e.preventDefault();
    if (selectedCard) {
      onNext(selectedCard);
    }
  };

  return (
    <form onSubmit={handleContinue} className="flex h-full flex-col">
      <div className="flex-1">
        <Card>
          <Card.Header>
            <h2 className="heading-2 text-accent">Seleccionar una tarjeta</h2>
          </Card.Header>
          <Card.Content>
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
                      data-testid="card-item"
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
                          data-testid={`card-radio-${card.id}`}
                        />
                      </label>
                    </Container.Item>
                  ))
                )}
              </Container.Content>
              <Container.Footer showBorder={false}></Container.Footer>
            </Container>
          </Card.Content>
          <Card.Footer
            className={"flex flex-col gap-4 lg:flex-row lg:justify-between"}
          >
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

            <Button
              type="submit"
              variant={selectedCardId === null ? "gray" : "accent"}
              size="md"
              fullWidth={false}
              className={clsx(
                selectedCardId === null ? "cursor-not-allowed" : "",
                "!hidden md:!block md:w-full lg:w-auto lg:px-12",
              )}
              data-testid="continue-button-desktop"
            >
              Continuar
            </Button>
          </Card.Footer>
        </Card>
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          type="submit"
          variant={selectedCardId === null ? "gray" : "accent"}
          size="md"
          fullWidth={false}
          className={clsx(
            selectedCardId === null ? "cursor-not-allowed" : "",
            "md:hidden",
          )}
          data-testid="continue-button-mobile"
        >
          Continuar
        </Button>
      </div>
    </form>
  );
}
