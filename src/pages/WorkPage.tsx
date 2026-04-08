import { useEffect, useRef, useState } from "react";

// ─── Shared media helper ─────────────────────────────────────────────

function MediaFill({
  src,
  alt,
  placeholderLabel,
  className = "",
  style = {},
  zoomed = false,
}: {
  src?: string;
  alt: string;
  placeholderLabel: string;
  className?: string;
  style?: React.CSSProperties;
  zoomed?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={className}
        style={{
          ...style,
          background:
            "linear-gradient(180deg, oklch(0.93 0.004 78) 0%, oklch(0.88 0.004 74) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "Barlow, sans-serif",
            fontWeight: 300,
            letterSpacing: "0.22em",
            fontSize: "0.72rem",
            textTransform: "uppercase",
            color: "oklch(0.52 0.008 65)",
          }}
        >
          {placeholderLabel}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      style={{
        ...style,
        transform: zoomed ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.6s ease",
      }}
      loading="lazy"
      decoding="async"
    />
  );
}

// ─── Act 1: Services In Depth ─────────────────────────────────────────────

const SERVICE_DETAILS = [
  {
    title: "Design",
    hindi: "रचना",
    number: "01",
    image: "/assets/uploads/hp4-019d263c-6289-757e-9e1e-5166960999d1-4.jpg",
    overview:
      "Concept development, form language direction and production-aware proposals for vehicles and mobility products.",
    pillars: [
      { label: "Concept Ideation" },
      { label: "Exterior / Interior Design" },
      { label: "Form Language" },
      { label: "Design Systems" },
    ],
  },
  {
    title: "Sculpting",
    hindi: "संरचना",
    number: "02",
    image:
      "/assets/uploads/sculpting-019d263c-039f-748c-af5a-1374861303a6-5.jpg",
    overview:
      "Digital and physical surface development that refines proportion, continuity and manufacturable form with precision.",
    pillars: [
      { label: "Clay Modelling" },
      { label: "Class A Sculpting" },
      { label: "CAD Development" },
      { label: "Precision CNC Milling" },
    ],
  },
  {
    title: "Prototyping",
    hindi: "खाका",
    number: "03",
    image: "/assets/uploads/proto-019d263c-37b2-73c2-b1d9-a9544208b87b-3.jpg",
    overview:
      "Physical bucks, appearance models and validation builds that translate design intent into testable reality.",
    pillars: [
      { label: "Design Verification Bucks" },
      { label: "Appearance Models" },
      { label: "Functional Prototypes" },
      { label: "Validation Builds" },
    ],
  },
  {
    title: "CMF",
    hindi: "रूप-रंग-बनावट",
    number: "04",
    image:
      "/assets/uploads/mc_prototype_interior1-019d28f4-7df4-71b5-b30e-d18b23386d79-1.png",
    overview:
      "Colour, material and finish strategies shaped for brand expression, tactile quality and manufacturing intent.",
    pillars: [
      { label: "Colour Strategy" },
      { label: "Material Direction" },
      { label: "Finish Development" },
      { label: "CMF Guidelines" },
    ],
  },
];

