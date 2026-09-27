import { Photo } from "@/components/Photo";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { Monogram } from "@/components/Monogram";
import { formatINR, images, products, type Product } from "@/lib/catalog";
import { ArrowRight, Instagram, Mail } from "lucide-react";
import { useState } from "react";

/* ------------------------------------------------------------------ */
/* Collections — asymmetric editorial grid                             */
/* ------------------------------------------------------------------ */

function CollectionTile({
  id,
  image,
  alt,
  title,
  caption,
  href,
  className = "",
}: {
  id?: string;
  image: string;
  alt: string;
  title: string;
  caption: string;
  href: string;
  className?: string;
}) {
  return (
    <a
      id={id}
      href={href}
      className={`group relative isolate block scroll-mt-24 overflow-hidden bg-ivory-deep ${className}`}
    >
      <Photo
        src={image}
        alt={alt}
        className="absolute inset-0 h-full w-full"
        imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-forest-deep/75 via-forest-deep/15 to-transparent"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 border border-transparent transition-colors duration-500 group-hover:border-gold/70"
      />
      <span className="absolute right-5 bottom-5 left-5 translate-y-3 opacity-100 transition-all duration-500 ease-out group-hover:translate-y-0 md:opacity-0 md:group-hover:opacity-100">
        <span className="block font-display text-2xl text-ivory md:text-[1.75rem]">
          {title}
        </span>
        <span className="mt-1.5 block text-[10px] tracking-[0.26em] text-gold uppercase">
          {caption}
        </span>
      </span>
    </a>
  );
}

