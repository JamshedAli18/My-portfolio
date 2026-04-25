import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const openToRoles = [
    "AI Engineer",
    "ML Engineer",
    "Generative AI Developer",
    "Agentic AI Engineer",
    "Software Developer (Python)",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ct-label",
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".ct-label", start: "top 88%", once: true } }
      );
      gsap.fromTo(".ct-heading span",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: ".ct-heading", start: "top 88%", once: true } }
      );
      gsap.fromTo(".ct-sub",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.2,
          scrollTrigger: { trigger: ".ct-sub", start: "top 90%", once: true } }
      );
      gsap.fromTo(".ct-link",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: ".ct-links", start: "top 85%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-6 border-t border-warm dark:border-[#2e333a]">
      <div className="max-w-6xl mx-auto">

        <div className="ct-label flex items-center gap-4 mb-10 sm:mb-12 lg:mb-16">
          <span className="font-body text-[10px] text-muted dark:text-[#b4b7bb] tracking-[0.2em] uppercase">06 — Contact</span>
          <span className="h-px bg-warm dark:bg-[#2e333a] w-12 sm:w-16 lg:w-20" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">

          <div>
            <div className="ct-heading overflow-hidden mb-5 sm:mb-6">
              <h2 className="font-display font-extrabold tracking-tightest leading-[0.95]"
                style={{ fontSize: "clamp(1.8rem, 4vw, 5rem)" }}>
                <span className="block text-ink dark:text-[#f2efea]">Let's work</span>
                <span className="block text-muted dark:text-accent">together.</span>
              </h2>
            </div>
            <p className="ct-sub font-body text-xs sm:text-sm lg:text-base text-ink/60 dark:text-[#d4d7db]/80 leading-[1.7] sm:leading-[1.8] max-w-sm mb-4 sm:mb-6 lg:mb-8">
              Open to AI/ML roles mentioned below.
            </p>
            <div className="ct-sub flex flex-wrap gap-2.5 mb-4 sm:mb-6 lg:mb-8 max-w-xl">
              {openToRoles.map((role) => (
                <span
                  key={role}
                  className="inline-flex items-center rounded-full border border-warm dark:border-[#39414c] bg-paper dark:bg-[#171c23] px-3 py-1 text-[11px] sm:text-xs text-ink/70 dark:text-[#d4d7db]/80"
                >
                  {role}
                </span>
              ))}
            </div>
            <div className="ct-sub inline-flex items-center gap-2.5 border border-warm dark:border-[#39414c] rounded-full px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 bg-paper dark:bg-[#171c23]">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                <span className="relative rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="font-body text-[11px] sm:text-xs text-ink/60 dark:text-[#d4d7db]/80">Available · Response within 24h</span>
            </div>
          </div>

          <div className="ct-links flex flex-col gap-2.5 sm:gap-3">
            {[
              { label: "Email",    sub: personalInfo.email,               href: `mailto:${personalInfo.email}`, dark: false },
              { label: "LinkedIn", sub: "linkedin.com/in/jamshed-ali",    href: personalInfo.linkedin,          dark: false },
              { label: "GitHub",   sub: "github.com/jamshed-ali",         href: personalInfo.github,            dark: true  },
            ].map(({ label, sub, href, dark }) => (
              <a key={label} href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`ct-link group flex items-center justify-between rounded-2xl px-5 sm:px-7 py-4 sm:py-5 transition-all duration-300 ${
                  dark
                    ? "bg-ink dark:bg-accent text-paper hover:bg-accent"
                    : "border border-warm dark:border-[#39414c] bg-paper dark:bg-[#171c23] hover:border-ink/30 dark:hover:border-accent/55"
                }`}>
                <div className="min-w-0">
                  <p className={`font-body text-[10px] tracking-[0.15em] uppercase mb-1 ${dark ? "text-paper/40" : "text-muted dark:text-[#b4b7bb]"}`}>
                    {label}
                  </p>
                  <p className={`font-display font-bold text-base sm:text-lg tracking-tight break-all sm:break-normal sm:truncate ${dark ? "text-paper" : "text-ink dark:text-[#f2efea]"}`}>
                    {sub}
                  </p>
                </div>
                <span className={`text-xl ml-4 flex-shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                  dark ? "text-paper/50 group-hover:text-paper" : "text-warm dark:text-[#4a5564] group-hover:text-ink dark:group-hover:text-[#f2efea]"
                }`}>↗</span>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}