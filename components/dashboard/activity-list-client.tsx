"use client";

import List from "@/components/ui/list";
import { Transaction } from "@/services";
import { getDayName } from "@/utils";

type ActivityListClientProps = {
  activity: Transaction[];
};

export function ActivityListClient({ activity }: ActivityListClientProps) {
  return (
    <List>
      <List.Header>Tu actividad</List.Header>

      <List.Content>
        {activity.map((item) => (
          <List.Item key={item.id}>
            <div className="text-body-1 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <List.GreenIndicator />
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
          </List.Item>
        ))}
      </List.Content>

      <List.Footer>
        <List.LinkWithArrow href="/dashboard/activity">
          Ver toda tu actividad
        </List.LinkWithArrow>
      </List.Footer>
    </List>
  );
}
