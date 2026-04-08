import { Link } from "@tanstack/react-router";
import { useState } from "react";

const milestones = [
  "Concept-to-prototype delivery for leading OEMs and global startups",
  "Zimmermann FZP27 CNC machine — precision at industrial scale",
  "End-to-end capability from concept development to functional prototypes",
];

const heroImage =
  "/assets/uploads/img_20250213_151843727_hdr_2-019d28f7-049a-736a-afa6-b113ef7444d3-2.jpg";

export default function StudioStorySection() {
  const [watchHovered, setWatchHovered] = useState(false);
  const [readHovered, setReadHovered] = useState(false);

  return (
    <section
      id="story"
      data-ocid="story.section"
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

      <div className="mx-auto max-w-7xl px-6 md:px-16 lg:px-24 py-16 md:py-32">
        <div className="mb-8 md:mb-14">
          <p
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 400,
              letterSpacing: "0.28em",
              fontSize: "clamp(0.68rem, 1vw, 0.78rem)",
              textTransform: "uppercase",
              color: "oklch(0.65 0.201 36.9)",
              marginBottom: "0.75rem",
            }}
          >
            34, Via San Quintino → Studio34, IMT Manesar
          </p>

          <h2
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 200,
              letterSpacing: "0.18em",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              textTransform: "uppercase",
              color: "oklch(0.12 0.006 60)",
              lineHeight: "1.1",
            }}
          >
            Our journey
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

        <div className="mb-8 md:mb-14">
          <div className="max-w-5xl mx-auto">
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "4px",
                border: "1px solid oklch(0.65 0.201 36.9 / 0.18)",
                boxShadow:
                  "0 8px 32px oklch(0.12 0.006 60 / 0.08), 0 2px 8px oklch(0.65 0.201 36.9 / 0.06)",
                isolation: "isolate",
              }}
            >
              <img
                src={heroImage}
                alt="Studio34 story"
                className="w-full h-auto object-cover block aspect-[2/1] md:aspect-[16/9]"
                style={{ objectPosition: "center 15%", zIndex: 0 }}
                loading="lazy"
                decoding="async"
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, oklch(0.08 0.006 60 / 0.84) 0%, transparent 56%)",
                  zIndex: 1,
                  pointerEvents: "none",
                }}
              />

              <div
                className="absolute left-0 right-0 bottom-0 z-[2] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-5 md:px-8 pb-5 md:pb-7"
              >
                <div>
                  <p
                    style={{
                      fontFamily: "Barlow, sans-serif",
                      fontWeight: 300,
                      fontSize: "clamp(0.9rem, 1.25vw, 1rem)",
                      lineHeight: 1.7,
                      color: "oklch(0.94 0.006 80)",
                      maxWidth: "32ch",
                    }}
                  >
                    From Turin roots to a full-fledged design and prototype facility in Manesar.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/ideology"
                    hash="meaning-34"
                    data-ocid="story.read_more"
                    onMouseEnter={() => setReadHovered(true)}
                    onMouseLeave={() => setReadHovered(false)}
                    style={{
                      fontFamily: "Barlow, sans-serif",
                      fontWeight: 300,
                      letterSpacing: "0.2em",
                      fontSize: "0.72rem",
                      textTransform: "uppercase",
                      color: readHovered
                        ? "oklch(0.65 0.201 36.9)"
                        : "oklch(0.97 0.006 80)",
                      border: readHovered
                        ? "1px solid oklch(0.65 0.201 36.9)"
                        : "1px solid oklch(0.97 0.006 80 / 0.5)",
                      background: "transparent",
                      padding: "0.95rem 1.4rem",
                      textDecoration: "none",
                      display: "inline-block",
                      transition: "color 0.3s ease, border-color 0.3s ease",
                    }}
                  >
                    Read the story
                  </Link>

                  <a
                    href="https://www.youtube.com/watch?v=CCLdolupH1Y"
                    target="_blank"
                    rel="noreferrer"
                    data-ocid="story.see_more"
                    onMouseEnter={() => setWatchHovered(true)}
                    onMouseLeave={() => setWatchHovered(false)}
                    style={{
                      fontFamily: "Barlow, sans-serif",
                      fontWeight: 300,
                      letterSpacing: "0.2em",
                      fontSize: "0.72rem",
                      textTransform: "uppercase",
                      color: watchHovered
                        ? "oklch(0.65 0.201 36.9)"
                        : "oklch(0.97 0.006 80)",
                      border: watchHovered
                        ? "1px solid oklch(0.65 0.201 36.9)"
                        : "1px solid oklch(0.97 0.006 80 / 0.5)",
                      background: "transparent",
                      padding: "0.95rem 1.4rem",
                      textDecoration: "none",
                      display: "inline-block",
                      transition: "color 0.3s ease, border-color 0.3s ease",
                    }}
                  >
                    Watch the film
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-start">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <p
              style={{
                fontFamily: "Barlow, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(0.98rem, 1.4vw, 1.05rem)",
                lineHeight: "1.9",
                color: "oklch(0.12 0.006 60)",
                maxWidth: "64ch",
              }}
            >
              Studio34 was founded with a single ambition — to build an automotive design and development studio in India that could operate at global standards. From a residential address in Turin to a state-of-the-art facility in Manesar, the journey has always been driven by intent, craft and execution.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            <p
              style={{
                fontFamily: "Barlow, sans-serif",
                fontWeight: 400,
                letterSpacing: "0.24em",
                fontSize: "0.72rem",
                textTransform: "uppercase",
                color: "oklch(0.45 0.008 65)",
              }}
            >
              Milestones
            </p>

            <ul className="flex flex-col gap-2 md:gap-3">
              {milestones.map((milestone) => (
                <li
                  key={milestone}
                  className="flex items-start gap-4"
                  style={{
                    fontFamily: "Barlow, sans-serif",
                    fontWeight: 300,
                    fontSize: "clamp(0.9rem, 1.15vw, 0.96rem)",
                    lineHeight: "1.75",
                    color: "oklch(0.30 0.006 62)",
                  }}
                >
                  <span
                    className="mt-[0.55em] shrink-0"
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "oklch(0.65 0.201 36.9)",
                      display: "inline-block",
                    }}
                  />
                  {milestone}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
