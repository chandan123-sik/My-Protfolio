import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { Footer } from "./layout/Footer";
import { CursorTrail } from "@/components/CursorTrail";
import { StarField } from "@/components/StarField";
import { ScrollUtils } from "@/components/ScrollUtils";
import { LoadingScreen } from "@/components/LoadingScreen";
import { lazy, Suspense, useState, useCallback } from "react";

const About = lazy(() => import("@/sections/About").then(m => ({ default: m.About })));
const Projects = lazy(() => import("@/sections/Projects").then(m => ({ default: m.Projects })));
const Experience = lazy(() => import("@/sections/Experience").then(m => ({ default: m.Experience })));
const Testimonials = lazy(() => import("@/sections/Testimonials").then(m => ({ default: m.Testimonials })));
const Contact = lazy(() => import("@/sections/Contact").then(m => ({ default: m.Contact })));

function App() {
  const [loading, setLoading] = useState(true);
  const handleDone = useCallback(() => setLoading(false), []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {loading && <LoadingScreen onDone={handleDone} />}
      <StarField />
      <CursorTrail />
      <ScrollUtils />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Projects />
          <Experience />
          <Testimonials />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
