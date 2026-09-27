import { EASE } from "@/lib/motion";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Scroll-triggered fade + slide-up wrapper used by every section. */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Minimal editorial heading: hairline rule, gold eyebrow, serif title. */
export function SectionHeading({
  eyebrow,
  title,
  aside,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <div className="flex flex-col gap-6 border-t border-forest/15 pt-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.34em] text-gold-ink uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            {eyebrow}
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.06] text-forest">
            {title}
          </h2>
        </div>
        {aside ? (
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-right">
            {aside}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
