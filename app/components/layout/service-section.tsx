import React from "react";
import ServiceCard from "@/app/components/layout/service-card";

const ServicesSection = () => {
  const services = [
    {
      title: "Transferí dinero",
      description:
        "Desde Digital Money House vas a poder transferir dinero a otras cuentas, así como también recibir transferencias y nuclear tu capital en nuestra billetera virtual.",
    },
    {
      title: "Pago de servicios",
      description:
        "Pagá mensualmente los servicios en 3 simples clicks. Fácil, rápido y conveniente. Olvidate de las facturas en papel.",
    },
  ];

  return (
    <section className="bg-accent w-full rounded-t-3xl px-4">
      <div className="flex -translate-y-10 flex-col justify-center gap-4 xl:flex-row">
        {services.map((card) => (
          <ServiceCard
            key={card.title}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
