import { useState } from "react";

/**
 * Photographic panel with a designed fallback: if the remote image fails to
 * load, an ivory weave panel with the wordmark is shown instead so the layout
 * never breaks.
 *
 * The wrapper carries no position utility on purpose — callers pass either
 * `relative` or `absolute` in `className`, so `relative` never fights an
 * `absolute inset-0` override in the cascade.
 */
export function Photo({
  src,
  alt,
  className = "",
  imgClassName = "",
  eager = false,
}: {
  src: string;
  alt: string;
  /** Classes for the wrapping panel (positioning, aspect, size). */
  className?: string;
  /** Classes for the <img> itself (object-position, filters). */
  imgClassName?: string;
  /** Load without lazy delay (hero image). */
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`overflow-hidden bg-ivory-deep ${className}`}
      role={failed ? "img" : undefined}
      aria-label={failed ? alt : undefined}
    >
      {/* Fallback layer: sits behind the photo, revealed on error. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(140deg,#ece5d6_0%,#f6f1e7_45%,#e3d9c4_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35] bg-[repeating-linear-gradient(45deg,rgba(30,43,35,0.06)_0px,rgba(30,43,35,0.06)_1px,transparent_1px,transparent_9px)]"
      />
      {failed ? (
        <span className="absolute inset-0 grid place-items-center font-display text-sm tracking-[0.35em] text-forest/40 uppercase">
          Chakori
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  );
}
