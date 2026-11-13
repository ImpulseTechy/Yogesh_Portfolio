import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import HardwarePortfolio from "@/components/HardwarePortfolio";
import Tools from "@/components/Tools";
import Experience from "@/components/Experience";
import Research from "@/components/Research";
import Teaching from "@/components/Teaching";
import YouTube from "@/components/YouTube";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="main" className="min-h-screen bg-bg-primary">
      <Nav />
      <Hero />
      <Stats />
      <About />
      <HardwarePortfolio />
      <Tools />
      <Experience />
      <Research />
      <Teaching />
      <YouTube />
      <Testimonials />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
