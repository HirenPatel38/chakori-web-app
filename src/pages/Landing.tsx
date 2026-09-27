import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";
import {
  BestSellers,
  Collections,
  ClosingCTA,
  NewArrivals,
  OurStory,
  SiteFooter,
} from "@/components/landing/Sections";

export default function Landing() {
  return (
    <div className="min-h-screen bg-ivory text-forest">
      <Navbar />
      <main>
        <Hero />
        <Collections />
        <NewArrivals />
        <BestSellers />
        <OurStory />
        <ClosingCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
