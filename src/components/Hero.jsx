import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { personalInfo } from "../data/portfolioData";
import { useTheme } from "../context/useTheme";
import { scrollToTarget } from "../utils/scrollToTarget";

export default function Hero() {
  const containerRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState(personalInfo.roles[0]);
  const [fading, setFading] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        const next = (roleIndex + 1) % personalInfo.roles.length;
        setRoleIndex(next);
        setDisplayed(personalInfo.roles[next]);
        setFading(false);
      }, 400);
    }, 2200);
    return () => clearInterval(interval);
  }, [roleIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      tl.fromTo(".h-badge",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" })
        .fromTo(".h-name",
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" }, "-=0.2")
        .fromTo(".h-role",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" }, "-=0.3")
        .fromTo(".h-tagline",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.2")
        .fromTo(".h-bottom",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" }, "-=0.2")
        .fromTo(".h-scroll",
          { opacity: 0 },
          { opacity: 1, duration: 0.5 }, "-=0.1");

      gsap.to(".scroll-line-fill", {
        y: 28, repeat: -1, yoyo: true,
        duration: 1.6, ease: "sine.inOut", delay: 2.5,
      });

      const handleMouseMove = (e) => {
        const xPct = (e.clientX / window.innerWidth - 0.5) * 10;
        const yPct = (e.clientY / window.innerHeight - 0.5) * 6;
        gsap.to(".h-name", {
          x: xPct * 0.3, y: yPct * 0.2,
          duration: 1.4, ease: "power1.out",
        });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const QUOTE = "I don't prompt AI into existence - I architect it, fine-tune it, chain it into agents, and ship it into production where it actually has to perform.";

  return (
    <section
      ref={containerRef}
      className="relative w-full max-w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 pt-16 sm:pt-20 pb-16 sm:pb-24 overflow-hidden overflow-x-clip transition-colors duration-500 dark:bg-[#0f1115]"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(circle, #f3eee40f 1px, transparent 1px)"
            : "radial-gradient(circle, #0f0f0d10 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Accent glow top right */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle at center, #c8472a2d 0%, transparent 68%)"
            : "radial-gradient(circle at center, #c8472a0d 0%, transparent 65%)",
        }}
      />

      {/* Accent glow bottom left */}
      <div
        className="absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle at center, #f5f3ee0f 0%, transparent 72%)"
            : "radial-gradient(circle at center, #0f0f0d06 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full min-w-0">

        {/* ── TOP ROW: badge + year ── */}
        <div className="h-badge flex items-center justify-between mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="font-body text-xs text-accent tracking-[0.15em] uppercase">
              Available for opportunities
            </span>
          </div>
        </div>

        {/* ── NAME ── */}
        <div className="overflow-visible mb-4">
          <h1
            className="h-name font-name font-extrabold text-ink dark:text-[#f2efea]"
            style={{
              fontSize: "clamp(2.2rem, 11vw, 8rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
            }}
          >
            <span className="font-name block sm:inline">
              {personalInfo.name.split(" ")[0]}
            </span>
            <span
              className="block sm:inline ml-0 sm:ml-[0.10em]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 700,
                color: "#c8472a",
                letterSpacing: "-0.03em",
                fontSize: "1.08em",
              }}
            >
              {personalInfo.name.split(" ")[1]}
            </span>
          </h1>
        </div>

        {/* ── ROLE cycling ── */}
        <div className="h-role flex items-center gap-3 mb-10 sm:mb-12">
          <span className="w-6 h-px bg-accent flex-shrink-0" />
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(1.05rem, 2vw, 1.45rem)",
              color: isDark ? "#c7c9cd" : "#9b9690",
              opacity: fading ? 0 : 1,
              transform: fading ? "translateY(8px)" : "translateY(0)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
              letterSpacing: "0.08em",
            }}
          >
            {displayed}
          </span>
        </div>

        {/* ── MARQUEE QUOTE ── */}
        <div
          className="h-tagline relative w-full min-w-0 overflow-hidden mb-10 sm:mb-12 px-0.5"
          style={{
            background: isDark
              ? "linear-gradient(180deg, #00000000 0%, #ffffff06 50%, #00000000 100%)"
              : "linear-gradient(180deg, #00000000 0%, #00000005 50%, #00000000 100%)",
          }}
        >

          {/* top rule */}
          <div className="w-full h-px bg-ink/15 dark:bg-[#8d939d33] mb-3" />

          {/* marquee track */}
          <div
            className="w-full min-w-0 flex overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            {[0, 1].map((n) => (
              <div
                key={n}
                className="flex-shrink-0 flex items-center gap-8"
                style={{
                  animation: "marquee 36s linear infinite",
                  willChange: "transform",
                  paddingRight: "2.25rem",
                }}
              >
                {/* main quote */}
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "clamp(0.95rem, 1.25vw, 1.08rem)",
                    color: isDark ? "#e6e1d8" : "#1a1815",
                    opacity: 0.9,
                    whiteSpace: "nowrap",
                    letterSpacing: "0.01em",
                  }}
                >
                  "{QUOTE}"
                </span>

                {/* accent dot */}
                <span
                  className="flex-shrink-0 w-1 h-1 rounded-full bg-accent"
                  style={{ opacity: 0.45 }}
                />

                {/* faded repeat */}
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: "clamp(0.95rem, 1.25vw, 1.08rem)",
                    color: isDark ? "#d9d4cb" : "#25211c",
                    opacity: 0.32,
                    whiteSpace: "nowrap",
                    letterSpacing: "0.01em",
                  }}
                >
                  "{QUOTE}"
                </span>

                {/* warm dot */}
                <span
                  className="flex-shrink-0 w-1 h-1 rounded-full bg-warm"
                  style={{ opacity: 0.65 }}
                />
              </div>
            ))}
          </div>

          {/* bottom rule */}
          <div className="w-full h-px bg-ink/15 dark:bg-[#8d939d33] mt-3" />
        </div>

        {/* ── BOTTOM ROW: meta + buttons all on same line ── */}
        <div className="h-bottom w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-5">

          {/* Left: meta info */}
          <div className="w-full sm:w-auto flex flex-wrap items-center gap-x-5 gap-y-2.5 sm:gap-x-8">
            {[
              { label: "Location", value: personalInfo.location  },
              { label: "Focus",    value: "AI · ML · LLM Agents" },
            ].map(({ label, value }) => (
              <div key={label} className="min-w-[128px] sm:min-w-0 flex items-baseline gap-2.5">
                <span className="font-body text-[10px] text-muted/55 tracking-[0.15em] uppercase flex-shrink-0">
                  {label}
                </span>
                <span className="font-body text-[11px] leading-relaxed text-ink/55 dark:text-[#d4d7db]/75 break-words">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Right: CTAs */}
          <div className="flex flex-col items-center sm:items-end gap-2.5 w-full sm:w-auto">
            <div className="w-full sm:w-auto flex flex-wrap items-center justify-center sm:justify-end gap-3">
              <button
                onClick={() => scrollToTarget("projects", { offset: -60, duration: 1.05 })}
                className="flex-1 sm:flex-none text-center font-body font-medium text-[13px] bg-ink text-paper dark:bg-[#f2efea] dark:text-[#0f1115] px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-accent hover:text-[#fff5ef] transition-all duration-300"
              >
                View Work →
              </button>
              <button
                onClick={() => scrollToTarget("contact", { offset: -60, duration: 1.05 })}
                className="flex-1 sm:flex-none text-center font-body font-medium text-[13px] border border-ink/25 dark:border-[#3a424d] text-ink dark:text-[#f2efea] px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:border-ink dark:hover:border-[#f2efea] transition-colors duration-300"
              >
                Get in Touch
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* ── Scroll indicator ── */}
      <div className="h-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-body text-[9px] tracking-[0.25em] text-muted/60 dark:text-[#adb2b8]/70 uppercase">Scroll</span>
        <div className="relative w-px h-10 bg-warm dark:bg-[#2e333a] overflow-hidden">
          <div className="scroll-line-fill absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-muted to-transparent" />
        </div>
      </div>

    </section>
  );
}