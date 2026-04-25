import { useState } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import ThreeBackground from "./components/ThreeBackground";
import { useLenisSmoothScroll } from "./hooks/useLenisSmoothScroll";

export default function App() {
  const [loading, setLoading] = useState(true);
  useLenisSmoothScroll(!loading);

  return (
    <>
      {/* Loader — unmounts after animation */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {/* Main content — hidden until loader done */}
      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.5s ease",
          pointerEvents: loading ? "none" : "auto",
        }}
        className="relative isolate w-full min-h-screen bg-paper dark:bg-[#0f1115] text-ink dark:text-[#e8e6e3] font-body transition-colors duration-500"
      >
        <ThreeBackground />
        <div className="relative z-10">
          <Navbar />
          <main className="w-full">
          <Hero />
          <About />
          <Services />
          <Projects />
          <Skills />
          <Certifications />
          <Contact />
          </main>
          <Footer />
          <ChatWidget />
        </div>
      </div>
    </>
  );
}