export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-GB", { currency: "EUR" }).format(price);
}
