import Button from "@/components/ui/button";

export default function DepositSuccessActions() {
  return (
    <div className="space-y-4 md:flex md:flex-row-reverse md:gap-4 md:space-y-0">
      <Button type="button" variant="accent" className="md:w-1/2 lg:w-60">
        Descargar comprobante
      </Button>
      <Button
        className="md:w-1/2 lg:w-60"
        type="button"
        variant="gray"
        href="/dashboard"
      >
        Ir al inicio
      </Button>
    </div>
  );
}
