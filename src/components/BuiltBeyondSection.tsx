import { useEffect, useRef, useState } from "react";

export default function BuiltBeyondSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id="built-beyond"
      data-ocid="built.beyond.section"
      className="relative w-full"
      style={{ background: "oklch(0.97 0.006 80)", scrollMarginTop: "80px" }}
    >
      {/* Full-width image with heading pinned to bottom center */}
      <div
        className="relative w-full overflow-hidden flex items-end justify-center"
        style={{
          height: "clamp(260px, 46vh, 540px)",
          paddingBottom: "clamp(1.5rem, 4vh, 3rem)",
        }}
      >
        <img
          src="/assets/uploads/eva-019d2482-f346-7798-a29e-6262d95ec9b1-3.jpg"
          alt="Studio34 craft"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: visible ? "scale(1)" : "scale(1.04)",
            transition: "transform 1.4s ease-out",
            objectPosition: "center 75%",
          }}
          loading="lazy"
          decoding="async"
        />

        {/* Subtle dark overlay for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.08 0.006 60 / 0.28) 0%, oklch(0.08 0.006 60 / 0.48) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Heading — pinned to bottom center of image */}
        <h2
          className="relative z-10 text-center px-6"
          style={{
            fontFamily: "Barlow, sans-serif",
            fontWeight: 200,
            letterSpacing: "0.22em",
            fontSize: "clamp(1.55rem, 3.8vw, 2.6rem)",
            textTransform: "uppercase",
            color: "oklch(0.96 0.004 80)",
            lineHeight: "1.1",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transition:
              "opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s",
          }}
        >
          Built beyond the sketch
        </h2>
      </div>
    </div>
  );
}
