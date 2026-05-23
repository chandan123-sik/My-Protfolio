import { useEffect, useState } from "react";

export function LoadingScreen({ onDone }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 5s
    const fadeTimer = setTimeout(() => setFadeOut(true), 4000);
    // Remove from DOM after fade completes
    const doneTimer = setTimeout(() => onDone(), 5000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "#0f1418",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.5s ease",
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      {/* Outer spinning ring */}
      <div style={{ position: "relative", width: "90px", height: "90px" }}>
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "2px solid transparent",
          borderTopColor: "#20b2a6",
          borderRightColor: "#20b2a6",
          animation: "loader-spin 1s linear infinite",
          boxShadow: "0 0 12px #20b2a6",
        }} />
        {/* Inner slower ring */}
        <div style={{
          position: "absolute",
          inset: "10px",
          borderRadius: "50%",
          border: "2px solid transparent",
          borderBottomColor: "#a0f0ec",
          borderLeftColor: "#a0f0ec",
          animation: "loader-spin 1.5s linear infinite reverse",
          opacity: 0.6,
        }} />
        {/* Center logo */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.25rem",
          fontWeight: "700",
          color: "#f0f2f5",
          letterSpacing: "-0.02em",
        }}>
          CS<span style={{ color: "#20b2a6" }}>.</span>
        </div>
      </div>

      {/* Name */}
      <div style={{
        textAlign: "center",
        animation: "loader-fade-up 0.6s ease both",
        animationDelay: "0.2s",
      }}>
        <p style={{
          fontSize: "0.8rem",
          color: "#7a8491",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}>
          Chandan Sikarwar
        </p>
      </div>

      {/* Progress bar */}
      <div style={{
        width: "140px",
        height: "2px",
        backgroundColor: "#1a2329",
        borderRadius: "999px",
        overflow: "hidden",
        animation: "loader-fade-up 0.6s ease both",
        animationDelay: "0.3s",
      }}>
        <div style={{
          height: "100%",
          backgroundColor: "#20b2a6",
          borderRadius: "999px",
          boxShadow: "0 0 8px #20b2a6",
          animation: "loader-progress 4.8s ease forwards",
        }} />
      </div>
    </div>
  );
}
