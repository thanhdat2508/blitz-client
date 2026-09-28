export { cn } from "cn";

/**
 * Optimizes Cloudinary URLs with auto-format (WebP/AVIF), auto-quality, and responsive width.
 * Reduces raw ~900KB PNGs down to ~20-50KB with zero visible quality loss.
 */
export function optimizeCloudinaryUrl(url?: string, width = 400): string {
  if (!url) return "";
  if (
    url.includes("res.cloudinary.com") &&
    url.includes("/upload/") &&
    !url.includes("/upload/f_auto")
  ) {
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
  }
  return url;
}
