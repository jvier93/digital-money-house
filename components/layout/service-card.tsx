import React from "react";

type ServiceCardProps = {
  title: string;
  description: string;
};

const ServiceCard = ({ title, description }: ServiceCardProps) => {
  return (
    <div className="mx-auto max-w-xl rounded-3xl bg-white p-4 md:p-8 xl:mx-0">
      <h2 className="heading-1 border-accent border-b-2 pb-2 md:text-3xl">
        {title}
      </h2>
      <p className="text-body-1 pt-2 md:text-xl">{description}</p>
    </div>
  );
};

export default ServiceCard;
