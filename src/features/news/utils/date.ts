/**
 * Format timestamp sang dạng chuỗi tương đối (VD: "2 DAYS AGO", "14 DAYS AGO")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const diffInMonths = Math.floor(diffInDays / 30)

  if (diffInMinutes < 60) {
    return `${Math.max(1, diffInMinutes)} MINUTES AGO`
  }
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'HOUR' : 'HOURS'} AGO`
  }
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? 'DAY' : 'DAYS'} AGO`
  }
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'MONTH' : 'MONTHS'} AGO`
  }
  return `${Math.floor(diffInMonths / 12)} YEARS AGO`
}
