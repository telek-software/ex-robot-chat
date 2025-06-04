export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-GB', { currency: 'EUR' }).format(price)
}

export function randomNum() {
  return Math.ceil(Math.random() * 10e6)
}
