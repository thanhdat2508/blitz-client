import { cn } from "@/lib/utils";

interface TierBadgeProps {
  tier: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showText?: boolean;
}

export function TierBadge({
  tier,
  size = "md",
  className,
  showText = false,
}: TierBadgeProps) {
  const normalized = tier.toUpperCase();
  const validTiers = ["S", "A", "B", "C", "D"];
  const isValid = validTiers.includes(normalized);
  const iconSrc = isValid ? `/tier_${normalized.toLowerCase()}.svg` : null;

  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-9 h-9",
  };

  return (
    <div className={cn("inline-flex items-center gap-1.5 shrink-0 select-none", className)}>
      {iconSrc ? (
        <img
          src={iconSrc}
          alt={`Tier ${normalized}`}
          className={cn("object-contain drop-shadow transition-transform", sizeClasses[size])}
        />
      ) : (
        <span className="font-bold text-xs">{normalized}</span>
      )}
      {showText && (
        <span className="font-bold text-xs text-neutral-200">
          Tier {normalized}
        </span>
      )}
    </div>
  );
}
