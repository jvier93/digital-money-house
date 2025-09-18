import { parseISO, format } from "date-fns";
import { es } from "date-fns/locale";

export function getDayName(isoString: string): string {
  const date = parseISO(isoString);
  return format(date, "EEEE", { locale: es });
}

export function formatCurrency(
  amount: number,
  options?: {
    currency?: string;
    locale?: string;
    showSign?: boolean;
  },
): string {
  const { currency = "ARS", locale = "es-AR", showSign = true } = options || {};

  const absoluteAmount = Math.abs(amount);
  const formattedAmount = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currencyDisplay: "narrowSymbol",
  }).format(absoluteAmount);

  if (showSign && amount < 0) {
    return `-${formattedAmount}`;
  }

  return formattedAmount;
}
