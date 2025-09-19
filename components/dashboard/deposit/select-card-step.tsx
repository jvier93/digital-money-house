import Container from "@/components/ui/container";
import Button from "@/components/ui/button";
import { Card } from "@/services";

type SelectCardStepProps = {
  cards: Card[];
  onSelectCard: (card: Card) => void;
};

export default function SelectCardStep({
  cards,
  onSelectCard,
}: SelectCardStepProps) {
  return (
    <Container>
      <Container.Header>Seleccionar tarjeta</Container.Header>
      <Container.Content>
        {cards.length === 0 ? (
          <Container.Item>
            <span className="text-primary text-body-1">
              No tienes tarjetas agregadas
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
                  variant="accent"
                  size="sm"
                  onClick={() => onSelectCard(card)}
                >
                  Seleccionar
                </Button>
              </div>
            </Container.Item>
          ))
        )}
      </Container.Content>
    </Container>
  );
}
