import { useEffect, useRef, useState } from "react";

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-10 md:mb-14">
      <p
        style={{
          fontFamily: "Barlow, sans-serif",
          fontWeight: 400,
          letterSpacing: "0.28em",
          fontSize: "0.72rem",
          textTransform: "uppercase",
          color: "oklch(0.65 0.201 36.9)",
          marginBottom: "0.75rem",
        }}
      >
        {eyebrow}
      </p>
      <h2
        style={{
          fontFamily: "Barlow, sans-serif",
          fontWeight: 200,
          letterSpacing: "0.22em",
          fontSize: "clamp(1.4rem, 3.5vw, 2.24rem)",
          textTransform: "uppercase",
          color: "oklch(0.12 0.006 60)",
          lineHeight: "1.1",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          marginTop: "1.25rem",
          height: "1px",
          background:
            "linear-gradient(to right, oklch(0.65 0.201 36.9 / 0.35), transparent)",
          width: "min(320px, 60%)",
        }}
      />
    </div>
  );
}

function HeroSection() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="ideology-hero"
      data-ocid="ideology.hero.section"
      className="relative overflow-hidden min-h-[55vh] md:min-h-[78vh]"
      style={{ scrollMarginTop: "80px", background: "oklch(0.08 0.006 60)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 72% 38%, oklch(0.65 0.201 36.9 / 0.10), transparent 40%), radial-gradient(circle at 18% 82%, oklch(0.65 0.201 36.9 / 0.06), transparent 30%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "40%",
          background:
            "linear-gradient(to top, oklch(0.08 0.006 60 / 0.60), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Centered typographic statement */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: "clamp(6rem, 14vh, 10rem)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 clamp(1.5rem, 6vw, 4rem)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        {/* Line 1 */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "0.4em",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 100,
              fontSize: "clamp(1.5rem, 5.5vw, 4.5rem)",
              letterSpacing: "0.06em",
              lineHeight: 1.15,
              color: "oklch(0.94 0.006 80)",
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 1050ms ease-out 120ms",
            }}
          >
            Design is not
          </span>
          <span
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(1.5rem, 5.5vw, 4.5rem)",
              letterSpacing: "0.06em",
              lineHeight: 1.15,
              color: "oklch(0.65 0.201 36.9)",
              whiteSpace: "nowrap",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(12px)",
              transition:
                "opacity 1050ms ease-out 720ms, transform 1050ms ease-out 720ms",
            }}
          >
            DECORATION
          </span>
        </div>
        {/* Line 2 */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "0.4em",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "0.3em",
          }}
        >
          <span
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 100,
              fontSize: "clamp(1.5rem, 5.5vw, 4.5rem)",
              letterSpacing: "0.06em",
              lineHeight: 1.15,
              color: "oklch(0.94 0.006 80)",
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 1050ms ease-out 120ms",
            }}
          >
            Design is
          </span>
          <span
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(1.5rem, 5.5vw, 4.5rem)",
              letterSpacing: "0.06em",
              lineHeight: 1.15,
              color: "oklch(0.65 0.201 36.9)",
              whiteSpace: "nowrap",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(12px)",
              transition:
                "opacity 1050ms ease-out 1250ms, transform 1050ms ease-out 1250ms",
            }}
          >
            DECISION
          </span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "clamp(1.5rem, 6vw, 4rem)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
            marginBottom: "1.5rem",
          }}
        >
          <h1
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 200,
              letterSpacing: "0.12em",
              fontSize: "clamp(1.5rem, 4vw, 2.6rem)",
              textTransform: "uppercase",
              color: "oklch(0.95 0.006 78)",
              lineHeight: 1,
              margin: 0,
            }}
          >
            OUR IDEOLOGY
          </h1>
          <div className="flex items-center gap-4">
            <span
              style={{
                fontFamily: "Noto Sans Devanagari, sans-serif",
                fontWeight: 200,
                fontSize: "clamp(0.82rem, 1.5vw, 1.4rem)",
                color: "oklch(0.65 0.201 36.9)",
                lineHeight: 1.2,
                paddingLeft: "0.1em",
              }}
            >
              विचार
            </span>
            <div
              style={{
                height: "1px",
                width: "clamp(40px, 8vw, 100px)",
                background: "oklch(0.65 0.201 36.9 / 0.45)",
                flexShrink: 0,
              }}
            />
          </div>
        </div>
        <p
          style={{
            fontFamily: "Barlow, sans-serif",
            fontWeight: 200,
            letterSpacing: "0.25em",
            fontSize: "clamp(0.72rem, 1vw, 0.8rem)",
            textTransform: "uppercase",
            color: "oklch(0.52 0.008 65)",
            margin: 0,
          }}
        >
          IDENTITY · CULTURE · PROCESS
        </p>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent, oklch(0.65 0.201 36.9 / 0.25), transparent)",
        }}
      />
    </section>
  );
}

