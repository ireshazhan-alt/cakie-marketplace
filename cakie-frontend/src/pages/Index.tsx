import { Navbar } from "@/components/cakie/Navbar";
import { Hero } from "@/components/cakie/Hero";
import { CakeCarousel } from "@/components/cakie/CakeCarousel";
import { Categories } from "@/components/cakie/Categories";
import { CakeMakers } from "@/components/cakie/CakeMakers";
import { Footer } from "@/components/cakie/Footer";

const Index = () => (
  <main className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    <CakeCarousel />
    <Categories />
    <CakeMakers />
    <Footer />
  </main>
);

export default Index;
