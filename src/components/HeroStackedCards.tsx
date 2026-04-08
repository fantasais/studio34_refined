import { useCallback, useEffect, useRef } from "react";

interface StackPanel {
  id: string;
  titleEn: string;
  titleHi: string;
  descriptor: string;
  image: string;
  imageAlt: string;
  objectPosition?: string;
}

const panels: StackPanel[] = [
  {
    id: "origin",
    titleEn: "ORIGIN",
    titleHi: "बिंदु",
    descriptor: "The singular point where intent first appears.",
    image: "/assets/hero/origin-concept.jpg",
    imageAlt: "Studio34 concept study in silver",
    objectPosition: "center center",
  },
  {
    id: "form",
    titleEn: "FORM",
    titleHi: "आकार",
    descriptor: "Where proportion, mass and gesture begin to resolve.",
    image: "/assets/uploads/form-019d2482-f392-72e0-acc6-ea06f69b3092-4.jpg",
    imageAlt: "Form development model",
    objectPosition: "center center",
  },
  {
    id: "craft",
    titleEn: "CRAFT",
    titleHi: "सतह",
    descriptor: "Material intelligence that gives surface its authority.",
    image: "/assets/uploads/sculpting-019d263c-039f-748c-af5a-1374861303a6-5.jpg",
    imageAlt: "Studio34 clay and sculpting work",
    objectPosition: "center center",
  },
  {
    id: "balance",
    titleEn: "BALANCE",
    titleHi: "साम्य",
    descriptor: "Stance, tension and restraint held in one expression.",
    image: "/assets/uploads/hp4-019d263c-6289-757e-9e1e-5166960999d1-4.jpg",
    imageAlt: "Studio34 concept render in silver",
    objectPosition: "center center",
  },
  {
    id: "motion",
    titleEn: "MOTION",
    titleHi: "गति",
    descriptor: "Momentum carried from first mark to final execution.",
    image: "/assets/hero/motion-concept.jpg",
    imageAlt: "Studio34 concept render in red",
    objectPosition: "center center",
  },
];

const TOTAL_PANELS = panels.length;
const SCROLL_PER_CARD = 1 / (TOTAL_PANELS - 1);

function RadiatingDot() {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: "38%",
        left: "52%",
        transform: "translate(-50%, -50%)",
        zIndex: 5,
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: "80px",
            height: "80px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "1px solid oklch(0.65 0.201 36.9 / 0.35)",
            animation: "bindu-ring 3.5s ease-out infinite",
            animationDelay: `${i * 1.15}s`,
          }}
        />
      ))}
      <div
        className="relative rounded-full"
        style={{
          width: "6px",
          height: "6px",
          background: "oklch(0.65 0.201 36.9)",
          boxShadow: "0 0 8px 2px oklch(0.65 0.201 36.9 / 0.6)",
          animation: "bindu-pulse 3.5s ease-in-out infinite",
          position: "relative",
          zIndex: 10,
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "5px",
          height: "5px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "oklch(0.98 0.005 80)",
          boxShadow:
            "0 0 6px 3px oklch(0.98 0.005 80 / 0.9), 0 0 14px 6px oklch(0.65 0.201 36.9 / 0.5)",
          zIndex: 20,
        }}
      />
    </div>
  );
}