function Meaning34Section() {
  const { ref, visible } = useReveal(0.12);

  return (
    <section
      id="meaning-34"
      data-ocid="ideology.meaning34.section"
      style={{ scrollMarginTop: "80px", background: "oklch(0.97 0.006 80)" }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-16 lg:px-24 py-24 md:py-32">
        {/* SectionHeader moved into left column — grid starts here */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-center">
          {/* LEFT COLUMN: heading + subheading + paragraph */}
          <div className="flex flex-col gap-6">
            <SectionHeader
              eyebrow="पहचान — Identity"
              title="The Meaning of 34"
            />

            <p
              style={{
                fontFamily: "Barlow, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(1.0rem, 1.8vw, 1.16rem)",
                lineHeight: 1.9,
                color: "oklch(0.12 0.006 60)",
                margin: 0,
              }}
            >
              34 is not just a number. It is a coded identity
            </p>
            <p
              style={{
                fontFamily: "Barlow, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(0.86rem, 1.3vw, 0.96rem)",
                lineHeight: 1.9,
                color: "oklch(0.12 0.006 60)",
                margin: 0,
              }}
            >
              34 represents the address where automotive design began for us.
              34, Via San Quintino, Torino — lives inside this name. The meaning
              runs even deeper though. Through the integration of{" "}
              <span
                style={{
                  fontFamily: "Noto Sans Devanagari, sans-serif",
                  color: "oklch(0.65 0.201 36.9)",
                  fontWeight: 500,
                  fontSize: "1.15em",
                }}
              >
                अ
              </span>{" "}
              — the first sound, origin of all language — this mark becomes a
              declaration. Origin. Foundation. First Principles.
            </p>
          </div>

          {/* RIGHT COLUMN: identity panel — no black background, ghost logo */}
          <div
            ref={ref}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                border: "1px solid oklch(0.65 0.201 36.9 / 0.18)",
                minHeight: "clamp(340px, 52vw, 520px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "clamp(1.5rem, 3vw, 2.25rem)",
              }}
            >
              {/* Ghost logo background image */}
              <img
                src="/assets/new34_logo.png"
                alt=""
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  opacity: 0.065,
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />

              {/* TOP child: eyebrow label */}
              <div style={{ position: "relative", zIndex: 1 }}>
                <p
                  style={{
                    fontFamily: "Barlow, sans-serif",
                    fontWeight: 300,
                    letterSpacing: "0.22em",
                    fontSize: "0.72rem",
                    textTransform: "uppercase",
                    color: "oklch(0.65 0.201 36.9)",
                    marginBottom: "0",
                  }}
                >
                  Identity Unveiled
                </p>
              </div>

              {/* BOTTOM child: paragraph + CTA */}
              <div style={{ position: "relative", zIndex: 1 }}>
                <p
                  style={{
                    fontFamily: "Barlow, sans-serif",
                    fontWeight: 300,
                    fontSize: "clamp(0.86rem, 1.3vw, 0.96rem)",
                    lineHeight: 1.85,
                    color: "oklch(0.38 0.006 62)",
                    maxWidth: "28rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  The reveal film marks the shift from where Studio34 began to
                  how Studio34 now stands
                </p>

                <a
                  href="https://www.youtube.com/watch?v=izv8bPabbPY"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-block",
                    fontFamily: "Barlow, sans-serif",
                    fontWeight: 300,
                    letterSpacing: "0.22em",
                    fontSize: "0.68rem",
                    textTransform: "uppercase",
                    color: "oklch(0.12 0.006 60)",
                    border: "1px solid oklch(0.12 0.006 60 / 0.3)",
                    padding: "0.95rem 1.35rem",
                    textDecoration: "none",
                    transition: "border-color 0.25s ease, color 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "oklch(0.65 0.201 36.9)";
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "oklch(0.65 0.201 36.9)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "oklch(0.12 0.006 60 / 0.3)";
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "oklch(0.12 0.006 60)";
                  }}
                >
                  Watch the unveil
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IndiaLensSection() {
  const { ref, visible } = useReveal(0.12);

  const principles = [
    {
      label: "Context before styling",
      copy: "Roads, payloads, climate, maintenance: design inputs from day one.",
    },
    {
      label: "Aspiration without imitation",
      copy: "Progressive and globally legible without being visually borrowed.",
    },
    {
      label: "Precision inside constraints",
      copy: "Real constraints make the result relevant, buildable, credible.",
    },
  ];

  return (
    <section
      id="india-lens"
      data-ocid="ideology.lens.section"
      className="relative"
      style={{ scrollMarginTop: "80px", background: "oklch(0.97 0.006 80)" }}
    >
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent, oklch(0.65 0.201 36.9 / 0.18), transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 md:px-16 lg:px-24 py-24 md:py-32">
        <SectionHeader
          eyebrow="दृष्टिकोण — Perspective"
          title="The India Design Lens"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,0.85fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-stretch">
          {/* Left — Visual anchor, stretches to full column height */}
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              background: "oklch(0.10 0.006 60)",
              height: "100%",
              minHeight: "280px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              padding: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 50% 45%, oklch(0.65 0.201 36.9 / 0.12), transparent 55%)",
                pointerEvents: "none",
              }}
            />
            <p
              style={{
                fontFamily: "Noto Sans Devanagari, sans-serif",
                fontWeight: 100,
                fontSize: "clamp(3rem, 8vw, 6rem)",
                color: "oklch(0.65 0.201 36.9 / 0.35)",
                lineHeight: 1,
                margin: 0,
                position: "relative",
                zIndex: 1,
              }}
            >
              भारत
            </p>
            <p
              style={{
                fontFamily: "Barlow, sans-serif",
                fontWeight: 200,
                letterSpacing: "0.3em",
                fontSize: "0.72rem",
                textTransform: "uppercase",
                color: "oklch(0.55 0.008 65)",
                margin: 0,
                position: "relative",
                zIndex: 1,
              }}
            >
              India · Design Context
            </p>
          </div>

          {/* Right — Text + principles */}
          <div
            ref={ref}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <p
              style={{
                fontFamily: "Barlow, sans-serif",
                fontWeight: 200,
                fontSize: "clamp(1.3rem, 2.6vw, 2rem)",
                lineHeight: 1.3,
                color: "oklch(0.12 0.006 60)",
                marginBottom: "1.2rem",
              }}
            >
              India is not a borrowed moodboard. It is a living design context.
            </p>

            <p
              style={{
                fontFamily: "Barlow, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(0.86rem, 1.3vw, 0.96rem)",
                lineHeight: 1.9,
                color: "oklch(0.38 0.006 62)",
                maxWidth: "36rem",
                marginBottom: "1.8rem",
              }}
            >
              Studio34 reads India as behavior, aspiration, repair logic, value
              sensitivity, and daily use — not as an aesthetic surface to apply
              at the end.
            </p>

            <div>
              {principles.map((p, i) => (
                <div
                  key={p.label}
                  style={{
                    paddingTop: i === 0 ? 0 : "1rem",
                    paddingBottom: "1rem",
                    borderTop:
                      i === 0
                        ? "none"
                        : "1px solid oklch(0.12 0.006 60 / 0.08)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Barlow, sans-serif",
                      fontWeight: 300,
                      letterSpacing: "0.18em",
                      fontSize: "0.68rem",
                      textTransform: "uppercase",
                      color: "oklch(0.65 0.201 36.9)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {p.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "Barlow, sans-serif",
                      fontWeight: 300,
                      fontSize: "0.88rem",
                      lineHeight: 1.8,
                      color: "oklch(0.38 0.006 62)",
                      margin: 0,
                    }}
                  >
                    {p.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DualitySection() {
  const { ref, visible } = useReveal(0.12);

  return (
    <section
      id="duality"
      data-ocid="ideology.duality.section"
      className="relative pb-20 md:pb-28"
      style={{ scrollMarginTop: "80px", background: "oklch(0.97 0.006 80)" }}
    >
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent, oklch(0.65 0.201 36.9 / 0.18), transparent)",
        }}
      />

      {/* Two-line atmospheric statement */}
      <div className="mx-auto max-w-7xl px-6 md:px-16 lg:px-24 pt-20 md:pt-28 pb-10 md:pb-12">
        <p
          style={{
            fontFamily: "Barlow, sans-serif",
            fontWeight: 200,
            letterSpacing: "0.08em",
            fontSize: "clamp(0.82rem, 1.4vw, 1.05rem)",
            lineHeight: 1.5,
            color: "oklch(0.45 0.008 62)",
            marginBottom: "0.6rem",
            textTransform: "uppercase",
          }}
        >
          Craft brings emotion{" "}
          <span style={{ color: "oklch(0.65 0.201 36.9)", margin: "0 0.4em" }}>
            |
          </span>{" "}
          Digital brings precision
        </p>
        <p
          style={{
            fontFamily: "Noto Sans Devanagari, sans-serif",
            fontWeight: 300,
            letterSpacing: "0.02em",
            fontSize: "clamp(0.96rem, 1.8vw, 1.28rem)",
            lineHeight: 1.55,
            color: "oklch(0.65 0.201 36.9)",
            margin: 0,
          }}
        >
          यही संतुलन है —{" "}
          <span
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 300,
              letterSpacing: "0.04em",
              color: "oklch(0.38 0.006 62)",
            }}
          >
            This is the balance.
          </span>
        </p>
      </div>

      {/* Full-width visual split — no container padding, bleeds edge to edge */}
      <div
        ref={ref}
        className="flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_7px_minmax(0,1fr)]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.72s ease, transform 0.72s ease",
          minHeight: "clamp(340px, 48vw, 560px)",
        }}
      >
        {/* Left — Craft / dark textured placeholder */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            isolation: "isolate",
            background: "oklch(0.10 0.006 60)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "clamp(2rem, 4vw, 3.5rem)",
            minHeight: "280px",
          }}
        >
          <img
            src="/assets/uploads/clay-019d2482-f1ae-764d-bebb-758bb54e4cac-2.jpg"
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, oklch(0 0 0 / 0.55) 0%, transparent 50%)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          <div style={{ position: "relative", zIndex: 2 }}>
            <p
              style={{
                fontFamily: "Barlow, sans-serif",
                fontWeight: 300,
                letterSpacing: "0.22em",
                fontSize: "0.72rem",
                textTransform: "uppercase",
                color: "oklch(0.97 0.006 80)",
                marginBottom: "0.85rem",
              }}
            >
              Craft · Intuition
            </p>
          </div>
        </div>

        {/* Mobile-only horizontal divider */}
        <div
          className="lg:hidden"
          style={{ height: "10px", background: "oklch(0.65 0.201 36.9)" }}
        />

        {/* Thick terracotta divider with glow — desktop only */}
        <div
          className="hidden lg:block"
          style={{
            background: "oklch(0.65 0.201 36.9)",
            boxShadow:
              "0 0 28px oklch(0.65 0.201 36.9 / 0.45), 0 0 6px oklch(0.65 0.201 36.9 / 0.6)",
          }}
        />

        {/* Right — Precision / light grid placeholder */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            isolation: "isolate",
            background: "oklch(0.985 0.004 82)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "clamp(2rem, 4vw, 3.5rem)",
            minHeight: "280px",
          }}
        >
          <img
            src="/assets/uploads/cad-019d2482-f17d-714c-a44b-1faf16c4959f-1.jpg"
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, oklch(0 0 0 / 0.55) 0%, transparent 50%)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          <div style={{ position: "relative", zIndex: 2 }}>
            <p
              style={{
                fontFamily: "Barlow, sans-serif",
                fontWeight: 300,
                letterSpacing: "0.22em",
                fontSize: "0.72rem",
                textTransform: "uppercase",
                color: "oklch(0.97 0.006 80)",
                marginBottom: "0.85rem",
              }}
            >
              Precision · Control
            </p>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div style={{ height: "clamp(3rem, 6vw, 5rem)" }} />
    </section>
  );
}

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Read the context, not just the brief.",
    copy: "Brand, market, user, package, and commercial reality are understood together.",
    meta: "Brand · Market · User · Constraints",
  },
  {
    number: "02",
    title: "Define what the product must stand for.",
    copy: "Meaning and positioning are clarified before the work chases visual novelty.",
    meta: "Intent · Positioning · Character",
  },
  {
    number: "03",
    title: "Develop form through physical and digital loops.",
    copy: "Sketch, clay, CAD, and surface studies work until the answer resolves right.",
    meta: "Sketch · Clay · CAD · Surface",
  },
  {
    number: "04",
    title: "Resolve toward build, not just presentation.",
    copy: "The result carries enough precision to move into prototyping and production logic.",
    meta: "Prototype · Validation · Production Logic",
  },
];

