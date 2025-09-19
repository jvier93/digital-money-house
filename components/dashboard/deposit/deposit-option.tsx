"use client";

import React from "react";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type DepositOptionProps = {
  href: string;
  icon: React.ReactNode;
  title: string;
  className?: string;
};

const DepositOption = ({
  href,
  icon,
  title,
  className = "",
}: DepositOptionProps) => {
  return (
    <Card>
      <Card.Content>
        <Button
          href={href}
          variant="primary"
          size="xl"
          className={`!text-accent !justify-between !gap-20 shadow-none md:py-10 ${className}`}
          icon={<ArrowRight className="text-accent" />}
        >
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">{icon}</div>
            <div className="flex-1">{title}</div>
          </div>
        </Button>
      </Card.Content>
    </Card>
  );
};

export default DepositOption;
