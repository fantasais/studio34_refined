import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const WORK_ITEMS = [
  {
    id: 1,
    label: "Golf cart concept",
    image: "/assets/uploads/d_2-019d292a-740c-747a-836c-27eafb95684b-1.png",
    category: "Leisure Vehicle",
    featured: true,
  },
  {
    id: 2,
    label: "Compact mower",
    image:
      "/assets/uploads/solis_e30_agritechnica_2023_2-019d2900-3e15-715b-ba5b-7b82bcab94fe-1.jpg",
    category: "Industrial Design",
    featured: false,
  },
  {
    id: 3,
    label: "One-off PC cabinet",
    image:
      "/assets/uploads/copy_of_dsc8934-edit-019d292a-7f76-72c2-adf4-16fdd1a73249-2.jpg",
    category: "Prototype",
    featured: false,
  },
];

function WorkCard({
  item,
  animationDelay,
  featured = false,
  fillHeight = false,
}: {
  item: (typeof WORK_ITEMS)[0];
  animationDelay: number;
  featured?: boolean;
  fillHeight?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), animationDelay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animationDelay]);

  return (
    <Link
      to="/work"
      hash="work-projects"
      style={{ display: "block", textDecoration: "none" }}
      aria-label={`View ${item.label} in selected work`}
    >
      <div
        ref={ref}
        data-ocid={`work.item.${item.id}`}
        className={`relative overflow-hidden${fillHeight ? " h-full" : ""}`}
        style={{
          ...(fillHeight
            ? { height: "100%", minHeight: "320px" }
            : { aspectRatio: featured ? "4/3" : "16/9" }),
          background: "oklch(0.88 0.010 72 / 0.45)",
          border: "1px solid oklch(0.65 0.201 36.9 / 0.12)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          cursor: "pointer",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={item.image}
          alt={item.label}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
          loading="lazy"
          decoding="async"
        />

        <div
          className="absolute left-0 right-0 bottom-0 flex items-end px-4 md:px-5"
          style={{
            height: featured ? "42%" : "52%",
            background: "oklch(0.08 0.006 60 / 0.88)",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(100%)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
            paddingBottom: featured ? "2.9rem" : "2.25rem",
          }}
        >
          <span
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 300,
              letterSpacing: "0.22em",
              fontSize: "0.72rem",
              textTransform: "uppercase",
              color: "oklch(0.92 0.006 70)",
            }}
          >
            {item.category}
          </span>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 px-4 md:px-5 py-4 md:py-5"
          style={{
            background:
              "linear-gradient(to top, oklch(0.08 0.006 60 / 0.82) 0%, oklch(0.08 0.006 60 / 0.3) 70%, transparent 100%)",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 300,
              letterSpacing: "0.18em",
              fontSize: "clamp(0.78rem, 1vw, 0.85rem)",
              textTransform: "uppercase",
              color: "oklch(0.92 0.006 70)",
              textShadow: "0 1px 4px oklch(0.04 0.006 60 / 0.6)",
            }}
          >
            {item.label}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function WorkSection() {
  const featuredProject = WORK_ITEMS.find((item) => item.featured);
  const supportingProjects = WORK_ITEMS.filter((item) => !item.featured);

  return (
    <section
      id="work-preview"
      data-ocid="work.section"
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

      <div className="mx-auto max-w-7xl px-6 md:px-16 lg:px-24 py-28 md:py-32">
        <div className="relative mb-16 md:mb-20 flex flex-col items-center text-center gap-4">
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
            काम — Selected work
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
            Across mobility, product and prototype
          </h2>

          <p
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)",
              lineHeight: 1.8,
              color: "oklch(0.40 0.006 62)",
              maxWidth: "58ch",
            }}
          >
            A tighter cross-section of the work — from vehicle programs to product design and one-off prototype execution.
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

        <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-2 gap-6 lg:items-stretch">
          {featuredProject && (
            <div className="lg:col-span-7 lg:row-span-2 lg:h-full">
              <WorkCard
                item={featuredProject}
                animationDelay={0}
                featured={true}
                fillHeight={true}
              />
            </div>
          )}

          {supportingProjects.map((item, index) => (
            <div key={item.id} className="lg:col-span-5 lg:row-span-1">
              <WorkCard item={item} animationDelay={(index + 1) * 120} featured={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
