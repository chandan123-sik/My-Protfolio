import { useEffect, useRef } from "react";

export function CursorTrail() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const spark = document.createElement("div");
      spark.className = "cursor-spark";
      spark.style.left = `${e.clientX}px`;
      spark.style.top = `${e.clientY}px`;

      // Random size variation
      const size = 4 + Math.random() * 6;
      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;

      // Slight random offset so sparks spread a little
      const offsetX = (Math.random() - 0.5) * 16;
      const offsetY = (Math.random() - 0.5) * 16;
      spark.style.setProperty("--tx", `${offsetX}px`);
      spark.style.setProperty("--ty", `${offsetY}px`);

      container.appendChild(spark);

      // Remove after animation ends
      spark.addEventListener("animationend", () => spark.remove());
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <div ref={containerRef} className="cursor-trail-container" />;
}
