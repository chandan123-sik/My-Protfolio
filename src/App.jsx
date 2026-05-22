import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { Footer } from "./layout/Footer";
import { CursorTrail } from "@/components/CursorTrail";
import { StarField } from "@/components/StarField";
import { lazy, Suspense } from "react";

const About = lazy(() => import("@/sections/About").then(m => ({ default: m.About })));
const Projects = lazy(() => import("@/sections/Projects").then(m => ({ default: m.Projects })));
const Experience = lazy(() => import("@/sections/Experience").then(m => ({ default: m.Experience })));
const Testimonials = lazy(() => import("@/sections/Testimonials").then(m => ({ default: m.Testimonials })));
const Contact = lazy(() => import("@/sections/Contact").then(m => ({ default: m.Contact })));

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <StarField />
      <CursorTrail />
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