function ServiceRow({
  service,
  idx,
  textRight = false,
}: {
  service: (typeof SERVICE_DETAILS)[0];
  idx: number;
  textRight?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
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
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const imageLeft = idx % 2 === 0;

  const paddingLeft = imageLeft
    ? "clamp(1.5rem, 3vw, 2.5rem)"
    : "clamp(2rem, 4.5vw, 4rem)";
  const paddingRight = imageLeft
    ? "clamp(2rem, 4.5vw, 4rem)"
    : "clamp(1.5rem, 3vw, 2.5rem)";

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
      }}
    >
      <div
        className={`flex flex-col ${
          imageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
        } gap-0 items-stretch md:min-h-[380px]`}
      >
        {/* Image frame — 58% */}
        <div
          className="w-full lg:w-[58%] flex-none relative overflow-hidden"
          style={{ aspectRatio: "16/9", minHeight: "260px" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <MediaFill
            src={service.image}
            alt={service.title}
            placeholderLabel={`${service.title} image`}
            className="absolute inset-0 w-full h-full object-cover"
            zoomed={hovered}
          />
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: "30%",
              background:
                "linear-gradient(to top, oklch(0.12 0.006 60 / 0.45), transparent)",
              pointerEvents: "none",
            }}
          />
          {/* Service number stamp */}
          <div
            className="absolute top-6 left-6"
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 100,
              fontSize: "5rem",
              lineHeight: 1,
              color: "oklch(0.97 0.006 80 / 0.12)",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            {service.number}
          </div>
        </div>

        {/* Text block — 42% */}
        <div
          className={`w-full lg:w-[42%] flex-none flex flex-col justify-center${
            textRight ? " lg:items-end" : ""
          }`}
          style={{
            paddingTop: "clamp(2.5rem, 6vw, 5rem)",
            paddingBottom: "clamp(2.5rem, 6vw, 5rem)",
            paddingLeft,
            paddingRight,
            background: "oklch(0.97 0.006 80)",
          }}
        >
          {/* Title row */}
          <div className="flex flex-col gap-2 mb-8">
            <h3
              className={textRight ? "lg:[text-align:right]" : ""}
              style={{
                fontFamily: "Barlow, sans-serif",
                fontWeight: 200,
                letterSpacing: "0.28em",
                fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
                textTransform: "uppercase",
                color: "oklch(0.12 0.006 60)",
                lineHeight: 1.1,
              }}
            >
              {service.title}
            </h3>
            <span
              className={textRight ? "lg:[text-align:right] lg:block" : ""}
              style={{
                fontFamily: "Noto Sans Devanagari, sans-serif",
                fontWeight: 200,
                fontSize: "0.82rem",
                color: "oklch(0.65 0.201 36.9)",
              }}
            >
              {service.hindi}
            </span>
            <div
              className={textRight ? "lg:ml-auto" : ""}
              style={{
                marginTop: "0.25rem",
                height: "1px",
                width: "32px",
                background: "oklch(0.65 0.201 36.9 / 0.5)",
              }}
            />
          </div>

          {/* Overview */}
          <p
            className={textRight ? "lg:ml-auto lg:[text-align:right]" : ""}
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(0.78rem, 1.2vw, 0.88rem)",
              lineHeight: 2.0,
              color: "oklch(0.45 0.006 62)",
              marginBottom: "2.5rem",
              maxWidth: "38ch",
            }}
          >
            {service.overview}
          </p>

          {/* Pillars */}
          <div className="flex flex-col gap-0">
            {service.pillars.map((pillar, i) => (
              <div
                key={pillar.label}
                className={`flex items-center gap-3 py-2${
                  textRight ? " lg:flex-row-reverse" : ""
                }`}
                style={{
                  borderBottom:
                    i < service.pillars.length - 1
                      ? "1px solid oklch(0.65 0.201 36.9 / 0.10)"
                      : "none",
                }}
              >
                <div
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "oklch(0.65 0.201 36.9 / 0.5)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "Barlow, sans-serif",
                    fontWeight: 300,
                    letterSpacing: "0.14em",
                    fontSize: "0.72rem",
                    textTransform: "uppercase",
                    color: "oklch(0.38 0.006 62)",
                  }}
                >
                  {pillar.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesAct() {
  return (
    <section
      id="work-services"
      data-ocid="work.services.section"
      className="relative"
      style={{
        scrollMarginTop: "80px",
        background: "oklch(0.97 0.006 80)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-16 lg:px-24 pt-24 md:pt-32 pb-16">
        <p
          style={{
            fontFamily: "Barlow, sans-serif",
            fontWeight: 400,
            letterSpacing: "0.35em",
            fontSize: "0.72rem",
            textTransform: "uppercase",
            color: "oklch(0.65 0.201 36.9)",
            marginBottom: "0.75rem",
          }}
        >
          सेवाएँ — Services In Depth
        </p>
        <h2
          style={{
            fontFamily: "Barlow, sans-serif",
            fontWeight: 200,
            letterSpacing: "0.22em",
            fontSize: "clamp(1.55rem, 3.5vw, 2.35rem)",
            textTransform: "uppercase",
            color: "oklch(0.12 0.006 60)",
            lineHeight: "1.1",
          }}
        >
          SERVICES
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

      <div>
        {SERVICE_DETAILS.map((service, idx) => (
          <ServiceRow
            key={service.title}
            service={service}
            idx={idx}
            textRight={idx === 1 || idx === 3}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Full-Bleed Visual Divider ───────────────────────────────────────────

function VisualDivider() {
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
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="work-divider" style={{ scrollMarginTop: "80px" }}>
      <div
        ref={ref}
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(260px, 45vh, 520px)" }}
      >
        <MediaFill
          src="/assets/uploads/form-019d2482-f392-72e0-acc6-ea06f69b3092-4.jpg"
          alt="Studio work"
          placeholderLabel="Studio process image"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: visible ? "scale(1)" : "scale(1.06)",
            transition: "transform 1.2s ease-out",
            objectPosition: "center 20%",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "oklch(0.08 0.006 60 / 0.25)" }}
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-end pb-8 md:pb-12 gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition:
              "opacity 0.9s ease-out 0.3s, transform 0.9s ease-out 0.3s",
          }}
        >
          <h2
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 100,
              fontSize: "clamp(0.96rem, 3vw, 2.4rem)",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "oklch(0.95 0.006 78)",
              lineHeight: 1,
              textAlign: "center",
            }}
          >
            Intent into reality
          </h2>
          <div
            style={{
              height: "1px",
              width: "clamp(60px, 12vw, 120px)",
              background: "oklch(0.72 0.13 76 / 0.5)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ─── Act 2: Portfolio ────────────────────────────────────────────

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    label: "Concept T1",
    category: "Mobility Concept",
    role: "Concept + Surface Strategy",
    image: "/assets/uploads/t1-019d28c5-b816-737b-bb01-f1be86c2b299-2.png",
    isPlaceholder: false,
    categoryTag: "Automotive",
    intro:
      "A muscular future-facing tractor concept developed around strong proportions, decisive surfacing and a grounded stance.",
    focusAreas: ["surface language", "proportion", "stance"],
    gallery: [
      "/assets/uploads/v11.png",
      "/assets/uploads/0011 (2).png",
      "/assets/uploads/0015 (2).png",
      "/assets/uploads/0022.png",
      "/assets/uploads/0021.png",
      "/assets/uploads/0018.png",
      "/assets/uploads/0029.png",
      "/assets/uploads/0030.png",
    ],
  },
  {
    id: 2,
    label: "Compact Mower",
    category: "Industrial Design",
    role: "Design + Development",
    image: "/assets/uploads/mower-019d28f4-b96f-74fa-a228-31871fb53bb2-2.png",
    isPlaceholder: false,
    categoryTag: "Product",
    intro:
      "A ground-up industrial design program for a compact ride-on mower balancing ergonomics, packaging and manufacturing pragmatism.",
    focusAreas: ["ergonomics", "packaging", "manufacturing awareness"],
    gallery: ["/assets/uploads/mower-019d28f4-b96f-74fa-a228-31871fb53bb2-2.png"],
  },
  {
    id: 3,
    label: "Urban Scooter",
    category: "Two-Wheeler Design",
    role: "Concept + Packaging Study",
    image: "/assets/uploads/scooter-019d28c5-a01b-776a-a059-da20ed920c26-1.png",
    isPlaceholder: false,
    categoryTag: "Automotive",
    intro:
      "An urban two-wheeler concept shaped around tight packaging, rider-forward geometry and a clean, resolved surface language.",
    focusAreas: ["rider geometry", "packaging", "surface resolution"],
    gallery: ["/assets/uploads/scooter-019d28c5-a01b-776a-a059-da20ed920c26-1.png"],
  },
  {
    id: 4,
    label: "G-Tractor",
    category: "Agricultural Vehicle",
    role: "Form Development + CMF",
    image: "/assets/uploads/gtractor-019d263c-76f9-757d-9aae-fa49dd9a8ffb-6.jpg",
    isPlaceholder: false,
    categoryTag: "Automotive",
    intro:
      "Exterior form development and CMF direction for a next-generation agricultural tractor platform.",
    focusAreas: ["form development", "CMF", "brand character"],
    gallery: ["/assets/uploads/gtractor-019d263c-76f9-757d-9aae-fa49dd9a8ffb-6.jpg"],
  },
  {
    id: 5,
    label: "Golf Cart",
    category: "Leisure Vehicle",
    role: "Form Development + CMF",
    image: "/assets/uploads/a_6-019d292a-80d4-713d-a1ba-7ce4f93d0463-3.png",
    isPlaceholder: false,
    categoryTag: "Automotive",
    intro:
      "Form development and CMF strategy for a refined leisure vehicle shaped for resort and hospitality environments.",
    focusAreas: ["CMF direction", "leisure mobility", "surface refinement"],
    gallery: ["/assets/uploads/a_6-019d292a-80d4-713d-a1ba-7ce4f93d0463-3.png"],
  },
  {
    id: 6,
    label: "Confidential Program",
    category: "Confidential Program",
    role: "Confidential",
    image: "/assets/uploads/a_16-019d28f4-caf5-77fe-814e-01993acd71e6-3.png",
    isPlaceholder: false,
    categoryTag: "Confidential Program",
    intro:
      "A design and development program under NDA. Visuals remain selectively shareable.",
    focusAreas: ["program confidentiality", "design development", "execution support"],
    gallery: ["/assets/uploads/a_16-019d28f4-caf5-77fe-814e-01993acd71e6-3.png"],
  },
  {
    id: 7,
    label: "KITSUN - The FOX PC",
    category: "Prototype",
    role: "Design + Prototype",
    image: "/assets/uploads/fox2.jpg",
    isPlaceholder: false,
    categoryTag: "Prototype",
    intro: "A custom one-off PC build developed as a focused exercise in identity, packaging and finished execution.",
    focusAreas: ["custom build", "identity", "prototype execution"],
    gallery: [
      "/assets/uploads/fox2.jpg",
      "/assets/uploads/copy_of_dsc8934-edit-019d292a-7f76-72c2-adf4-16fdd1a73249-2.jpg",
    ],
  },
];

// ─── Project Lightbox ────────────────────────────────────────────

function ProjectLightbox({
  projectId,
  galleryIndex,
  onClose,
  onPrevProject,
  onNextProject,
  onGalleryPrev,
  onGalleryNext,
}: {
  projectId: number;
  galleryIndex: number;
  onClose: () => void;
  onPrevProject: () => void;
  onNextProject: () => void;
  onGalleryPrev: () => void;
  onGalleryNext: () => void;
}) {
  const project = PORTFOLIO_ITEMS.find((p) => p.id === projectId);
  const projectIndex = PORTFOLIO_ITEMS.findIndex((p) => p.id === projectId);
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const galleryImages = project
    ? project.gallery.length > 0
      ? project.gallery
      : project.image
        ? [project.image]
        : []
    : [];

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    document.body.classList.add("modal-open");
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 40);

    return () => {
      clearTimeout(t);
      window.clearTimeout(focusTimer);
      document.body.classList.remove("modal-open");
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (galleryImages.length > 1 && e.key === "ArrowLeft") onGalleryPrev();
      if (galleryImages.length > 1 && e.key === "ArrowRight") onGalleryNext();
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [galleryImages.length, onClose, onGalleryPrev, onGalleryNext]);

  if (!project) return null;

  const totalProjects = PORTFOLIO_ITEMS.length;
  const projectNumStr = String(projectIndex + 1).padStart(2, "0");
  const totalStr = String(totalProjects).padStart(2, "0");
  const galleryTotal = galleryImages.length;
  const galleryImg = galleryTotal > 0 ? galleryImages[galleryIndex % galleryTotal] : null;
  const galleryNumStr = galleryTotal > 0 ? String((galleryIndex % galleryTotal) + 1).padStart(2, "0") : "00";
  const galleryTotalStr = galleryTotal > 0 ? String(galleryTotal).padStart(2, "0") : "00";

  return (
    <div
      data-ocid="work.project.modal"
      className="fixed inset-0 z-50 flex flex-col"
      style={{
        background: "oklch(0.06 0.006 60 / 0.97)",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.985)",
        transition: "opacity 280ms ease, transform 280ms ease",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-title-${project.id}`}
        aria-describedby={`project-description-${project.id}`}
        className="flex h-full flex-col"
      >
        <div
          className="flex items-center justify-between px-6 md:px-12"
          style={{ paddingTop: "1.5rem", paddingBottom: "1rem", flexShrink: 0 }}
        >
          <span
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 200,
              fontSize: "0.72rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "oklch(0.65 0.201 36.9)",
            }}
          >
            {projectNumStr} / {totalStr}
          </span>
          <button
            ref={closeButtonRef}
            data-ocid="work.project.close_button"
            type="button"
            onClick={onClose}
            aria-label={`Close ${project.label} details`}
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 300,
              fontSize: "0.72rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "oklch(0.65 0.201 36.9)",
              background: "transparent",
              border: "1px solid oklch(0.65 0.201 36.9 / 0.45)",
              padding: "0.55rem 1rem",
              cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s",
            }}
          >
            Close ×
          </button>
        </div>

        <div
          className="px-6 md:px-12 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(220px,320px)]"
          style={{ paddingBottom: "1.25rem", flexShrink: 0 }}
        >
          <div>
            <span
              style={{
                display: "inline-block",
                fontFamily: "Barlow, sans-serif",
                fontWeight: 300,
                fontSize: "0.68rem",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "oklch(0.65 0.201 36.9)",
                border: "1px solid oklch(0.65 0.201 36.9 / 0.35)",
                padding: "0.3rem 0.75rem",
                marginBottom: "0.85rem",
              }}
            >
              {project.categoryTag}
            </span>
            <h2
              id={`project-title-${project.id}`}
              style={{
                fontFamily: "Barlow, sans-serif",
                fontWeight: 200,
                fontSize: "clamp(1.55rem, 3vw, 2.35rem)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "oklch(0.93 0.006 70)",
                lineHeight: 1.08,
                margin: "0 0 0.6rem 0",
              }}
            >
              {project.label}
            </h2>
            <p
              id={`project-description-${project.id}`}
              style={{
                fontFamily: "Barlow, sans-serif",
                fontWeight: 300,
                fontSize: "0.95rem",
                lineHeight: 1.8,
                color: "oklch(0.68 0.006 65)",
                maxWidth: "60ch",
                margin: 0,
              }}
            >
              {project.intro}
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-start">
            <div>
              <p
                style={{
                  fontFamily: "Barlow, sans-serif",
                  fontWeight: 300,
                  fontSize: "0.68rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "oklch(0.55 0.006 65)",
                  marginBottom: "0.65rem",
                }}
              >
                Role
              </p>
              <p
                style={{
                  fontFamily: "Barlow, sans-serif",
                  fontWeight: 300,
                  fontSize: "0.88rem",
                  lineHeight: 1.7,
                  color: "oklch(0.84 0.006 70)",
                  margin: 0,
                }}
              >
                {project.role}
              </p>
            </div>
            {Array.isArray((project as { focusAreas?: string[] }).focusAreas) && (
              <div>
                <p
                  style={{
                    fontFamily: "Barlow, sans-serif",
                    fontWeight: 300,
                    fontSize: "0.68rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "oklch(0.55 0.006 65)",
                    marginBottom: "0.65rem",
                  }}
                >
                  Focus
                </p>
                <div className="flex flex-wrap gap-2">
                  {(project as { focusAreas?: string[] }).focusAreas?.map((area) => (
                    <span
                      key={area}
                      style={{
                        fontFamily: "Barlow, sans-serif",
                        fontWeight: 300,
                        fontSize: "0.68rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "oklch(0.84 0.006 70)",
                        border: "1px solid oklch(0.65 0.201 36.9 / 0.2)",
                        padding: "0.45rem 0.6rem",
                      }}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className="flex-1 relative px-6 md:px-12 flex items-center justify-center"
          style={{ minHeight: 0, paddingBottom: "0.5rem" }}
        >
          {galleryTotal === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "1px",
                  background: "oklch(0.65 0.201 36.9 / 0.35)",
                }}
              />
              <span
                style={{
                  fontFamily: "Barlow, sans-serif",
                  fontWeight: 300,
                  fontSize: "0.72rem",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "oklch(0.65 0.201 36.9)",
                }}
              >
                Gallery unavailable
              </span>
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center" style={{ maxHeight: "100%" }}>
              {galleryTotal > 1 && (
                <button
                  data-ocid="work.project.pagination_prev"
                  type="button"
                  onClick={onGalleryPrev}
                  aria-label="Previous gallery image"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "oklch(0.12 0.006 60 / 0.7)",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "oklch(0.88 0.006 70)",
                    fontSize: "1rem",
                  }}
                >
                  ‹
                </button>
              )}

              <img
                src={galleryImg ?? ""}
                alt={`${project.label} — ${galleryIndex + 1}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
                loading="eager"
                decoding="sync"
              />

              {galleryTotal > 1 && (
                <button
                  data-ocid="work.project.pagination_next"
                  type="button"
                  onClick={onGalleryNext}
                  aria-label="Next gallery image"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "oklch(0.12 0.006 60 / 0.7)",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "oklch(0.88 0.006 70)",
                    fontSize: "1rem",
                  }}
                >
                  ›
                </button>
              )}

              <div
                style={{
                  position: "absolute",
                  bottom: "0.75rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontFamily: "Barlow, sans-serif",
                  fontWeight: 200,
                  fontSize: "0.72rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "oklch(0.55 0.006 65)",
                }}
              >
                {galleryNumStr} / {galleryTotalStr}
              </div>
            </div>
          )}
        </div>

        <div
          className="flex items-center justify-between px-6 md:px-12"
          style={{
            paddingTop: "1rem",
            paddingBottom: "1.5rem",
            flexShrink: 0,
            borderTop: "1px solid oklch(0.65 0.201 36.9 / 0.12)",
          }}
        >
          <button
            data-ocid="work.project.secondary_button"
            type="button"
            onClick={onPrevProject}
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 300,
              fontSize: "0.72rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "oklch(0.45 0.006 65)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem 0",
            }}
          >
            ← Previous
          </button>
          <span
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 200,
              fontSize: "0.68rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "oklch(0.35 0.006 65)",
            }}
          >
            {project.category}
          </span>
          <button
            data-ocid="work.project.primary_button"
            type="button"
            onClick={onNextProject}
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 300,
              fontSize: "0.72rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "oklch(0.45 0.006 65)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem 0",
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}


