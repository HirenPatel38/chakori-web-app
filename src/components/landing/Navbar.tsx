import { Monogram } from "@/components/Monogram";
import { EASE } from "@/lib/motion";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

const LEFT_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Sarees", href: "#sarees" },
  { label: "Lehengas", href: "#lehengas" },
];

const RIGHT_LINKS = [
  { label: "Kurtis", href: "#kurtis" },
  { label: "New Arrivals", href: "#new-arrivals" },
  { label: "Best Sellers", href: "#best-sellers" },
  { label: "Our Story", href: "#our-story" },
];

const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS];

/** Desktop link with a gold underline that draws in from the left. */
function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="group relative py-1 text-[11px] font-medium tracking-[0.22em] text-forest/70 uppercase transition-colors hover:text-forest focus-visible:text-forest"
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-[width] duration-500 ease-out group-hover:w-full group-focus-visible:w-full"
      />
    </a>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid size-9 place-items-center text-forest/70 transition-colors hover:text-gold-ink focus-visible:text-gold-ink"
    >
      {children}
    </a>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-ivory/95 backdrop-blur-sm">
      <nav
        aria-label="Primary"
        className="mx-auto grid h-16 max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center px-4 md:h-[74px] md:px-8"
      >
        {/* Left link cluster */}
        <div className="hidden items-center gap-7 lg:flex">
          {LEFT_LINKS.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Centered monogram */}
        <a
          href="#top"
          className="col-start-2 flex items-center gap-3 justify-self-center"
          aria-label="CHAKORI home"
        >
          <Monogram size="sm" />
          <span className="font-display text-lg tracking-[0.42em] text-forest uppercase">
            Chakori
          </span>
        </a>

        {/* Right links + utilities */}
        <div className="col-start-3 flex items-center justify-end gap-6">
          <div className="hidden items-center gap-7 lg:flex">
            {RIGHT_LINKS.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-0.5 sm:flex">
            <IconLink href="/dashboard?panel=search" label="Search the collection">
              <Search className="size-[18px]" strokeWidth={1.5} />
            </IconLink>
            <IconLink href="/dashboard?panel=wishlist" label="Wishlist">
              <Heart className="size-[18px]" strokeWidth={1.5} />
            </IconLink>
            <IconLink href="/dashboard?panel=cart" label="Shopping bag">
              <ShoppingBag className="size-[18px]" strokeWidth={1.5} />
            </IconLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid size-9 place-items-center text-forest transition-colors hover:text-gold-ink lg:hidden"
          >
            <Menu className="size-5" strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer — slides in from the right */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-forest-deep/45 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col border-l border-forest/15 bg-ivory px-6 pt-5 pb-8"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <Monogram size="sm" />
                  <span className="font-display text-base tracking-[0.4em] text-forest uppercase">
                    Chakori
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid size-9 place-items-center text-forest transition-colors hover:text-gold-ink"
                >
                  <X className="size-5" strokeWidth={1.5} />
                </button>
              </div>

              <div className="mt-8 flex flex-col divide-y divide-forest/10 border-y border-forest/10">
                {ALL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline justify-between py-3.5 font-display text-2xl text-forest transition-colors hover:text-gold-ink"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="h-px w-0 bg-gold transition-all duration-500 group-hover:w-12"
                    />
                  </a>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3">
                <a
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 items-center justify-center bg-gold px-6 text-[11px] font-medium tracking-[0.28em] text-forest uppercase transition-colors hover:bg-gold-light"
                >
                  Shop Now
                </a>
                <a
                  href="/auth?returnTo=%2Fdashboard"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 items-center justify-center border border-forest/25 px-6 text-[11px] font-medium tracking-[0.28em] text-forest uppercase transition-colors hover:border-forest"
                >
                  Sign in
                </a>
              </div>

              <div className="mt-auto flex items-center justify-between pt-8">
                <a
                  href="/dashboard?panel=wishlist"
                  className="flex items-center gap-2 text-[11px] tracking-[0.2em] text-forest/70 uppercase hover:text-gold-ink"
                >
                  <Heart className="size-4" strokeWidth={1.5} /> Wishlist
                </a>
                <a
                  href="/dashboard?panel=cart"
                  className="flex items-center gap-2 text-[11px] tracking-[0.2em] text-forest/70 uppercase hover:text-gold-ink"
                >
                  <ShoppingBag className="size-4" strokeWidth={1.5} /> Bag
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