const PROCESS_STICKY_HEIGHT_CAP = 700;

function ProcessSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const el = outerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrolled = -rect.top;
      const stickyPanelHeight = Math.min(
        window.innerHeight,
        PROCESS_STICKY_HEIGHT_CAP,
      );
      const totalScrollable = el.offsetHeight - stickyPanelHeight;

      if (scrolled <= 0) {
        setActiveStep(0);
        return;
      }

      if (scrolled >= totalScrollable) {
        setActiveStep(PROCESS_STEPS.length - 1);
        return;
      }

      const progress = scrolled / totalScrollable;
      const step = Math.min(
        Math.floor(progress * PROCESS_STEPS.length),
        PROCESS_STEPS.length - 1,
      );
      setActiveStep(step);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Changed from 4 * 26 + 100 = 204vh to 4 * 22 + 80 = 168vh for crisper scroll pace
  const sectionHeightVh = PROCESS_STEPS.length * 22 + 80;

  return (
    <div
      ref={outerRef}
      id="process"
      data-ocid="ideology.process.outer"
      style={{
        scrollMarginTop: "80px",
        height: isMobile
          ? `${PROCESS_STEPS.length * 28 + 72}svh`
          : `${sectionHeightVh}vh`,
        position: "relative",
        background: "oklch(0.97 0.006 80)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent, oklch(0.65 0.201 36.9 / 0.18), transparent)",
        }}
      />

      <div
        style={{
          position: "sticky",
          top: 0,
          height: isMobile
            ? "72svh"
            : `min(100vh, ${PROCESS_STICKY_HEIGHT_CAP}px)`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "clamp(4rem, 8vh, 6rem)",
          paddingBottom: "clamp(1.5rem, 3vh, 3rem)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 82% 50%, oklch(0.65 0.201 36.9 / 0.06), transparent 32%)",
            pointerEvents: "none",
          }}
        />

        <img
          src="/assets/uploads/new34_logo-1.png"
          aria-hidden="true"
          alt=""
          style={{
            position: "absolute",
            left: "58%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "clamp(18rem, 36vw, 42rem)",
            opacity: 0.04,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 0,
            filter: "grayscale(1)",
          }}
        />

        <div
          className="mx-auto max-w-7xl px-6 md:px-16 lg:px-24 w-full"
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Tightened from mb-8 md:mb-10 to mb-6 md:mb-8 */}
          <div className="mb-6 md:mb-8">
            <SectionHeader
              eyebrow="विचारधारा — Discipline"
              title="The Process"
            />
            <p
              style={{
                fontFamily: "Barlow, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(0.84rem, 1.15vw, 0.92rem)",
                lineHeight: 1.9,
                color: "oklch(0.38 0.006 62)",
                maxWidth: "30rem",
                margin: 0,
              }}
            >
              A disciplined progression from context to form to validation. Four
              steps. No shortcuts.
            </p>
          </div>

          <div
            style={{
              position: "relative",
              minHeight: "clamp(10rem, 22vh, 16rem)",
            }}
          >
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.number}
                data-ocid={`ideology.process.item.${idx + 1}`}
                style={{
                  position: idx === 0 ? "relative" : "absolute",
                  top: idx === 0 ? undefined : 0,
                  left: 0,
                  right: 0,
                  opacity: activeStep === idx ? 1 : 0,
                  transform:
                    activeStep === idx
                      ? "translateY(0)"
                      : activeStep > idx
                        ? `translateY(${isMobile ? "-19px" : "-28px"})`
                        : `translateY(${isMobile ? "19px" : "28px"})`,
                  transition:
                    "opacity 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1)",
                  pointerEvents: activeStep === idx ? "auto" : "none",
                }}
              >
                {/* Mobile layout */}
                <div className="flex flex-col gap-3 md:hidden">
                  <p
                    style={{
                      fontFamily: "Barlow, sans-serif",
                      fontWeight: 300,
                      letterSpacing: "0.18em",
                      fontSize: "0.68rem",
                      textTransform: "uppercase" as const,
                      color: "oklch(0.65 0.201 36.9)",
                      margin: 0,
                    }}
                  >
                    {step.number} /{" "}
                    {String(PROCESS_STEPS.length).padStart(2, "0")}
                  </p>
                  <div
                    style={{
                      width: "2.5rem",
                      height: "1px",
                      background: "oklch(0.65 0.201 36.9 / 0.45)",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "Barlow, sans-serif",
                      fontWeight: 200,
                      letterSpacing: "0.14em",
                      fontSize: "0.85rem",
                      textTransform: "uppercase" as const,
                      color: "oklch(0.12 0.006 60)",
                      lineHeight: 1.35,
                      margin: 0,
                    }}
                  >
                    {step.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "Barlow, sans-serif",
                      fontWeight: 300,
                      fontSize: "0.82rem",
                      lineHeight: 1.85,
                      color: "oklch(0.38 0.006 62)",
                      margin: 0,
                    }}
                  >
                    {step.copy}
                  </p>
                  <p
                    style={{
                      fontFamily: "Barlow, sans-serif",
                      fontWeight: 300,
                      letterSpacing: "0.16em",
                      fontSize: "0.7rem",
                      textTransform: "uppercase" as const,
                      color: "oklch(0.65 0.201 36.9)",
                      margin: 0,
                    }}
                  >
                    {step.meta}
                  </p>
                </div>

                {/* Desktop layout */}
                <div
                  className="hidden md:grid"
                  style={{
                    gridTemplateColumns:
                      "minmax(48px, auto) 1px minmax(0, 1fr)",
                    alignItems: "center",
                    columnGap: "clamp(1rem, 3vw, 2.5rem)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Barlow, sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(2.1rem, 4.8vw, 3.8rem)",
                      color: "oklch(0.12 0.006 60)",
                      opacity: 0.13,
                      lineHeight: 1,
                      userSelect: "none",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {step.number}
                  </span>

                  <div
                    style={{
                      width: "1px",
                      height: "clamp(4rem, 12vh, 7rem)",
                      background:
                        "linear-gradient(to bottom, oklch(0.65 0.201 36.9 / 0.45), oklch(0.65 0.201 36.9 / 0.08))",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.85rem",
                      maxWidth: "48rem",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Barlow, sans-serif",
                        fontWeight: 200,
                        letterSpacing: "0.14em",
                        fontSize: "clamp(0.82rem, 1.45vw, 1.08rem)",
                        textTransform: "uppercase",
                        color: "oklch(0.12 0.006 60)",
                        lineHeight: 1.35,
                        margin: 0,
                      }}
                    >
                      {step.title}
                    </p>

                    <p
                      style={{
                        fontFamily: "Barlow, sans-serif",
                        fontWeight: 300,
                        fontSize: "clamp(0.82rem, 1.1vw, 0.92rem)",
                        lineHeight: 1.85,
                        color: "oklch(0.38 0.006 62)",
                        margin: 0,
                      }}
                    >
                      {step.copy}
                    </p>

                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        paddingTop: "0.15rem",
                      }}
                    >
                      <div
                        style={{
                          width: "2rem",
                          height: "1px",
                          background: "oklch(0.65 0.201 36.9 / 0.35)",
                          flexShrink: 0,
                        }}
                      />
                      <p
                        style={{
                          fontFamily: "Barlow, sans-serif",
                          fontWeight: 300,
                          letterSpacing: "0.16em",
                          fontSize: "0.72rem",
                          textTransform: "uppercase",
                          color: "oklch(0.65 0.201 36.9)",
                          margin: 0,
                        }}
                      >
                        {step.meta}
                      </p>
                    </div>
                  </div>
                </div>
                {/* end desktop grid */}
              </div>
            ))}
          </div>

          {/* Progress indicator with Step X of 4 counter */}
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              marginTop: "clamp(2rem, 5vh, 4rem)",
              alignItems: "center",
            }}
          >
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.number}
                style={{
                  width: activeStep === idx ? "2.2rem" : "0.45rem",
                  height: "0.45rem",
                  borderRadius: "999px",
                  background:
                    activeStep === idx
                      ? "oklch(0.65 0.201 36.9)"
                      : "oklch(0.12 0.006 60 / 0.12)",
                  transition: "width 0.4s ease, background 0.4s ease",
                }}
              />
            ))}
            <p
              style={{
                fontFamily: "Barlow, sans-serif",
                fontWeight: 300,
                letterSpacing: "0.18em",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                color: "oklch(0.55 0.008 65)",
                margin: 0,
                marginLeft: "0.5rem",
              }}
            >
              Step {activeStep + 1} of {PROCESS_STEPS.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TurinClosingSection() {
  return (
    <section
      id="ideology-closing"
      style={{
        scrollMarginTop: "80px",
        background: "oklch(0.97 0.006 80)",
        padding: "clamp(5rem, 12vh, 9rem) 0",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-16 lg:px-24 flex flex-col items-center text-center gap-6">
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, oklch(0.65 0.201 36.9 / 0.3), transparent)",
            width: "100%",
            marginBottom: "1rem",
          }}
        />

        <p
          style={{
            fontFamily: "Barlow, sans-serif",
            fontWeight: 100,
            letterSpacing: "0.3em",
            fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
            textTransform: "uppercase",
            color: "oklch(0.12 0.006 60)",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          Turin Trained.
          <br />
          <span style={{ color: "oklch(0.65 0.201 36.9)" }}>India Built.</span>
        </p>

        <p
          style={{
            maxWidth: "36rem",
            fontFamily: "Barlow, sans-serif",
            fontWeight: 300,
            fontSize: "clamp(0.82rem, 1.2vw, 0.92rem)",
            lineHeight: 1.9,
            color: "oklch(0.38 0.006 62)",
            margin: 0,
          }}
        >
          Global discipline. Indian perspective. Production-aware design that
          moves with intent.
        </p>

        <div
          style={{
            height: "1px",
            width: "min(120px, 30%)",
            background:
              "linear-gradient(to right, transparent, oklch(0.65 0.201 36.9 / 0.4), transparent)",
          }}
        />

        <a
          href="mailto:info@studio34.in"
          data-ocid="ideology.collaborate.button"
          style={{
            marginTop: "0.5rem",
            display: "inline-block",
            fontFamily: "Barlow, sans-serif",
            fontWeight: 300,
            letterSpacing: "0.28em",
            fontSize: "clamp(0.72rem, 1.2vw, 0.78rem)",
            textTransform: "uppercase",
            color: "oklch(0.97 0.006 80)",
            background: "oklch(0.12 0.006 60)",
            border: "1px solid oklch(0.12 0.006 60)",
            borderRadius: "2px",
            padding: "1rem 2.75rem",
            textDecoration: "none",
            transition: "background 0.25s ease, border-color 0.25s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "oklch(0.65 0.201 36.9)";
            (e.currentTarget as HTMLAnchorElement).style.borderColor =
              "oklch(0.65 0.201 36.9)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "oklch(0.12 0.006 60)";
            (e.currentTarget as HTMLAnchorElement).style.borderColor =
              "oklch(0.12 0.006 60)";
          }}
        >
          Collaborate with Studio34
        </a>
      </div>
    </section>
  );
}

export default function IdeologyPage() {
  return (
    <main>
      <HeroSection />

      <div
        aria-hidden="true"
        style={{
          height: "88px",
          background:
            "linear-gradient(to bottom, oklch(0.08 0.006 60) 0%, oklch(0.18 0.006 60) 24%, oklch(0.48 0.006 65) 62%, oklch(0.97 0.006 80) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Section index — Ideology */}
<nav
  className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-4 z-40 pointer-events-auto"
  aria-label="Section index"
>
        {[
          { id: "meaning-34", label: "Identity" },
          { id: "process", label: "Process" },
        ].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            title={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              textDecoration: "none",
              opacity: 0.35,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "0.35";
            }}
          >
            <span
  style={{
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "oklch(0.65 0.201 36.9)",
    flexShrink: 0,
    display: "inline-block",
  }}
/>
            <span
              style={{
                fontFamily: "Barlow, sans-serif",
                fontWeight: 300,
                fontSize: "0.68rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "oklch(0.35 0.006 60)",
              }}
            >
              {item.label}
            </span>
          </a>
        ))}
      </nav>
      <Meaning34Section />
      <IndiaLensSection />
      <DualitySection />
      <ProcessSection />
      <TurinClosingSection />
    </main>
  );
}
