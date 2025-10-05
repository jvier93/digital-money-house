import Container from "@/components/ui/container";
import Button from "@/components/ui/button";
import { type Service } from "@/services";

type ServiceItemProps = {
  service: Service;
};

export function ServiceItem({ service }: ServiceItemProps) {
  return (
    <Container.Item>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <span className="text-body-1">{service.name}</span>
        </div>
        <Button
          className="!text-btn-1"
          href={`/dashboard/payments/${service.id}`}
          variant="outline"
          size="sm"
          fullWidth={false}
          data-testid={`select-service-${service.id}`}
        >
          Seleccionar
        </Button>
      </div>
    </Container.Item>
  );
}