export default function HeroStackedCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const lastScrollRef = useRef<number>(-1);

  const updateCards = useCallback(() => {
    const easeInOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrolled = -rect.top;
    const scrollRange = sectionHeight - viewportHeight;
    const rawProgress =
      scrollRange > 0 ? Math.max(0, Math.min(1, scrolled / scrollRange)) : 0;

    if (Math.abs(rawProgress - lastScrollRef.current) < 0.0001) return;
    lastScrollRef.current = rawProgress;

    let newActiveIndex = 0;

    for (let i = 0; i < TOTAL_PANELS - 1; i++) {
      const segStart = i * SCROLL_PER_CARD;
      const segEnd = (i + 1) * SCROLL_PER_CARD;
      const segProgress = Math.max(
        0,
        Math.min(1, (rawProgress - segStart) / (segEnd - segStart)),
      );
      const easedProgress = easeInOut(segProgress);

      const card = cardRefs.current[i];
      if (!card) continue;

      if (segProgress >= 1) {
        card.style.transform = "translateY(-100%)";
        card.style.opacity = "0";
        card.style.pointerEvents = "none";
        newActiveIndex = i + 1;
      } else if (segProgress > 0) {
        const translateY = -easedProgress * 100;
        const scale = 1 - easedProgress * 0.04;
        card.style.transform = `translateY(${translateY}%) scale(${scale})`;
        card.style.opacity = `${1 - easedProgress * 0.55}`;
        card.style.pointerEvents = "none";
        newActiveIndex = i;
      } else {
        card.style.transform = "translateY(0%) scale(1)";
        card.style.opacity = "1";
        card.style.pointerEvents = "auto";
      }
    }

    const lastCard = cardRefs.current[TOTAL_PANELS - 1];
    if (lastCard) {
      lastCard.style.transform = "translateY(0%) scale(1)";
      lastCard.style.opacity = "1";
    }

    textRefs.current.forEach((textEl, i) => {
      if (!textEl) return;
      let textOpacity = 0;
      let textTranslate = 12;

      if (i === 0) {
        const seg = Math.max(0, Math.min(1, rawProgress / SCROLL_PER_CARD));
        textOpacity = 1 - easeInOut(seg);
        textTranslate = -easeInOut(seg) * 12;
      } else if (i === TOTAL_PANELS - 1) {
        const segStart = (TOTAL_PANELS - 2) * SCROLL_PER_CARD;
        const seg = Math.max(
          0,
          Math.min(1, (rawProgress - segStart) / SCROLL_PER_CARD),
        );
        textOpacity = easeInOut(seg);
        textTranslate = (1 - easeInOut(seg)) * 12;
      } else {
        const fadeInStart = (i - 1) * SCROLL_PER_CARD;
        const fadeInEnd = i * SCROLL_PER_CARD;
        const fadeOutEnd = (i + 1) * SCROLL_PER_CARD;
        const fadeIn = Math.max(
          0,
          Math.min(1, (rawProgress - fadeInStart) / (fadeInEnd - fadeInStart)),
        );
        const fadeOut = Math.max(
          0,
          Math.min(1, (rawProgress - fadeInEnd) / (fadeOutEnd - fadeInEnd)),
        );
        textOpacity = easeInOut(fadeIn) * (1 - easeInOut(fadeOut));
        textTranslate = (1 - easeInOut(fadeIn)) * 12 - easeInOut(fadeOut) * 12;
      }

      textEl.style.opacity = `${Math.max(0, textOpacity)}`;
      textEl.style.transform = `translateY(${textTranslate}px)`;
      textEl.style.pointerEvents = textOpacity > 0.5 ? "auto" : "none";
    });

    if (dotsRef.current) {
      const dotEls = dotsRef.current.querySelectorAll<HTMLDivElement>("[data-dot]");
      dotEls.forEach((dot, i) => {
        if (i === newActiveIndex) {
          dot.style.width = "20px";
          dot.style.background = "oklch(0.65 0.201 36.9)";
        } else {
          dot.style.width = "4px";
          dot.style.background = "oklch(0.65 0.201 36.9 / 0.3)";
        }
      });
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateCards);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateCards();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateCards]);

  const sectionHeight = `calc(${TOTAL_PANELS} * var(--full-screen-height))`;

  return (
    <div ref={sectionRef} id="hero" style={{ height: sectionHeight, position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "var(--full-screen-height)",
          overflow: "hidden",
          background: "oklch(0.08 0.006 60)",
        }}
      >
        {panels.map((panel, i) => (
          <div
            key={panel.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: TOTAL_PANELS - i,
              willChange: "transform, opacity",
              transformOrigin: "center bottom",
              transition: "none",
            }}
          >
            <img
              src={panel.image}
              alt={panel.imageAlt}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0.52, objectPosition: panel.objectPosition ?? "center center" }}
              draggable={false}
              loading={i === 0 ? "eager" : "lazy"}
              decoding={i === 0 ? "sync" : "async"}
              fetchPriority={i === 0 ? "high" : "low"}
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, oklch(0.06 0.006 60 / 0.72) 0%, oklch(0.08 0.006 60 / 0.52) 40%, oklch(0.10 0.006 60 / 0.34) 70%, oklch(0.08 0.006 60 / 0.42) 100%)",
              }}
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.06 0.006 60 / 0.60) 0%, oklch(0.06 0.006 60 / 0.28) 50%, transparent 82%)",
              }}
            />

            {panel.id === "origin" && <RadiatingDot />}

            {i < TOTAL_PANELS - 1 && (
              <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{
                  height: "80px",
                  background:
                    "linear-gradient(to top, oklch(0.04 0.006 60 / 0.42), transparent)",
                  zIndex: 2,
                }}
              />
            )}
          </div>
        ))}

        {panels.map((panel, i) => (
          <div
            key={`text-${panel.id}`}
            ref={(el) => {
              textRefs.current[i] = el;
            }}
            className="absolute inset-0 flex items-end"
            style={{
              zIndex: TOTAL_PANELS + 1,
              opacity: i === 0 ? 1 : 0,
              transform: i === 0 ? "translateY(0)" : "translateY(12px)",
              transition: "none",
              padding: "0 clamp(1.25rem, 5vw, 4rem) clamp(6.5rem, 10vh, 8rem)",
            }}
          >
            <div className="max-w-3xl">
              <div className="flex items-end gap-3 md:gap-4 mb-4 md:mb-5 flex-wrap">
                <span
                  style={{
                    fontFamily: "Barlow, sans-serif",
                    fontWeight: 200,
                    letterSpacing: "0.22em",
                    fontSize: "clamp(1.65rem, 6vw, 4.6rem)",
                    textTransform: "uppercase",
                    lineHeight: 0.95,
                    color: "oklch(0.97 0.006 80)",
                    textShadow: "0 2px 18px oklch(0.04 0.006 60 / 0.82)",
                  }}
                >
                  {panel.titleEn}
                </span>
                <span
                  style={{
                    fontFamily: "Noto Sans Devanagari, sans-serif",
                    fontWeight: 200,
                    fontSize: "clamp(0.9rem, 2vw, 1.45rem)",
                    letterSpacing: "0.05em",
                    color: "oklch(0.65 0.201 36.9)",
                    lineHeight: 1.2,
                    paddingBottom: "0.3rem",
                  }}
                >
                  {panel.titleHi}
                </span>
              </div>

              <div
                className="h-px w-12 mb-4 md:mb-5"
                style={{ background: "oklch(0.65 0.201 36.9 / 0.45)" }}
              />

              <p
                className="max-w-[30ch] md:max-w-[48ch]"
                style={{
                  fontFamily: "Barlow, sans-serif",
                  fontWeight: 300,
                  letterSpacing: "0.05em",
                  lineHeight: "1.72",
                  fontSize: "clamp(0.9rem, 1.25vw, 1rem)",
                  color: "oklch(0.92 0.006 70)",
                  textShadow: "0 1px 10px oklch(0.04 0.006 60 / 0.9)",
                }}
              >
                {panel.descriptor}
              </p>
            </div>
          </div>
        ))}

        <div
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.06 0.006 60 / 0.42), transparent)",
            zIndex: TOTAL_PANELS + 2,
          }}
        />

        <div
          className="absolute bottom-8 right-6 md:right-16 hidden md:flex flex-col items-end gap-2 pointer-events-none"
          style={{ zIndex: TOTAL_PANELS + 3 }}
        >
          <span
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 300,
              fontSize: "0.72rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "oklch(0.65 0.201 36.9)",
              textShadow: "0 2px 12px oklch(0.08 0.006 60 / 0.6)",
            }}
          >
            28.4595° N, 77.0266° E
          </span>
          <div
            className="h-px w-10"
            style={{ background: "oklch(0.65 0.201 36.9 / 0.5)" }}
          />
        </div>

        <div
          ref={dotsRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-3 pointer-events-none"
          style={{ zIndex: TOTAL_PANELS + 3 }}
        >
          {panels.map((panel, i) => (
            <div
              key={panel.id}
              data-dot
              style={{
                width: i === 0 ? "20px" : "4px",
                height: "2px",
                background:
                  i === 0
                    ? "oklch(0.65 0.201 36.9)"
                    : "oklch(0.65 0.201 36.9 / 0.3)",
                transition: "all 0.4s ease",
                borderRadius: "1px",
              }}
            />
          ))}
        </div>

        <div
          className="absolute md:hidden"
          style={{
            bottom: "2rem",
            left: "1.25rem",
            zIndex: TOTAL_PANELS + 3,
          }}
        >
          <span
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 300,
              letterSpacing: "0.2em",
              fontSize: "0.7rem",
              textTransform: "uppercase",
              color: "oklch(0.65 0.201 36.9)",
            }}
          >
            Studio34 · Manesar
          </span>
        </div>
      </div>
    </div>
  );
}
