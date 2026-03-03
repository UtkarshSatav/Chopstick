import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Specialties from "@/components/Specialties";
import Gallery from "@/components/Gallery";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main className="min-h-screen bg-cream text-accent">
      <Navbar />

      <Hero />
      <About />
      <Specialties />
      <Gallery />
      <Features />
      <Testimonials />
      <Footer />
    </main>
  );
}
