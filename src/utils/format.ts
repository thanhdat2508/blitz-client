/**
 * Format số tiền sang định dạng VND hoặc USD
 */
export function formatCurrency(amount: number, currency: 'VND' | 'USD' = 'VND'): string {
  return new Intl.NumberFormat(currency === 'VND' ? 'vi-VN' : 'en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

/**
 * Format ngày tháng chuẩn hiển thị
 */
export function formatDate(date: string | Date | number): string {
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}
