import type { CartItem } from "@/lib/types";
import { formatMoney } from "@/lib/format";

export function buildWhatsappCartMessage(args: {
  customer: { firstName: string; lastName: string; phone: string };
  items: CartItem[];
  total: number;
}) {
  const { customer, items, total } = args;

  const lines: string[] = [];
  lines.push("Hola! quiero realizar un pedido:");
  lines.push("");
  lines.push(`Cliente: ${customer.firstName} ${customer.lastName}`);
  lines.push(`Teléfono: ${customer.phone}`);
  lines.push("");
  lines.push("Prendas:");

  for (const it of items) {
    lines.push(`• ${it.name} (talla ${it.size}) x${it.qty} = US$${formatMoney(it.price * it.qty)}`);
  }

  lines.push("");
  lines.push(`Total: ${formatMoney(total)}`);
  return lines.join("\n");
}
