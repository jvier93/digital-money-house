"use client";

import Card from "@/components/ui/card";
import { Plus, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AddCardSection() {
  return (
    <Card>
      <Card.Header>
        <h2 className="heading-3 text-white">
          Agregá tu tarjeta de débito o crédito
        </h2>
      </Card.Header>
      <Card.Content>
        <Link href="/dashboard/cards/new" className="block">
          <div className="text-accent text-btn-2 flex cursor-pointer items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-accent flex h-8 w-8 items-center justify-center rounded-full">
                <Plus className="text-primary h-4 w-4" />
              </div>
              <span>Nueva tarjeta</span>
            </div>
            <ArrowRight className="h-5 w-5" />
          </div>
        </Link>
      </Card.Content>
      <Card.Footer>{""}</Card.Footer>
    </Card>
  );
}