// ─── Portfolio Card ────────────────────────────────────────────

function PortfolioCard({
  item,
  aspectRatio = "4/3",
  animationDelay = 0,
  fullHeight = false,
  onClick,
}: {
  item: (typeof PORTFOLIO_ITEMS)[0];
  aspectRatio?: string;
  animationDelay?: number;
  fullHeight?: boolean;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

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
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animationDelay]);

  if (item.isPlaceholder) {
    return (
      <button
        ref={ref}
        type="button"
        data-ocid={`work.item.${item.id}`}
        aria-label={`Open ${item.label}`}
        className={`relative overflow-hidden w-full ${
          fullHeight ? "aspect-[4/3] sm:aspect-auto sm:h-full" : ""
        }`}
        style={{
          ...(fullHeight ? {} : { aspectRatio }),
          background:
            "linear-gradient(180deg, oklch(0.93 0.004 78) 0%, oklch(0.88 0.004 74) 100%)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.65s ease-out, transform 0.65s ease-out",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "0.5rem",
          border: "1px solid oklch(0.12 0.006 60 / 0.07)",
          cursor: onClick ? "pointer" : "default",
        }}
        onClick={onClick}
      >
        <div
          style={{
            width: "24px",
            height: "1px",
            background: "oklch(0.65 0.201 36.9 / 0.4)",
          }}
        />
        <span
          style={{
            fontFamily: "Barlow, sans-serif",
            fontWeight: 300,
            letterSpacing: "0.24em",
            fontSize: "0.72rem",
            textTransform: "uppercase",
            color: "oklch(0.58 0.008 65)",
          }}
        >
          {item.label}
        </span>
      </button>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      data-ocid={`work.item.${item.id}`}
      aria-label={`Open ${item.label}`}
      className={`relative overflow-hidden w-full text-left ${
        fullHeight ? "aspect-[4/3] sm:aspect-auto sm:h-full" : ""
      }`}
      style={{
        ...(fullHeight ? {} : { aspectRatio }),
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.65s ease-out, transform 0.65s ease-out",
        cursor: onClick ? "pointer" : "default",
        background: "transparent",
        border: "none",
        padding: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={onClick}
    >
      <MediaFill
        src={item.image}
        alt={item.label}
        placeholderLabel={item.label}
        className="absolute inset-0 w-full h-full object-cover"
        zoomed={hovered}
      />

      <div
        className="absolute inset-0"
        style={{
          background: "oklch(0.08 0.006 60 / 0.74)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "2rem",
        }}
      >
        <span
          style={{
            fontFamily: "Barlow, sans-serif",
            fontWeight: 200,
            letterSpacing: "0.24em",
            fontSize: "0.72rem",
            textTransform: "uppercase",
            color: "oklch(0.72 0.13 76)",
            marginBottom: "0.35rem",
          }}
        >
          {item.category}
        </span>
        <span
          style={{
            fontFamily: "Barlow, sans-serif",
            fontWeight: 300,
            letterSpacing: "0.14em",
            fontSize: "0.72rem",
            textTransform: "uppercase",
            color: "oklch(0.76 0.008 72)",
            marginBottom: "0.75rem",
          }}
        >
          {item.role}
        </span>
        <span
          style={{
            fontFamily: "Barlow, sans-serif",
            fontWeight: 300,
            letterSpacing: "0.18em",
            fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
            textTransform: "uppercase",
            color: "oklch(0.93 0.006 70)",
          }}
        >
          {item.label}
        </span>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 px-5 py-4"
        style={{
          background:
            "linear-gradient(to top, oklch(0.08 0.006 60 / 0.8) 0%, transparent 100%)",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      >
        <div className="flex flex-col gap-1">
          <span
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 200,
              letterSpacing: "0.22em",
              fontSize: "0.68rem",
              textTransform: "uppercase",
              color: "oklch(0.72 0.13 76)",
            }}
          >
            {item.category}
          </span>
          <span
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 300,
              letterSpacing: "0.18em",
              fontSize: "clamp(0.72rem, 1vw, 0.78rem)",
              textTransform: "uppercase",
              color: "oklch(0.88 0.006 70)",
            }}
          >
            {item.label}
          </span>
        </div>
      </div>
    </button>
  );
}


