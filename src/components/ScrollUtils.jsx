import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollUtils() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
      setShowTop(scrolled > 400);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "3px",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #20b2a6, #a0f0ec)",
          zIndex: 9999,
          transition: "width 0.1s linear",
          boxShadow: "0 0 8px #20b2a6",
          pointerEvents: "none",
        }}
      />

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 9998,
          opacity: showTop ? 1 : 0,
          transform: showTop ? "translateY(0) scale(1)" : "translateY(16px) scale(0.8)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          pointerEvents: showTop ? "auto" : "none",
        }}
        className="w-11 h-11 rounded-full glass border border-primary/40 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-200 shadow-lg"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </>
  );
}
