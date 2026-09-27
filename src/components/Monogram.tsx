const SIZES = {
  sm: "size-9 text-[13px]",
  md: "size-11 text-base",
  lg: "size-16 text-2xl",
} as const;

/** Gold circular monogram used in the navbar, footer and dashboard. */
export function Monogram({
  size = "md",
  className = "",
}: {
  size?: keyof typeof SIZES;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-grid shrink-0 place-items-center rounded-full border border-gold bg-forest font-display text-gold shadow-[inset_0_0_0_3px_#1e2b23,inset_0_0_0_4px_rgba(201,162,39,0.45)] ${SIZES[size]} ${className}`}
    >
      <span className="translate-y-[-1px] tracking-[0.02em]">C</span>
    </span>
  );
}
