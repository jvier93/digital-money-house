"use client";

import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import { ArrowRight, CirclePlus } from "lucide-react";

export default function AddCardSection() {
  return (
    <Card>
      <Card.Header>
        <h2 className="heading-3 text-white">
          Agregá tu tarjeta de débito o crédito
        </h2>
      </Card.Header>
      <Card.Content>
        <Button
          href="/dashboard/cards/new"
          variant="primary"
          size="xl"
          className={`!text-accent !justify-between`}
          icon={<ArrowRight className="h-8 w-8"></ArrowRight>}
        >
          <div className="flex gap-2">
            <CirclePlus className="h-8 w-8" />
            <span className="heading-2">Nueva tarjeta</span>
          </div>
        </Button>
      </Card.Content>
    </Card>
  );
}
