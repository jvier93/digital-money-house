"use client";

import Container from "@/components/ui/container";
import { Transaction } from "@/services";
import { getDayName } from "@/utils";

type ActivityPanelProps = {
  activity: Transaction[];
};

export function ActivityPanel({ activity }: ActivityPanelProps) {
  return (
    <Container>
      <Container.Header>Tu actividad</Container.Header>

      <Container.Content>
        {activity.map((item) => (
          <Container.Item key={item.id}>
            <div className="text-body-1 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Container.GreenIndicator />
                <p>{item.description}</p>
              </div>
              <div className="text-right">
                <p>
                  {item.amount >= 0 ? "" : "-"}
                  {new Intl.NumberFormat("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    currencyDisplay: "narrowSymbol",
                  }).format(Math.abs(item.amount))}
                </p>

                <p className="text-primary/50 capitalize">
                  {getDayName(item.dated)}
                </p>
              </div>
            </div>
          </Container.Item>
        ))}
      </Container.Content>

      <Container.Footer>
        <Container.LinkWithArrow href="/dashboard/activity">
          Ver toda tu actividad
        </Container.LinkWithArrow>
      </Container.Footer>
    </Container>
  );
}
