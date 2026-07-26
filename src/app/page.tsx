import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Events } from "@/components/sections/Events";
import { Team } from "@/components/sections/Team";
import { Gallery } from "@/components/sections/Gallery";
import { Achievements } from "@/components/sections/Achievements";
import { Join } from "@/components/sections/Join";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <Hero />
      <About />
      <Events />
      <Team />
      <Gallery />
      <Achievements />
      <Join />
      <Footer />
    </main>
  );
}
