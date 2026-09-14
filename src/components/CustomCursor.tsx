import React, { useEffect, useState } from "react";

interface CustomCursorProps {
  mode: "default" | "lens" | "button";
  lensSize?: number;
  enabled: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({
  mode,
  lensSize = 140,
  enabled,
}) => {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(true);

  useEffect(() => {
    // Check if pointer is fine (desktop mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsFinePointer(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!enabled || !isFinePointer || !isVisible) {
    return null;
  }

  const isLens = mode === "lens";
  const isButton = mode === "button";

  const size = isLens ? lensSize : isButton ? 44 : 20;

  return (
    <>
      {/* Outer follow circle */}
      <div
        className="fixed pointer-events-none z-50 rounded-full transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: `${size}px`,
          height: `${size}px`,
          border: isLens
            ? "1px solid rgba(244, 63, 94, 0.45)"
            : isButton
            ? "1px solid rgba(255, 255, 255, 0.4)"
            : "1px solid rgba(255, 255, 255, 0.25)",
          backgroundColor: isLens
            ? "rgba(244, 63, 94, 0.04)"
            : isButton
            ? "rgba(255, 255, 255, 0.06)"
            : "transparent",
          backdropFilter: isLens ? "invert(0.08) contrast(1.1)" : "none",
          boxShadow: isLens ? "0 0 20px rgba(244, 63, 94, 0.2)" : "none",
        }}
      />
      {/* Precision inner center dot */}
      <div
        className="fixed pointer-events-none z-50 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-75"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isLens ? "6px" : "4px",
          height: isLens ? "6px" : "4px",
          backgroundColor: isLens ? "#f43f5e" : "#ffffff",
        }}
      />
    </>
  );
};
