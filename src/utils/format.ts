/**
 * Format currency to USD or VND
 */
export function formatCurrency(amount: number, currency: 'VND' | 'USD' = 'USD'): string {
  return new Intl.NumberFormat(currency === 'VND' ? 'vi-VN' : 'en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

/**
 * Format date for standard display
 */
export function formatDate(date: string | Date | number): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}
