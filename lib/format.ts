export function formatMoney(value: number) {
  return new Intl.NumberFormat("es-UY", { style: "currency", currency: "USD" }).format(value);
}
