import { parseISO, format } from "date-fns";
import { es } from "date-fns/locale";

export function getDayName(isoString: string): string {
  const date = parseISO(isoString);
  return format(date, "EEEE", { locale: es });
}
