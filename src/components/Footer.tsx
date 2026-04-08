import { useState } from "react";

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="transition-colors duration-200"
      style={{
        color: hovered ? "oklch(0.57 0.135 38)" : "oklch(0.40 0.006 60)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const socialLinks = (
    <div className="flex items-center gap-5">
      <SocialLink
        href="https://www.instagram.com/studio_trentaquattro"
        label="Instagram"
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>Instagram</title>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
        </svg>
      </SocialLink>
      <SocialLink
        href="https://www.linkedin.com/company/studio34-india"
        label="LinkedIn"
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>LinkedIn</title>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      </SocialLink>
      <SocialLink
        href="https://www.facebook.com/studio_trentaquattro"
        label="Facebook"
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>Facebook</title>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      </SocialLink>
    </div>
  );

  const address = (
    <div className="flex flex-col gap-1">
      <span
        className="font-barlow"
        style={{
          fontWeight: 300,
          letterSpacing: "0.05em",
          fontSize: "0.72rem",
          color: "oklch(0.40 0.006 60)",
        }}
      >
        85, Sector 3, IMT Manesar
      </span>
      <span
        className="font-barlow"
        style={{
          fontWeight: 300,
          letterSpacing: "0.05em",
          fontSize: "0.72rem",
          color: "oklch(0.40 0.006 60)",
        }}
      >
        Haryana – 122052, India
      </span>
      <a
        href="mailto:info@studio34.in"
        className="font-barlow"
        style={{
          fontWeight: 300,
          letterSpacing: "0.06em",
          fontSize: "0.72rem",
          color: "oklch(0.57 0.135 38)",
          textDecoration: "none",
          marginTop: "0.5rem",
        }}
      >
        info@studio34.in
      </a>
    </div>
  );

  const copyright = (
    <p
      className="font-barlow"
      style={{
        fontWeight: 200,
        letterSpacing: "0.04em",
        fontSize: "0.7rem",
        color: "oklch(0.50 0.006 60)",
      }}
    >
      © {year} Studio34. All rights reserved.
    </p>
  );

  return (
    <footer
      className="relative border-t"
      style={{
        background: "oklch(0.94 0.010 82)",
        borderColor: "oklch(0.57 0.135 38 / 0.15)",
      }}
    >
      <div className="hidden md:flex items-center justify-between px-10 lg:px-20 py-8">
        <div className="flex flex-col gap-2">
          <img
            src="/assets/uploads/new34_logo-1.png"
            alt="Studio34"
            style={{
              height: "56px",
              width: "auto",
              objectFit: "contain",
              opacity: 0.82,
            }}
          />
        </div>

        <div className="flex flex-col items-center gap-0.5 text-center">{address}</div>

        <div className="flex flex-col items-end gap-3">
          {socialLinks}
          {copyright}
        </div>
      </div>

      <div className="md:hidden px-6 pt-8 pb-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <img
              src="/assets/uploads/new34_logo-1.png"
              alt="Studio34"
              style={{
                height: "48px",
                width: "auto",
                objectFit: "contain",
                objectPosition: "left center",
                opacity: 0.82,
              }}
            />
            <div>{socialLinks}</div>
          </div>
          <div className="flex flex-col gap-4">
            <div>{address}</div>
            <div>{copyright}</div>
          </div>
        </div>
      </div>

      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, oklch(0.57 0.135 38 / 0.25), transparent)",
        }}
      />
    </footer>
  );
}
