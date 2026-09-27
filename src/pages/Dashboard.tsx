import { Monogram } from "@/components/Monogram";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { useAuth } from "@/hooks/use-auth";
import { formatINR, products, type Category, type Product } from "@/lib/catalog";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  LogOut,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const CATEGORIES: Array< Category | "All"> = ["All", "Sarees", "Lehengas", "Kurtis"];

const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const initialParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const initialCategory = initialParams.get("category");
  const initialPanel = initialParams.get("panel");

  const [category, setCategory] = useState<Category | "All">(
    CATEGORIES.includes(initialCategory as Category | "All")
      ? (initialCategory as Category | "All")
      : "All",
  );
  const [query, setQuery] = useState("");
  const [mobileSearch, setMobileSearch] = useState(initialPanel === "search");
  const [onlyWishlist, setOnlyWishlist] = useState(initialPanel === "wishlist");
  const [cartOpen, setCartOpen] = useState(initialPanel === "cart");

  const [wishlist, setWishlist] = useState<string[]>(() =>
    readStorage<string[]>("chakori:wishlist", []),
  );
  const [cart, setCart] = useState<Record<string, number>>(() =>
    readStorage<Record<string, number>>("chakori:cart", {}),
  );

  useEffect(() => {
    window.localStorage.setItem("chakori:wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    window.localStorage.setItem("chakori:cart", JSON.stringify(cart));
  }, [cart]);

  const visible = products.filter((product) => {
    const matchesCategory = category === "All" || product.category === category;
    const matchesWishlist = !onlyWishlist || wishlist.includes(product.id);
    const needle = query.trim().toLowerCase();
    const matchesQuery =
      needle === "" ||
      `${product.name} ${product.fabric} ${product.category}`.toLowerCase().includes(needle);
    return matchesCategory && matchesWishlist && matchesQuery;
  });

  const cartLines = Object.entries(cart)
    .map(([id, qty]) => ({ product: products.find((item) => item.id === id), qty }))
    .filter((line): line is { product: Product; qty: number } => Boolean(line.product));

  const cartCount = cartLines.reduce((total, line) => total + line.qty, 0);
  const subtotal = cartLines.reduce(
    (total, line) => total + line.product.price * line.qty,
    0,
  );

  const toggleWishlist = (id: string) =>
    setWishlist((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

  const addToCart = (id: string) => {
    setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
    const product = products.find((item) => item.id === id);
    toast(`${product?.name ?? "Piece"} added to your bag.`, {
      action: { label: "View bag", onClick: () => setCartOpen(true) },
    });
  };

  const setQty = (id: string, qty: number) =>
    setCart((current) => {
      const next = { ...current };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-ivory text-forest">
      {/* ---------------------------------------------------------- header */}
      <header className="sticky top-0 z-40 border-b border-forest/10 bg-ivory/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-4 md:h-[74px] md:gap-6 md:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="Back to CHAKORI home">
            <Monogram size="sm" />
            <span className="font-display text-base tracking-[0.4em] text-forest uppercase">
              Chakori
            </span>
          </a>

          <div className="relative ml-auto hidden max-w-xs flex-1 sm:block lg:max-w-sm">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-forest/50"
              strokeWidth={1.5}
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoFocus={initialPanel === "search"}
              placeholder="Search the collection"
              aria-label="Search the collection"
              className="h-10 w-full border border-forest/20 bg-transparent pr-3 pl-9 text-sm text-forest placeholder:text-forest/40 focus:border-gold focus:outline-none"
            />
          </div>

          <button
            type="button"
            aria-label="Search"
            onClick={() => setMobileSearch((open) => !open)}
            className="grid size-9 place-items-center text-forest/70 transition-colors hover:text-gold-ink sm:hidden"
          >
            <Search className="size-[18px]" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={() => setOnlyWishlist((value) => !value)}
            aria-pressed={onlyWishlist}
            className={`relative grid size-9 place-items-center transition-colors hover:text-gold-ink ${
              onlyWishlist ? "text-gold-ink" : "text-forest/70"
            }`}
          >
            <Heart className={`size-[18px] ${onlyWishlist ? "fill-gold" : ""}`} strokeWidth={1.5} />
            {wishlist.length > 0 ? (
              <span className="absolute top-0.5 right-0.5 grid size-4 place-items-center rounded-full bg-gold text-[9px] font-medium text-forest">
                {wishlist.length}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label="Open shopping bag"
            className="relative grid size-9 place-items-center text-forest/70 transition-colors hover:text-gold-ink"
          >
            <ShoppingBag className="size-[18px]" strokeWidth={1.5} />
            {cartCount > 0 ? (
              <span className="absolute top-0.5 right-0.5 grid size-4 place-items-center rounded-full bg-gold text-[9px] font-medium text-forest">
                {cartCount}
              </span>
            ) : null}
          </button>

          <div className="hidden items-center gap-3 border-l border-forest/15 pl-4 md:flex">
            <span className="max-w-[160px] truncate text-xs text-muted-foreground">
              {user?.name || user?.email || "Guest"}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-forest/70 uppercase transition-colors hover:text-gold-ink"
            >
              <LogOut className="size-3.5" strokeWidth={1.5} />
              Sign out
            </button>
          </div>
        </div>

        {mobileSearch ? (
          <div className="border-t border-forest/10 px-4 py-3 sm:hidden">
            <div className="relative">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-forest/50"
                strokeWidth={1.5}
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                autoFocus
                placeholder="Search the collection"
                aria-label="Search the collection"
                className="h-10 w-full border border-forest/20 bg-transparent pr-3 pl-9 text-sm text-forest placeholder:text-forest/40 focus:border-gold focus:outline-none"
              />
            </div>
          </div>
        ) : null}
      </header>

      {/* ------------------------------------------------------------ main */}
      <main className="mx-auto max-w-[1400px] px-4 py-10 md:px-8 md:py-14">
        <div className="flex flex-col gap-6 border-b border-forest/15 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.32em] text-gold-ink uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-gold" />
              The Atelier
            </p>
            <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-tight">
              Welcome{user?.name ? `, ${user.name}` : ""} — the current release
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Eight numbered pieces this week. Save what you love, keep what you cannot stop
              thinking about.
            </p>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              onClick={handleSignOut}
              className="flex h-10 items-center gap-2 border border-forest/25 px-4 text-[10px] tracking-[0.2em] text-forest uppercase transition-colors hover:border-forest"
            >
              <LogOut className="size-3.5" strokeWidth={1.5} />
              Sign out
            </button>
          </div>
        </div>

        {/* filters */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          {CATEGORIES.map((tab) => {
            const active = category === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setCategory(tab)}
                className={`relative pb-1.5 text-[11px] tracking-[0.24em] uppercase transition-colors ${
                  active ? "text-forest" : "text-forest/55 hover:text-forest"
                }`}
              >
                {tab}
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0 left-0 h-px bg-gold transition-all duration-500 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </button>
            );
          })}

          {onlyWishlist ? (
            <button
              type="button"
              onClick={() => setOnlyWishlist(false)}
              className="ml-auto flex items-center gap-2 border border-gold/60 px-3 py-1.5 text-[10px] tracking-[0.2em] text-gold-ink uppercase transition-colors hover:border-gold"
            >
              Wishlist only
              <X className="size-3.5" strokeWidth={1.75} />
            </button>
          ) : null}
        </div>

        {/* product grid */}
        {visible.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
            {visible.map((product, index) => (
              <Reveal key={product.id} delay={Math.min(index, 5) * 0.06}>
                <article className="group flex h-full flex-col">
                  <div className="relative">
                    <Photo
                      src={product.image}
                      alt={product.name}
                      className="relative aspect-[3/4] w-full"
                      imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                    />
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      aria-pressed={wishlist.includes(product.id)}
                      aria-label={
                        wishlist.includes(product.id)
                          ? `Remove ${product.name} from wishlist`
                          : `Save ${product.name} to wishlist`
                      }
                      className="absolute top-2.5 right-2.5 grid size-9 place-items-center border border-ivory/50 bg-ivory/90 text-forest transition-colors hover:border-gold"
                    >
                      <Heart
                        className={`size-4 ${
                          wishlist.includes(product.id) ? "fill-gold text-gold" : ""
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                    {product.badge ? (
                      <span className="absolute top-3 left-3 border border-forest/20 bg-ivory/92 px-2.5 py-1 text-[9px] font-medium tracking-[0.2em] text-forest uppercase">
                        {product.badge}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-4 flex flex-1 flex-col border-t border-forest/15 pt-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <h2 className="font-display text-base leading-snug">{product.name}</h2>
                      <span className="shrink-0 text-sm text-muted-foreground">
                        {formatINR(product.price)}
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] tracking-[0.16em] text-forest/55 uppercase">
                      {product.fabric} · {product.category}
                    </p>
                    <button
                      type="button"
                      onClick={() => addToCart(product.id)}
                      className="mt-4 h-10 w-full border border-forest/25 text-[10px] font-medium tracking-[0.24em] text-forest uppercase transition-colors hover:bg-forest hover:text-ivory"
                    >
                      {cart[product.id] ? `In bag · ${cart[product.id]}` : "Add to bag"}
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-10 border border-dashed border-forest/20 px-6 py-16 text-center">
            <p className="font-display text-xl text-forest">Nothing here just yet</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              {onlyWishlist
                ? "Your wishlist is empty — tap the heart on any piece to save it."
                : "Try another category or clear your search."}
            </p>
            <button
              type="button"
              onClick={() => {
                setOnlyWishlist(false);
                setCategory("All");
                setQuery("");
              }}
              className="mt-6 inline-flex h-10 items-center gap-2 border border-forest/30 px-5 text-[10px] tracking-[0.24em] text-forest uppercase transition-colors hover:border-gold"
            >
              <ArrowLeft className="size-3.5" strokeWidth={1.5} />
              Show everything
            </button>
          </div>
        )}
      </main>

      <footer className="border-t border-forest/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-6 text-[11px] text-forest/55 md:flex-row md:items-center md:justify-between md:px-8">
          <span>© {new Date().getFullYear()} CHAKORI — heritage woven for tomorrow.</span>
          <a
            href="/#collections"
            className="underline decoration-gold underline-offset-2 transition-colors hover:text-forest"
          >
            Back to the lookbook
          </a>
        </div>
      </footer>

      {/* ------------------------------------------------------- bag drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close bag"
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-50 bg-forest-deep/45 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-50 flex w-[92%] max-w-md flex-col border-l border-forest/15 bg-ivory"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between border-b border-forest/10 px-5 py-4">
                <h2 className="font-display text-xl">Your bag</h2>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  aria-label="Close bag"
                  className="grid size-9 place-items-center text-forest transition-colors hover:text-gold-ink"
                >
                  <X className="size-5" strokeWidth={1.5} />
                </button>
              </div>

              {cartLines.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
                  <ShoppingBag className="size-6 text-forest/40" strokeWidth={1.25} />
                  <p className="font-display text-lg">Your bag is empty</p>
                  <p className="text-sm text-muted-foreground">
                    Add a piece from the current release and it will wait for you here.
                  </p>
                </div>
              ) : (
                <ul className="flex-1 divide-y divide-forest/10 overflow-y-auto px-5">
                  {cartLines.map(({ product, qty }) => (
                    <li key={product.id} className="flex gap-4 py-4">
                      <Photo
                        src={product.image}
                        alt={product.name}
                        className="relative size-20 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate font-display text-base">{product.name}</p>
                            <p className="mt-0.5 text-[10px] tracking-[0.16em] text-forest/55 uppercase">
                              {product.category}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setQty(product.id, 0)}
                            aria-label={`Remove ${product.name}`}
                            className="text-forest/45 transition-colors hover:text-maroon"
                          >
                            <Trash2 className="size-4" strokeWidth={1.5} />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="flex items-center border border-forest/20">
                            <button
                              type="button"
                              onClick={() => setQty(product.id, qty - 1)}
                              aria-label="Decrease quantity"
                              className="grid size-8 place-items-center text-forest/70 transition-colors hover:text-forest"
                            >
                              <Minus className="size-3.5" strokeWidth={1.5} />
                            </button>
                            <span className="w-7 text-center text-sm">{qty}</span>
                            <button
                              type="button"
                              onClick={() => setQty(product.id, qty + 1)}
                              aria-label="Increase quantity"
                              className="grid size-8 place-items-center text-forest/70 transition-colors hover:text-forest"
                            >
                              <Plus className="size-3.5" strokeWidth={1.5} />
                            </button>
                          </div>
                          <span className="text-sm">
                            {formatINR(product.price * qty)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className="border-t border-forest/10 px-5 py-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] tracking-[0.24em] text-forest/60 uppercase">
                    Subtotal
                  </span>
                  <span className="font-display text-xl">{formatINR(subtotal)}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Complimentary shipping across India · duties calculated at checkout.
                </p>
                <button
                  type="button"
                  disabled={cartLines.length === 0}
                  onClick={() =>
                    toast.success("Checkout opens soon — your bag has been saved.")
                  }
                  className="mt-4 h-12 w-full bg-gold text-[11px] font-medium tracking-[0.26em] text-forest uppercase transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Checkout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
