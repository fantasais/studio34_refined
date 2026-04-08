const enquiryMailto =
  "mailto:info@studio34.in?subject=Studio34%20Project%20Enquiry&body=Hello%20Studio34,%0D%0A%0D%0AI%27d%20like%20to%20discuss%20a%20project.%0D%0A%0D%0AProject%20type:%20%0D%0ATimeline:%20%0D%0AWhat%20needs%20to%20be%20designed%20or%20developed:%20%0D%0A%0D%0ARegards,";

export default function CtaSection() {
  return (
    <section
      id="contact"
      data-ocid="cta.section"
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

      <div className="mx-auto max-w-7xl px-6 md:px-16 lg:px-24 py-24 md:py-32 flex flex-col items-center text-center gap-8 md:gap-10">
        <div className="flex flex-col items-center gap-4">
          <h2
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 100,
              letterSpacing: "0.16em",
              fontSize: "clamp(1.6rem, 4vw, 3.2rem)",
              textTransform: "uppercase",
              color: "oklch(0.12 0.006 60)",
              lineHeight: "1.3",
              textAlign: "center",
            }}
          >
            <div>
              <span style={{ fontWeight: 600 }}>DREAM</span>{" "}
              <span style={{ fontWeight: 100 }}>big</span>{" "}
              <span
                style={{
                  color: "oklch(0.65 0.201 36.9)",
                  fontWeight: 200,
                  margin: "0 0.35em",
                }}
              >
                |
              </span>{" "}
              <span style={{ fontWeight: 600 }}>DESIGN</span>{" "}
              <span style={{ fontWeight: 100 }}>better</span>
            </div>
            <div>
              <span style={{ fontWeight: 600 }}>DEVELOP</span>{" "}
              <span style={{ fontWeight: 100 }}>faster</span>
            </div>
          </h2>
        </div>

        <div
          style={{
            height: "1px",
            width: "min(140px, 30%)",
            background:
              "linear-gradient(to right, transparent, oklch(0.65 0.201 36.9 / 0.4), transparent)",
          }}
        />

        <p
          className="tracking-[0.01em] md:tracking-[0.03em]"
          style={{
            fontFamily: "Barlow, sans-serif",
            fontWeight: 300,
            lineHeight: "1.9",
            fontSize: "clamp(0.95rem, 1.45vw, 1.02rem)",
            color: "oklch(0.40 0.006 62)",
            maxWidth: "560px",
          }}
        >
          Every vehicle that moves the world began as a single point of intention.
          <br />
          If you have a brief worth building, Studio34 has the process to take it forward.
        </p>

        <div className="flex flex-col items-center gap-3">
          <a
            href={enquiryMailto}
            data-ocid="cta.primary_button"
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 300,
              letterSpacing: "0.24em",
              fontSize: "clamp(0.72rem, 1.1vw, 0.8rem)",
              textTransform: "uppercase",
              color: "oklch(0.97 0.006 80)",
              background: "oklch(0.12 0.006 60)",
              padding: "1rem 2.75rem",
              border: "1px solid oklch(0.12 0.006 60)",
              borderRadius: "2px",
              textDecoration: "none",
              display: "inline-block",
              transition: "background 0.25s ease, color 0.25s ease, border-color 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "oklch(0.65 0.201 36.9)";
              e.currentTarget.style.borderColor = "oklch(0.65 0.201 36.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "oklch(0.12 0.006 60)";
              e.currentTarget.style.borderColor = "oklch(0.12 0.006 60)";
            }}
          >
            Start a conversation
          </a>

          <p
            style={{
              fontFamily: "Barlow, sans-serif",
              fontWeight: 300,
              letterSpacing: "0.16em",
              fontSize: "0.7rem",
              textTransform: "uppercase",
              color: "oklch(0.52 0.008 65)",
              textAlign: "center",
            }}
          >
            Project enquiries · Collaborations · Strategic partnerships
          </p>
        </div>
      </div>
    </section>
  );
}
