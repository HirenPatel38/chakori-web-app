import { Photo } from "@/components/Photo";
import { images } from "@/lib/catalog";
import { CURTAIN_EASE, EASE } from "@/lib/motion";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Full-bleed editorial hero with the "silk curtain parting" load reveal:
 * two maroon panels split from the centre, then the type rises into place.
 */
export function Hero() {
  const reduce = useReducedMotion();

  const stack: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.11,
        delayChildren: reduce ? 0.1 : 1.15,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
  };

  const curtain = (direction: "left" | "right") => ({
    initial: { x: "0%" },
    animate: { x: direction === "left" ? "-101%" : "101%" },
    transition: reduce
      ? { duration: 0 }
      : { duration: 1.5, delay: 0.35, ease: CURTAIN_EASE },
  });

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[86svh] flex-col overflow-hidden bg-forest md:min-h-[92svh]"
    >
      <Photo
        src={images.heroLehenga}
        alt="Woman wearing an emerald choli and lehenga, draped in the traditional Indian style"
        eager
        className="absolute inset-0 h-full w-full"
        imgClassName="object-cover object-[center_22%] saturate-[0.92]"
      />
      {/* Legibility scrims */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-forest-deep/90 via-forest-deep/60 to-forest-deep/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-transparent to-forest-deep/40"
      />

      {/* Copy */}
      <motion.div
        variants={stack}
        initial="hidden"
        animate="show"
        className="relative z-20 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-end px-5 pt-24 pb-24 md:pr-16 md:pb-28 md:pl-8"
      >
        <motion.p
          variants={item}
          className="flex items-center gap-3 text-[10px] font-medium tracking-[0.4em] text-gold uppercase md:text-[11px]"
        >
          <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
          Tradition meets tomorrow
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-5 max-w-[14ch] font-display text-[clamp(3rem,10vw,7.5rem)] leading-[0.94] font-medium text-ivory"
        >
          More Than Fashion
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 font-display text-xl text-ivory/75 italic md:text-2xl"
        >
          A story in every drape.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4"
        >
          <a
            href="/dashboard"
            className="group inline-flex h-12 items-center justify-center gap-2 bg-gold px-9 text-[11px] font-medium tracking-[0.28em] text-forest uppercase transition-colors hover:bg-gold-light"
          >
            Shop Now
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.75}
            />
          </a>
          <a
            href="#collections"
            className="inline-flex h-12 items-center justify-center border border-ivory/45 px-9 text-[11px] font-medium tracking-[0.28em] text-ivory uppercase transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            Explore Collections
          </a>
        </motion.div>

        <motion.div variants={item} className="mt-12 flex items-end justify-between gap-6">
          <span className="inline-flex items-center border border-ivory/30 px-4 py-2 text-[9px] font-medium tracking-[0.3em] text-ivory/80 uppercase md:text-[10px]">
            Rooted in Indian artistry
          </span>

          <span className="hidden flex-col items-center gap-2 text-ivory/50 md:flex">
            <span className="text-[9px] tracking-[0.34em] uppercase">Scroll</span>
            <motion.span
              aria-hidden="true"
              className="block h-10 w-px bg-gradient-to-b from-gold/70 to-transparent"
              animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            />
          </span>
        </motion.div>
      </motion.div>

      {/* Rotated edge caption */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: reduce ? 0 : 1.7 }}
        className="pointer-events-none absolute top-1/2 right-3 z-20 hidden -translate-y-1/2 text-[10px] tracking-[0.5em] text-ivory/60 uppercase md:block [writing-mode:vertical-rl]"
      >
        Heritage woven for tomorrow
      </motion.span>

      {/* Silk curtain panels */}
      <motion.div
        aria-hidden="true"
        {...curtain("left")}
        className="pointer-events-none absolute inset-y-0 left-0 z-30 w-1/2 border-r border-gold/50 bg-[linear-gradient(90deg,#5c1923_0%,#6e1f2a_55%,#7f2532_100%)] shadow-[inset_-24px_0_40px_-24px_rgba(0,0,0,0.6)]"
      >
        <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.07)_0px,rgba(255,255,255,0.07)_2px,transparent_2px,transparent_26px)]" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        {...curtain("right")}
        className="pointer-events-none absolute inset-y-0 right-0 z-30 w-1/2 border-l border-gold/50 bg-[linear-gradient(270deg,#5c1923_0%,#6e1f2a_55%,#7f2532_100%)] shadow-[inset_24px_0_40px_-24px_rgba(0,0,0,0.6)]"
      >
        <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.07)_0px,rgba(255,255,255,0.07)_2px,transparent_2px,transparent_26px)]" />
      </motion.div>

      {/* Brand stamp across the seam, fades as the curtains part */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.45 }}
        className="pointer-events-none absolute inset-x-0 top-1/2 z-40 -translate-y-1/2 text-center"
      >
        <span className="font-display text-2xl tracking-[0.55em] text-gold uppercase">
          Chakori
        </span>
      </motion.div>
    </section>
  );
}
