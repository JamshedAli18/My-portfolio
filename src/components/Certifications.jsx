import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { certifications, education } from "../data/portfolioData";
import { useTheme } from "../context/useTheme";

gsap.registerPlugin(ScrollTrigger);

function CertCard({ cert }) {
  const CardTag = cert.credentialUrl ? "a" : "div";

  return (
    <CardTag
      className="group relative border border-warm dark:border-[#39414c] rounded-2xl p-6 bg-paper dark:bg-[#171c23] flex-shrink-0 hover:border-ink/25 dark:hover:border-accent/55 hover:bg-warm/30 dark:hover:bg-[#1b2129] transition-all duration-400 hover:scale-[1.02]"
      href={cert.credentialUrl || undefined}
      target={cert.credentialUrl ? "_blank" : undefined}
      rel={cert.credentialUrl ? "noreferrer" : undefined}
      aria-label={cert.credentialUrl ? `Open credential for ${cert.title}` : undefined}
      style={{ width: "clamp(240px, 90vw, 280px)" }}
    >
      {/* Top accent line on hover */}
      <div className="absolute top-0 left-0 right-0 h-px w-0 group-hover:w-full bg-ink dark:bg-accent transition-all duration-500 rounded-t-2xl" />

      {/* Top row: issuer + year */}
      <div className="flex items-center justify-between mb-5">
        <span className="font-body text-[10px] text-muted dark:text-[#b4b7bb] tracking-[0.18em] uppercase">
          {cert.issuer}
        </span>
        <span className="font-body text-[10px] text-muted/55 dark:text-[#98a0aa]">{cert.year}</span>
      </div>

      {/* Title */}
      <h3 className="font-body font-semibold text-base tracking-tight text-ink dark:text-[#f2efea] leading-snug mb-6">
        {cert.title}
      </h3>

      {/* Bottom */}
      <div className="flex items-center justify-between pt-4 border-t border-warm dark:border-[#2e333a] group-hover:border-ink/10 dark:group-hover:border-accent/45 transition-colors duration-300">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="font-body text-[10px] text-muted dark:text-[#b4b7bb] tracking-widest uppercase">
            Verified
          </span>
        </div>
        <span className="font-body text-xs text-muted dark:text-[#98a0aa] group-hover:text-ink dark:group-hover:text-[#f2efea] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
          ↗
        </span>
      </div>
    </CardTag>
  );
}

