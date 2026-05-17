import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import HardwarePortfolio from "@/components/HardwarePortfolio";
import Experience from "@/components/Experience";
import Research from "@/components/Research";
import Teaching from "@/components/Teaching";
import YouTube from "@/components/YouTube";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <Nav />
      <Hero />
      <Stats />
      <HardwarePortfolio />
      <Experience />
      <Research />
      <Teaching />
      <YouTube />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