export function Collections() {
  return (
    <section id="collections" className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
      <SectionHeading
        eyebrow="Collections"
        title={
          <>
            Collection — <span className="italic">Stories woven in tradition</span>
          </>
        }
        aside="Five houses of craft: handloom silks, block-printed cottons and occasion wear, each finished by a single artisan from warp to pallu."
      />

      <Reveal delay={0.1} className="mt-10 md:mt-14">
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          <CollectionTile
            id="lehengas"
            image={images.runway}
            alt="Model in a lehenga on the Lakmé Fashion Week runway"
            title="Lehengas"
            caption="Occasion wear, cut for the light"
            href="/dashboard?category=Lehengas"
            className="min-h-[380px] md:col-span-2 md:min-h-[640px]"
          />

          <div className="grid gap-4 md:grid-rows-3 md:gap-5">
            <CollectionTile
              id="sarees"
              image={images.shrimaa}
              alt="Banarasi saree draped in the traditional style"
              title="Sarees"
              caption="Grace in every drape"
              href="/dashboard?category=Sarees"
              className="min-h-[220px]"
            />
            <CollectionTile
              id="printed"
              image={images.blockPrint}
              alt="Nineteenth-century Indian block-print plates for textiles"
              title="Printed Sarees"
              caption="Hand-block, natural dyes"
              href="/dashboard?category=Sarees"
              className="min-h-[220px]"
            />
            <CollectionTile
              id="kurtis"
              image={images.bandhani}
              alt="Banarasi-work bandhani crepe fabric in close detail"
              title="Kurtis"
              caption="Everyday ease, artisan soul"
              href="/dashboard?category=Kurtis"
              className="min-h-[220px]"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* New arrivals                                                        */
/* ------------------------------------------------------------------ */

function ProductCard({ product }: { product: Product }) {
  return (
    <a href={`/dashboard?category=${product.category}`} className="group block">
      <div className="relative">
        <Photo
          src={product.image}
          alt={product.name}
          className="relative aspect-[3/4] w-full"
          imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
        />
        {product.badge ? (
          <span className="absolute top-3 left-3 border border-forest/20 bg-ivory/92 px-2.5 py-1 text-[9px] font-medium tracking-[0.22em] text-forest uppercase">
            {product.badge}
          </span>
        ) : null}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-forest/15 pt-3">
        <h3 className="font-display text-lg leading-snug text-forest">{product.name}</h3>
        <span className="shrink-0 text-sm text-muted-foreground">{formatINR(product.price)}</span>
      </div>
      <p className="mt-1 text-[11px] tracking-[0.18em] text-forest/55 uppercase">
        {product.fabric}
      </p>
      <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] tracking-[0.26em] text-gold-ink uppercase transition-opacity md:opacity-0 md:group-hover:opacity-100">
        View in the atelier
        <ArrowRight className="size-3.5" strokeWidth={1.75} />
      </span>
    </a>
  );
}

export function NewArrivals() {
  const fresh = products.filter((product) => product.badge === "New").slice(0, 4);

  return (
    <section
      id="new-arrivals"
      className="border-y border-forest/10 bg-ivory-deep/45 px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow="New Arrivals"
          title="Fresh from the loom"
          aside="A small release each week — limited lengths, numbered and signed by the weaver."
        />
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-14 md:grid-cols-4 md:gap-x-6">
          {fresh.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.08}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Best sellers — typographic list                                     */
/* ------------------------------------------------------------------ */

const BEST_SELLER_IDS = ["chanderi-01", "lehenga-04", "saree-08", "studio-03"];

export function BestSellers() {
  const ranked = BEST_SELLER_IDS.map((id) =>
    products.find((product) => product.id === id),
  ).filter((product): product is Product => Boolean(product));

  return (
    <section id="best-sellers" className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
      <SectionHeading
        eyebrow="Best Sellers"
        title="The pieces you ask for"
        aside="Reordered season after season, in the colours that never stay long."
      />

      <Reveal delay={0.1} className="mt-10 md:mt-14">
        <ol className="divide-y divide-forest/10 border-y border-forest/10">
          {ranked.map((product, index) => (
            <li key={product.id}>
              <a
                href={`/dashboard?category=${product.category}`}
                className="group flex items-center gap-4 py-5 md:gap-8"
              >
                <span className="hidden w-7 shrink-0 font-display text-sm text-gold-ink sm:block">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Photo
                  src={product.image}
                  alt={product.name}
                  className="relative size-16 shrink-0 md:size-20"
                  imgClassName="transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-lg text-forest md:text-xl">
                    {product.name}
                  </span>
                  <span className="mt-0.5 block truncate text-[11px] tracking-[0.18em] text-forest/55 uppercase">
                    {product.fabric}
                  </span>
                </span>
                <span className="hidden text-[11px] tracking-[0.18em] text-forest/55 uppercase sm:block">
                  {product.category}
                </span>
                <span className="w-24 shrink-0 text-right text-sm text-forest">
                  {formatINR(product.price)}
                </span>
                <ArrowRight
                  className="hidden size-4 shrink-0 -translate-x-2 text-gold-ink opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block"
                  strokeWidth={1.75}
                />
              </a>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Our story — dark editorial band                                     */
/* ------------------------------------------------------------------ */

const FACTS = [
  { figure: "1974", label: "First loom, Bhuj" },
  { figure: "40+", label: "Artisan families" },
  { figure: "100%", label: "Handloom & natural dye" },
];

export function OurStory() {
  return (
    <section id="our-story" className="bg-forest text-ivory">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
        <Reveal>
          <Photo
            src={images.blockPrint}
            alt="Archival block-print plates for Indian textiles, 1924"
            className="relative aspect-[4/5] w-full"
            imgClassName="object-cover"
          />
        </Reveal>

        <Reveal delay={0.12} className="flex flex-col justify-center">
          <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.34em] text-gold uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-gold/70" />
            Our Story
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.08]">
            Woven by hand, <span className="italic text-gold">kept by name</span>
          </h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ivory/70">
            <p>
              CHAKORI began at a single pit loom in Kutch, where our founder learned to read
              a weave the way others read a page. Fifty years on, the same families still
              dye, weave and embroider every length we release.
            </p>
            <p>
              We work in small numbers on purpose: a saree leaves the atelier only when the
              pallu falls exactly as it should. Nothing is rushed, nothing is repeated in
              bulk — tradition, cut for tomorrow.
            </p>
          </div>

          <dl className="mt-9 grid grid-cols-3 divide-x divide-ivory/15 border-y border-ivory/15">
            {FACTS.map((fact) => (
              <div key={fact.figure} className="px-3 py-5 first:pl-0 md:px-6">
                <dt className="font-display text-2xl text-gold md:text-3xl">{fact.figure}</dt>
                <dd className="mt-1 text-[10px] leading-4 tracking-[0.16em] text-ivory/60 uppercase">
                  {fact.label}
                </dd>
              </div>
            ))}
          </dl>

          <a
            href="/dashboard"
            className="group mt-9 inline-flex w-fit items-center gap-2 border-b border-gold/50 pb-1 text-[11px] tracking-[0.28em] text-gold uppercase transition-colors hover:border-gold"
          >
            Enter the atelier
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.75}
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Closing call to action                                              */
/* ------------------------------------------------------------------ */

export function ClosingCTA() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section className="mx-auto max-w-[900px] px-5 py-20 text-center md:py-28">
      <Reveal>
        <p className="text-[11px] font-medium tracking-[0.34em] text-gold-ink uppercase">
          The private list
        </p>
        <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05] text-forest">
          Drape the story forward
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Early access to new weaves, restocks of the pieces that sell out, and invitations
          to our seasonal trunk shows.
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubscribed(true);
          }}
          className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="h-12 flex-1 border border-forest/25 bg-transparent px-4 text-sm text-forest placeholder:text-forest/40 focus:border-gold focus:outline-none"
          />
          <button
            type="submit"
            className="h-12 bg-forest px-7 text-[11px] font-medium tracking-[0.26em] text-ivory uppercase transition-colors hover:bg-gold hover:text-forest"
          >
            {subscribed ? "Welcome in" : "Join the list"}
          </button>
        </form>

        <p
          aria-live="polite"
          className="mt-3 h-5 text-xs text-gold-ink"
        >
          {subscribed ? "Thank you — you'll hear from us before anyone else." : ""}
        </p>

        <div className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <a
            href="/dashboard"
            className="inline-flex h-12 w-full items-center justify-center bg-gold px-9 text-[11px] font-medium tracking-[0.28em] text-forest uppercase transition-colors hover:bg-gold-light sm:w-auto"
          >
            Shop Now
          </a>
          <a
            href="/auth?returnTo=%2Fdashboard"
            className="inline-flex h-12 w-full items-center justify-center border border-forest/30 px-9 text-[11px] font-medium tracking-[0.28em] text-forest uppercase transition-colors hover:border-forest sm:w-auto"
          >
            Create an account
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

const FOOTER_COLUMNS = [
  {
    heading: "Shop",
    links: [
      { label: "Sarees", href: "#sarees" },
      { label: "Lehengas", href: "#lehengas" },
      { label: "Kurtis", href: "#kurtis" },
      { label: "New Arrivals", href: "#new-arrivals" },
      { label: "Best Sellers", href: "#best-sellers" },
    ],
  },
  {
    heading: "House",
    links: [
      { label: "Our Story", href: "#our-story" },
      { label: "The Loom", href: "#our-story" },
      { label: "Care Guide", href: "#our-story" },
      { label: "Journal", href: "#collections" },
    ],
  },
  {
    heading: "Care",
    links: [
      { label: "Shipping", href: "/dashboard" },
      { label: "Returns", href: "/dashboard" },
      { label: "Size Guide", href: "/dashboard" },
      { label: "Contact", href: "/dashboard" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-forest/15 bg-ivory">
      <Reveal className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-8">
        <div>
          <a href="#top" className="flex items-center gap-3" aria-label="CHAKORI home">
            <Monogram size="md" />
            <span className="font-display text-lg tracking-[0.4em] text-forest uppercase">
              Chakori
            </span>
          </a>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Premium Indian traditional wear — sarees, lehengas and kurtis, woven in small
            numbers by hand.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <a
              href="/dashboard"
              aria-label="Instagram"
              className="grid size-9 place-items-center border border-forest/20 text-forest/70 transition-colors hover:border-gold hover:text-gold-ink"
            >
              <Instagram className="size-4" strokeWidth={1.5} />
            </a>
            <a
              href="/dashboard"
              aria-label="Email us"
              className="grid size-9 place-items-center border border-forest/20 text-forest/70 transition-colors hover:border-gold hover:text-gold-ink"
            >
              <Mail className="size-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <h3 className="text-[11px] font-medium tracking-[0.3em] text-forest uppercase">
              {column.heading}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-forest"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Reveal>

      <div className="border-t border-forest/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-5 py-5 text-[11px] text-forest/55 md:flex-row md:items-center md:justify-between md:px-8">
          <span>© {new Date().getFullYear()} CHAKORI. All rights reserved.</span>
          <span>
            Heritage woven for tomorrow · Imagery via{" "}
            <a
              href="https://commons.wikimedia.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-gold underline-offset-2 transition-colors hover:text-forest"
            >
              Wikimedia Commons
            </a>{" "}
            &amp;{" "}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-gold underline-offset-2 transition-colors hover:text-forest"
            >
              Unsplash
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
