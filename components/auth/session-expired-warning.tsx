import Card from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function SessionExpiredWarning() {
  return (
    <Card className="bg-warning text-primary mb-4 w-80">
      <Card.Content className="flex items-center space-y-0">
        <AlertTriangle className="text-primary mr-3 h-5 w-5 flex-shrink-0" />
        <p className="text-body-1 text-primary">
          Tu sesión ha expirado por seguridad. Por favor, iniciá sesión
          nuevamente.
        </p>
      </Card.Content>
    </Card>
  );
}
