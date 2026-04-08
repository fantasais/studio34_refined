import { Link } from "@tanstack/react-router";
import { useState } from "react";

const SERVICE_PILLARS = [
  {
    title: "Design",
    hindi: "रचना",
    description:
      "Concept ideation, form language development and design direction for vehicles and mobility products.",
  },
  {
    title: "Sculpting",
    hindi: "संरचना",
    description:
      "Clay modelling, CAD refinement and CNC-driven surface development with production awareness built in.",
  },
  {
    title: "Prototyping",
    hindi: "खाका",
    description:
      "Concept bucks, mock-ups and validation models that translate intent into testable, physical outcomes.",
  },
  {
    title: "CMF",
    hindi: "रूप-रंग-बनावट",
    description:
      "Colour, material and finish direction that makes the brand legible in the final product.",
  },
];

export default function ServicesSection() {
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);

  return (
    <section
      id="services"
      data-ocid="services.section"
      className="relative"
      style={{ background: "oklch(0.97 0.006 80)", scrollMarginTop: "80px" }}
    >
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent, oklch(0.65 0.201 36.9 / 0.25), transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 md:px-16 lg:px-24 py-24 md:py-32">
        <div className="mb-12 md:mb-20 flex flex-col items-center text-center gap-4">
          <p
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 400,
              letterSpacing: "0.32em",
              fontSize: "clamp(0.68rem, 1vw, 0.78rem)",
              textTransform: "uppercase",
              color: "oklch(0.65 0.201 36.9)",
            }}
          >
            सेवाएँ — What we do
          </p>
          <h2
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 200,
              letterSpacing: "0.18em",
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              textTransform: "uppercase",
              color: "oklch(0.12 0.006 60)",
              lineHeight: "1.1",
            }}
          >
            From line to life
          </h2>
          <p
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
              lineHeight: 1.75,
              color: "oklch(0.40 0.006 62)",
              maxWidth: "56ch",
            }}
          >
            Studio34 operates across concept, surface, prototype and finish — with enough depth to carry a program beyond presentation boards.
          </p>
          <div
            style={{
              height: "1px",
              width: "min(220px, 42%)",
              background:
                "linear-gradient(to right, transparent, oklch(0.65 0.201 36.9 / 0.4), transparent)",
            }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-10 items-start justify-items-center w-full">
          {SERVICE_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col items-center text-center w-full max-w-[320px]"
            >
              <div
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "oklch(0.65 0.201 36.9)",
                  marginBottom: "1.1rem",
                }}
              />

              <Link
                to="/work"
                hash="work-services"
                onMouseEnter={() => setHoveredTitle(pillar.title)}
                onMouseLeave={() => setHoveredTitle(null)}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span
                  style={{
                    fontFamily: "Barlow, sans-serif",
                    fontWeight: 300,
                    letterSpacing: "0.24em",
                    fontSize: "clamp(1rem, 1.45vw, 1.08rem)",
                    textTransform: "uppercase",
                    color:
                      hoveredTitle === pillar.title
                        ? "oklch(0.65 0.201 36.9)"
                        : "oklch(0.12 0.006 60)",
                    display: "block",
                    marginBottom: "0.45rem",
                    transition: "color 0.2s ease",
                  }}
                >
                  {pillar.title}
                </span>
              </Link>

              <span
                style={{
                  fontFamily: "Noto Sans Devanagari, sans-serif",
                  fontWeight: 200,
                  fontSize: "clamp(0.82rem, 1.2vw, 0.92rem)",
                  color: "oklch(0.65 0.201 36.9)",
                  display: "block",
                  marginBottom: "1rem",
                  letterSpacing: "0.04em",
                }}
              >
                {pillar.hindi}
              </span>

              <div
                style={{
                  height: "1px",
                  width: "36px",
                  background: "oklch(0.65 0.201 36.9 / 0.35)",
                  marginBottom: "1rem",
                }}
              />

              <p
                style={{
                  fontFamily: "Barlow, sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(0.9rem, 1vw, 0.95rem)",
                  lineHeight: "1.82",
                  color: "oklch(0.40 0.006 62)",
                  textAlign: "center",
                }}
              >
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
