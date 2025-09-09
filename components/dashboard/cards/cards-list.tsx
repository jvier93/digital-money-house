"use client";

import Container from "@/components/ui/container";
import { Card } from "@/services";
import { deleteCardAction } from "@/actions";
import { toast } from "sonner";
import Button from "@/components/ui/button";

type CardsListProps = {
  cards: Card[];
};

export default function CardsList({ cards }: CardsListProps) {
  const handleDeleteCard = async (cardId: number) => {
    try {
      await deleteCardAction(cardId);
      toast.success("Tarjeta eliminada exitosamente");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error al eliminar la tarjeta",
      );
    }
  };

  return (
    <div className="py-2">
      <Container>
        <Container.Header>Tus tarjetas</Container.Header>
        <Container.Content>
          {cards.length === 0 ? (
            <Container.Item>
              <span className="text-primary text-body-1">
                Aún no hay tarjetas agregadas
              </span>
            </Container.Item>
          ) : (
            cards.map((card, index) => (
              <Container.Item
                key={card.id}
                className={index === cards.length - 1 ? "border-b-0" : ""}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Container.GreenIndicator />
                    <span className="text-primary text-body-1">
                      Terminada en {card.number_id.toString().slice(-4)}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleDeleteCard(card.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </Container.Item>
            ))
          )}
        </Container.Content>
        <Container.Footer>
          *Se permiten un máximo de 10 tarjetas por usuario.
        </Container.Footer>
      </Container>
    </div>
  );
}
