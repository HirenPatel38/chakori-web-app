/**
 * Shared imagery + product data for the CHAKORI storefront.
 *
 * Image sources are stable Wikimedia Commons / Unsplash CDN URLs, each verified
 * to resolve. Every consumer renders them through <Photo/>, which falls back to
 * a designed ivory panel if a URL ever stops resolving.
 */
export const images = {
  /** Woman in choli + lehenga — full-bleed hero portrait. */
  heroLehenga:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Indian_woman_wearing_choli_and_lehenga%2C_Oct._2019.jpg/1920px-Indian_woman_wearing_choli_and_lehenga%2C_Oct._2019.jpg",
  /** Lakmé Fashion Week runway — editorial large grid tile. */
  runway:
    "https://upload.wikimedia.org/wikipedia/commons/0/02/Mouni_Roy_at_Lakme_Fashion_Week_2016_%E2%80%93_Day_3_%2809%29.jpg",
  /** 1924 block-print plates — printed sarees / kurtis. */
  blockPrint:
    "https://upload.wikimedia.org/wikipedia/commons/8/8e/Block_prints_from_India_for_textiles_%281924%29_%2820359579156%29.jpg",
  /** Banarasi-work bandhani crepe, full drape detail. */
  bandhani:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Crape_silk_fabric_Banarasi_work_bandhani_saree.jpg/1280px-Crape_silk_fabric_Banarasi_work_bandhani_saree.jpg",
  /** Folded Banarasi silk saree. */
  banarasi: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Banarasi_Silk_Saree.jpg",
  /** Banarasi saree drape portrait. */
  shrimaa: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Shrimaa_banarasi_saree.jpg",
  /** Studio saree shot. */
  studioSaree:
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
} as const;

export type Category = "Sarees" | "Lehengas" | "Kurtis";

export interface Product {
  id: string;
  name: string;
  category: Category;
  fabric: string;
  price: number;
  image: string;
  badge?: "New" | "Best seller";
}

export const products: Product[] = [
  {
    id: "chanderi-01",
    name: "Banarasi Heirloom Saree",
    category: "Sarees",
    fabric: "Pure silk · zari border",
    price: 14500,
    image: images.banarasi,
    badge: "Best seller",
  },
  {
    id: "bandhani-02",
    name: "Bandhani Crepe Drape",
    category: "Sarees",
    fabric: "Crepe · hand-tied",
    price: 6950,
    image: images.bandhani,
    badge: "New",
  },
  {
    id: "studio-03",
    name: "Temple Border Silk Saree",
    category: "Sarees",
    fabric: "Mulberry silk",
    price: 18900,
    image: images.studioSaree,
  },
  {
    id: "lehenga-04",
    name: "Emerald Choli Lehenga",
    category: "Lehengas",
    fabric: "Raw silk · sequin work",
    price: 32000,
    image: images.heroLehenga,
    badge: "Best seller",
  },
  {
    id: "lehenga-05",
    name: "Runway Organza Lehenga",
    category: "Lehengas",
    fabric: "Organza · hand embroidery",
    price: 28500,
    image: images.runway,
    badge: "New",
  },
  {
    id: "kurti-06",
    name: "Ajrakh Block-Print Kurti",
    category: "Kurtis",
    fabric: "Hand-block cotton",
    price: 3850,
    image: images.blockPrint,
    badge: "New",
  },
  {
    id: "kurti-07",
    name: "Bandhani Cotton Kurti",
    category: "Kurtis",
    fabric: "Chanderi cotton",
    price: 3450,
    image: images.bandhani,
  },
  {
    id: "saree-08",
    name: "Kanjeevaram Drape Saree",
    category: "Sarees",
    fabric: "Silk · contrast pallu",
    price: 16750,
    image: images.shrimaa,
    badge: "New",
  },
];

export const formatINR = (value: number) =>
  `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