export default function Certifications() {
  const sectionRef   = useRef(null);
  const trackRef     = useRef(null);
  const positionRef  = useRef(0);
  const pausedRef    = useRef(false);
  const totalWidthRef = useRef(0);
  const touchStartXRef = useRef(null);
  const { isDark } = useTheme();

  const normalizePosition = useCallback((value, total) => {
    if (!total) return 0;
    return ((value % total) + total) % total;
  }, []);

  const moveTrack = useCallback((delta) => {
    const track = trackRef.current;
    const total = totalWidthRef.current;
    if (!track || !total) return;

    positionRef.current = normalizePosition(positionRef.current + delta, total);
    track.style.transform = `translateX(-${positionRef.current}px)`;
  }, [normalizePosition]);

  /* ── infinite horizontal scroll ── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const SPEED = 0.5; // px per frame — lower = slower
    let rafId;

    const setTrackWidth = () => {
      totalWidthRef.current = track.scrollWidth / 2; // half because we duplicated
    };
    setTrackWidth();

    const animate = () => {
      if (!pausedRef.current) {
        moveTrack(SPEED);
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    window.addEventListener("resize", setTrackWidth);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", setTrackWidth);
    };
  }, [moveTrack]);

  /* ── scroll reveal animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ce-label",
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".ce-label", start: "top 88%", once: true } }
      );
      gsap.fromTo(".ce-heading",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".ce-heading", start: "top 88%", once: true } }
      );
      gsap.fromTo(".ce-marquee",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".ce-marquee", start: "top 88%", once: true } }
      );
      gsap.fromTo(".ed-card",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: ".ed-block", start: "top 88%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* duplicated cards for seamless loop */
  const allCerts = [...certifications, ...certifications];

  return (
    <section ref={sectionRef} id="certifications" className="w-full py-16 sm:py-24 lg:py-32 border-t border-warm dark:border-[#2e333a] bg-warm/25 dark:bg-[#12161c]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Label */}
        <div className="ce-label flex items-center gap-4 mb-10 sm:mb-12 lg:mb-16">
          <span className="font-body text-[10px] text-muted dark:text-[#b4b7bb] tracking-[0.2em] uppercase">
            05 — Certifications
          </span>
          <span className="h-px bg-warm dark:bg-[#2e333a] w-12 sm:w-16 lg:w-20" />
        </div>

        {/* Heading */}
        <div className="ce-heading mb-10 sm:mb-12 lg:mb-16">
          <h2
            className="font-display font-extrabold tracking-tightest text-ink dark:text-[#f2efea] leading-[1.15]"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}
          >
            Credentials & <span className="text-muted dark:text-accent">learning.</span>
          </h2>
        </div>

      </div>

      {/* ── Marquee — full bleed, no padding ── */}
      <div
        className="ce-marquee w-full overflow-hidden mb-14"
        onMouseEnter={() => { pausedRef.current = true;  }}
        onMouseLeave={() => { pausedRef.current = false; }}
        onWheel={(e) => {
          pausedRef.current = true;
          moveTrack(e.deltaY + e.deltaX);
        }}
        onTouchStart={(e) => {
          pausedRef.current = true;
          touchStartXRef.current = e.touches[0].clientX;
        }}
        onTouchMove={(e) => {
          if (touchStartXRef.current === null) return;
          const currentX = e.touches[0].clientX;
          const delta = touchStartXRef.current - currentX;
          moveTrack(delta);
          touchStartXRef.current = currentX;
        }}
        onTouchEnd={() => {
          touchStartXRef.current = null;
          pausedRef.current = false;
        }}
      >
        {/* fade edges */}
        <div className="relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
            style={{
              background: isDark
                ? "linear-gradient(to right, #12161c, transparent)"
                : "linear-gradient(to right, #f0ede8, transparent)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
            style={{
              background: isDark
                ? "linear-gradient(to left, #12161c, transparent)"
                : "linear-gradient(to left, #f0ede8, transparent)",
            }}
          />

          {/* scrolling track */}
          <div
            ref={trackRef}
            className="flex gap-4 py-2"
            style={{ width: "max-content" }}
          >
            {allCerts.map((cert, i) => (
              <CertCard key={`${cert.title}-${i}`} cert={cert} />
            ))}
          </div>
        </div>
      </div>

      {/* Education block */}
      <div className="ed-block max-w-6xl mx-auto px-4 sm:px-6">
        <p className="font-body text-[10px] text-muted dark:text-[#b4b7bb] tracking-[0.2em] uppercase mb-5 text-center">
          Education
        </p>
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
          {education.map((edu) => (
            <div key={edu.degree}
              className="ed-card relative overflow-hidden border border-warm dark:border-[#39414c] rounded-2xl p-5 sm:p-6 bg-paper dark:bg-[#171c23] hover:border-ink/20 dark:hover:border-accent/55 transition-colors duration-300">
              {!isDark && (
                <>
                  <div className="absolute inset-0 bg-black pointer-events-none" />
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/15 pointer-events-none" />
                </>
              )}
              <div className="relative z-10">
              <p className={`font-body text-[10px] tracking-widest uppercase mb-3 ${isDark ? "text-muted dark:text-[#98a0aa]" : "text-paper/70"}`}>{edu.period}</p>
              <h3 className={`font-name font-semibold text-base tracking-tight mb-2 leading-relaxed ${isDark ? "text-ink dark:text-[#f2efea]" : "text-paper"}`}>
                {edu.degree}
              </h3>
              <p className={`font-body text-sm leading-relaxed ${isDark ? "text-ink/55 dark:text-[#c7ccd2]/80" : "text-paper/75"}`}>{edu.school}</p>
              </div>
            </div>
          ))}

          {/* Total certs card */}
          <div className="ed-card relative overflow-hidden border border-warm dark:border-[#39414c] rounded-2xl p-5 sm:p-6 bg-paper dark:bg-[#171c23] hover:border-ink/20 dark:hover:border-accent/55 transition-colors duration-300">
            {!isDark && (
              <>
                <div className="absolute inset-0 bg-black pointer-events-none" />
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/15 pointer-events-none" />
              </>
            )}
            <div className="relative z-10">
            <p className={`font-body text-[10px] tracking-[0.18em] uppercase mb-3 ${isDark ? "text-muted dark:text-[#b4b7bb]" : "text-paper/70"}`}>Total Certs</p>
            <p className={`font-body font-extrabold text-4xl mb-1 ${isDark ? "text-ink dark:text-[#f2efea]" : "text-paper"}`}>
              10+
            </p>
            <p className={`font-body text-xs leading-relaxed ${isDark ? "text-ink/50 dark:text-[#c7ccd2]/75" : "text-paper/75"}`}>
              LangChain · Udacity · Kaggle<br />HEC Training · Anthropic · DataCamp & more
            </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}