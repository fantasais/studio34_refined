import { useEffect, useRef, useState } from "react";

const TARGET_YEAR = 2017;
const DURATION_MS = 2200;

export default function CountdownSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / DURATION_MS, 1);
            const eased = 1 - (1 - progress) ** 3;
            const current = Math.round(eased * TARGET_YEAR);
            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setCount(TARGET_YEAR);
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      id="awards"
      className="relative"
      style={{ background: "oklch(0.97 0.006 80)", scrollMarginTop: "80px" }}
    >
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "clamp(180px, 42vh, 420px)",
          background:
            "linear-gradient(to bottom, oklch(0.08 0.006 60) 0%, oklch(0.12 0.006 60) 12%, oklch(0.25 0.006 62) 28%, oklch(0.45 0.006 65) 48%, oklch(0.68 0.007 72) 65%, oklch(0.85 0.007 78) 80%, oklch(0.97 0.006 80) 100%)",
          zIndex: 1,
        }}
      />

      <div
        className="relative flex flex-col items-center justify-center py-32 px-6"
        style={{ paddingTop: "clamp(200px, 50vh, 480px)", zIndex: 2 }}
      >
        <div
          className="mb-10"
          style={{
            width: "1px",
            height: "48px",
            background:
              "linear-gradient(to bottom, transparent, oklch(0.65 0.201 36.9 / 0.4))",
          }}
        />

        <div className="flex flex-col items-center gap-3 text-center">
          <p
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 100,
              letterSpacing: "0.35em",
              fontSize: "clamp(0.72rem, 1.25vw, 0.85rem)",
              textTransform: "uppercase",
              color: "oklch(0.45 0.008 65)",
            }}
          >
            Designing Since
          </p>

          <div
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 200,
              letterSpacing: "0.12em",
              fontSize: "clamp(5rem, 18vw, 14rem)",
              lineHeight: "0.85",
              color: "oklch(0.12 0.006 60)",
              fontVariantNumeric: "tabular-nums",
              minWidth: "4ch",
              textAlign: "center",
            }}
          >
            {count.toString().padStart(4, "0")}
          </div>

          <p
            style={{
              fontFamily: "Noto Sans Devanagari, sans-serif",
              fontWeight: 200,
              fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
              letterSpacing: "0.08em",
              color: "oklch(0.65 0.201 36.9)",
              marginTop: "0.5rem",
            }}
          >
            भारत से, विश्व के लिए
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-[7.2vw] gap-y-10 justify-items-center w-full max-w-4xl">
          {[
            {
              src: "/assets/uploads/qglue-4.png",
              line1: "Design Led",
              line2: "Entrepreneurship",
            },
            {
              src: "/assets/uploads/ibda-5.png",
              line1: "India's Best",
              line2: "Design Studio",
            },
            {
              src: "/assets/uploads/ibda-5.png",
              line1: "India's Best",
              line2: "Design Project",
            },
            {
              src: "/assets/uploads/cii-3.png",
              line1: "CII Design",
              line2: "Excellence",
            },
          ].map((award) => (
            <div
              key={award.line1 + award.line2}
              className="flex flex-col items-center gap-2 md:gap-4"
              style={{ opacity: 0.85 }}
            >
              <img
                src={award.src}
                alt={`${award.line1} ${award.line2}`}
                className="w-[96px] h-[96px] md:w-[216px] md:h-[216px]"
                style={{
                  objectFit: "contain",
                  background: "none",
                }}
                loading="lazy"
                decoding="async"
              />
              <span
                style={{
                  fontFamily: "Barlow, sans-serif",
                  fontWeight: 300,
                  letterSpacing: "0.2em",
                  fontSize: "0.88rem",
                  textTransform: "uppercase",
                  color: "oklch(0.45 0.008 65)",
                  textAlign: "center",
                  maxWidth: "160px",
                  lineHeight: "1.6",
                }}
              >
                {award.line1}
                <br />
                {award.line2}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