function PortfolioAct() {
  const [openProjectId, setOpenProjectId] = useState<number | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openProject = (id: number) => {
    setOpenProjectId(id);
    setGalleryIndex(0);
  };

  const closeProject = () => {
    setOpenProjectId(null);
    setGalleryIndex(0);
  };

  const prevProject = () => {
    if (openProjectId === null) return;
    const idx = PORTFOLIO_ITEMS.findIndex((p) => p.id === openProjectId);
    const prevIdx = (idx - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length;
    setOpenProjectId(PORTFOLIO_ITEMS[prevIdx].id);
    setGalleryIndex(0);
  };

  const nextProject = () => {
    if (openProjectId === null) return;
    const idx = PORTFOLIO_ITEMS.findIndex((p) => p.id === openProjectId);
    const nextIdx = (idx + 1) % PORTFOLIO_ITEMS.length;
    setOpenProjectId(PORTFOLIO_ITEMS[nextIdx].id);
    setGalleryIndex(0);
  };

  const galleryPrev = () => {
    if (openProjectId === null) return;
    const project = PORTFOLIO_ITEMS.find((p) => p.id === openProjectId);
    if (!project || project.gallery.length === 0) return;
    setGalleryIndex(
      (i) => (i - 1 + project.gallery.length) % project.gallery.length,
    );
  };

  const galleryNext = () => {
    if (openProjectId === null) return;
    const project = PORTFOLIO_ITEMS.find((p) => p.id === openProjectId);
    if (!project || project.gallery.length === 0) return;
    setGalleryIndex((i) => (i + 1) % project.gallery.length);
  };

  return (
    <>
      {openProjectId !== null && (
        <ProjectLightbox
          projectId={openProjectId}
          galleryIndex={galleryIndex}
          onClose={closeProject}
          onPrevProject={prevProject}
          onNextProject={nextProject}
          onGalleryPrev={galleryPrev}
          onGalleryNext={galleryNext}
        />
      )}
      <section
        id="work-projects"
        data-ocid="work.portfolio.section"
        className="relative"
        style={{ scrollMarginTop: "80px", background: "oklch(0.97 0.006 80)" }}
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
          {/* Header */}
          <div className="mb-16 md:mb-20">
            <p
              style={{
                fontFamily: "Barlow, sans-serif",
                fontWeight: 400,
                letterSpacing: "0.35em",
                fontSize: "clamp(0.68rem, 1vw, 0.78rem)",
                textTransform: "uppercase",
                color: "oklch(0.65 0.201 36.9)",
                marginBottom: "0.75rem",
              }}
            >
              काम — Selected Work
            </p>
            <h2
              style={{
                fontFamily: "Barlow, sans-serif",
                fontWeight: 200,
                letterSpacing: "0.22em",
                fontSize: "clamp(1.55rem, 3.5vw, 2.35rem)",
                textTransform: "uppercase",
                color: "oklch(0.12 0.006 60)",
                lineHeight: "1.1",
              }}
            >
              PROJECTS
            </h2>
            <div
              style={{
                marginTop: "1rem",
                height: "1px",
                width: "min(200px, 40%)",
                background:
                  "linear-gradient(to right, oklch(0.65 0.201 36.9 / 0.4), transparent)",
              }}
            />
          </div>

          {/* 3-tier grid */}
          <div className="flex flex-col gap-4">
            {/* Tier 1: large left (col-span-2) + small right (col-span-1) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
              <div className="col-span-1 sm:col-span-2">
                <PortfolioCard
                  item={PORTFOLIO_ITEMS[0]}
                  aspectRatio="16/9"
                  animationDelay={0}
                  onClick={() => openProject(PORTFOLIO_ITEMS[0].id)}
                />
              </div>
              <div
                className="col-span-1"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div style={{ flex: 1, minHeight: 0 }}>
                  <PortfolioCard
                    item={PORTFOLIO_ITEMS[1]}
                    fullHeight
                    animationDelay={80}
                    onClick={() => openProject(PORTFOLIO_ITEMS[1].id)}
                  />
                </div>
              </div>
            </div>

            {/* Tier 2: 3 equal columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <PortfolioCard
                item={PORTFOLIO_ITEMS[2]}
                aspectRatio="4/3"
                animationDelay={0}
                onClick={() => openProject(PORTFOLIO_ITEMS[2].id)}
              />
              <PortfolioCard
                item={PORTFOLIO_ITEMS[3]}
                aspectRatio="4/3"
                animationDelay={80}
                onClick={() => openProject(PORTFOLIO_ITEMS[3].id)}
              />
              <PortfolioCard
                item={PORTFOLIO_ITEMS[4]}
                aspectRatio="4/3"
                animationDelay={160}
                onClick={() => openProject(PORTFOLIO_ITEMS[4].id)}
              />
            </div>

            {/* Tier 3: small left (col-span-1) + large right (col-span-2) — mirror of Tier 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
              <div
                className="col-span-1"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div style={{ flex: 1, minHeight: 0 }}>
                  <PortfolioCard
                    item={PORTFOLIO_ITEMS[5]}
                    fullHeight
                    animationDelay={0}
                    onClick={() => openProject(PORTFOLIO_ITEMS[5].id)}
                  />
                </div>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <PortfolioCard
                  item={PORTFOLIO_ITEMS[6]}
                  aspectRatio="16/9"
                  animationDelay={80}
                  onClick={() => openProject(PORTFOLIO_ITEMS[6].id)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Act 3: Clients ────────────────────────────────────────────

const CLIENT_LOGOS = [
  { name: "Mahindra", abbr: "M&M" },
  { name: "Tata Motors", abbr: "TATA" },
  { name: "Hero MotoCorp", abbr: "HERO" },
  { name: "Bajaj Auto", abbr: "BAJAJ" },
  { name: "Escorts Kubota", abbr: "EKL" },
  { name: "Ather Energy", abbr: "ATHER" },
  { name: "TVS Motor", abbr: "TVS" },
  { name: "Maruti Suzuki", abbr: "MSIL" },
  { name: "Royal Enfield", abbr: "RE" },
  { name: "Piaggio India", abbr: "PGO" },
  { name: "Global OEM Partner", abbr: "OEM" },
  { name: "Mobility Venture", abbr: "MV" },
];

function ClientLogoCell({
  client,
  delay,
}: { client: (typeof CLIENT_LOGOS)[0]; delay: number }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(1.5rem, 3vw, 2.5rem)",
        borderRight: "1px solid oklch(0.12 0.006 60 / 0.07)",
        borderBottom: "1px solid oklch(0.12 0.006 60 / 0.07)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
        cursor: "default",
        background: hovered ? "oklch(0.65 0.201 36.9 / 0.03)" : "transparent",
      }}
    >
      <span
        style={{
          fontFamily: "Barlow, sans-serif",
          fontWeight: 300,
          letterSpacing: "0.25em",
          fontSize: "clamp(0.7rem, 1.4vw, 0.85rem)",
          textTransform: "uppercase",
          color: hovered ? "oklch(0.65 0.201 36.9)" : "oklch(0.18 0.006 60)",
          userSelect: "none",
          opacity: hovered ? 1 : 0.55,
          transition: "color 0.25s ease, opacity 0.25s ease",
        }}
      >
        {client.abbr}
      </span>
    </div>
  );
}

function ClientsAct() {
  return (
    <section
      id="work-clients"
      data-ocid="work.clients.section"
      className="relative"
      style={{ scrollMarginTop: "80px", background: "oklch(0.97 0.006 80)" }}
    >
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent, oklch(0.12 0.006 60 / 0.12), transparent)",
        }}
      />
      <div className="mx-auto max-w-7xl px-6 md:px-16 lg:px-24 py-24 md:py-32">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <p
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 400,
              letterSpacing: "0.35em",
              fontSize: "0.72rem",
              textTransform: "uppercase",
              color: "oklch(0.65 0.201 36.9)",
              marginBottom: "0.75rem",
            }}
          >
            ग्राहक — Selected Collaborations
          </p>
          <h2
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 200,
              letterSpacing: "0.22em",
              fontSize: "clamp(1.55rem, 3.5vw, 2.35rem)",
              textTransform: "uppercase",
              color: "oklch(0.12 0.006 60)",
              lineHeight: "1.1",
            }}
          >
            CLIENTS
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

        {/* Logo grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            borderLeft: "1px solid oklch(0.12 0.006 60 / 0.07)",
            borderTop: "1px solid oklch(0.12 0.006 60 / 0.07)",
          }}
        >
          {CLIENT_LOGOS.map((client, idx) => (
            <ClientLogoCell
              key={client.name}
              client={client}
              delay={idx * 40}
            />
          ))}
        </div>

        {/* NDA note */}
        <p
          style={{
            marginTop: "2.5rem",
            fontFamily: "Barlow, sans-serif",
            fontWeight: 200,
            letterSpacing: "0.15em",
            fontSize: "0.7rem",
            textTransform: "uppercase",
            color: "oklch(0.55 0.006 65)",
            textAlign: "center",
          }}
        >
          Selected names shown. Additional client programs remain confidential
          under NDA.
        </p>
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────

export default function WorkPage() {
  return (
    <main>
      <section
        id="work-hero"
        style={{ scrollMarginTop: "80px" }}
        className="relative overflow-hidden min-h-[68svh] md:min-h-[82vh]"
      >
        <img
          src="/assets/uploads/workhead2-019d24ec-8ad3-77ff-9991-d3680796a70d-1.jpg"
          alt="Prototype build in process"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center right" }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.08 0.006 60 / 0.98) 0%, oklch(0.08 0.006 60 / 0.94) 28%, oklch(0.08 0.006 60 / 0.76) 48%, oklch(0.08 0.006 60 / 0.38) 72%, oklch(0.08 0.006 60 / 0.08) 90%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "42%",
            background:
              "linear-gradient(to top, oklch(0.08 0.006 60 / 0.68), transparent)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "clamp(1.5rem, 6vw, 4rem)",
            maxWidth: "42rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginBottom: "1.2rem",
            }}
          >
            <h1
              style={{
                fontFamily: "Barlow, sans-serif",
                fontWeight: 200,
                letterSpacing: "0.12em",
                fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
                textTransform: "uppercase",
                color: "oklch(0.95 0.006 78)",
                lineHeight: 1,
                margin: 0,
              }}
            >
              Our work
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
                काम
              </span>
              <div
                style={{
                  height: "1px",
                  width: "clamp(48px, 8vw, 110px)",
                  background: "oklch(0.65 0.201 36.9 / 0.45)",
                  flexShrink: 0,
                }}
              />
            </div>
          </div>
          <p
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
              lineHeight: 1.85,
              color: "oklch(0.82 0.006 70)",
              margin: "0 0 1rem 0",
              maxWidth: "56ch",
            }}
          >
            A sharper look at Studio34 across services, selected projects and client trust — built to show capability without turning the page into noise.
          </p>
          <p
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 200,
              letterSpacing: "0.22em",
              fontSize: "clamp(0.72rem, 1vw, 0.78rem)",
              textTransform: "uppercase",
              color: "oklch(0.60 0.008 65)",
              margin: 0,
            }}
          >
            Services · Projects · Clients
          </p>
        </div>
      </section>

      <div
        aria-hidden="true"
        style={{
          height: "160px",
          background:
            "linear-gradient(to bottom, oklch(0.12 0.006 60) 0%, oklch(0.15 0.006 60) 12%, oklch(0.25 0.006 62) 28%, oklch(0.45 0.006 65) 48%, oklch(0.68 0.007 72) 65%, oklch(0.85 0.007 78) 80%, oklch(0.97 0.006 80) 100%)",
          pointerEvents: "none",
        }}
      />

      <nav
        className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-4 z-40 pointer-events-auto"
        aria-label="Section index"
      >
        {[
          { id: "work-services", label: "Services" },
          { id: "work-projects", label: "Projects" },
          { id: "work-clients", label: "Clients" },
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
              e.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "0.35";
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
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "oklch(0.35 0.006 60)",
              }}
            >
              {item.label}
            </span>
          </a>
        ))}
      </nav>
      <ServicesAct />
      <VisualDivider />
      <PortfolioAct />
      <ClientsAct />
    </main>
  );
}
