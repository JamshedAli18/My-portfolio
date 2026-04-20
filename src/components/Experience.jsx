import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience, education } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(".ex-label",
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".ex-label", start: "top 88%", once: true } }
      );

      gsap.fromTo(".ex-heading",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".ex-heading", start: "top 88%", once: true } }
      );

      gsap.fromTo(".ex-item",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.65, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: ".ex-list", start: "top 85%", once: true } }
      );

      gsap.fromTo(".ed-item",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: ".ed-list", start: "top 85%", once: true } }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-32 px-6 border-t border-warm bg-warm/25">
      <div className="max-w-6xl mx-auto">

        {/* Label */}
        <div className="ex-label flex items-center gap-4 mb-16">
          <span className="font-body text-[10px] text-muted tracking-[0.2em] uppercase">
            04 — Experience
          </span>
          <span className="h-px bg-warm w-20" />
        </div>

        {/* Heading */}
        <div className="ex-heading mb-16">
          <h2
            className="font-display font-extrabold tracking-tightest text-ink leading-[1.0]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            Where I've <span className="text-muted">worked.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-16 xl:gap-24 items-start">

          {/* ── Work experience timeline ── */}
          <div className="ex-list flex flex-col">
            {experience.map((exp, i) => (
              <div
                key={i}
                className="ex-item group relative pl-8 pb-12 border-l border-warm last:pb-0 hover:border-ink/25 transition-colors duration-300"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-warm bg-paper group-hover:border-accent group-hover:bg-accent transition-all duration-300" />

                {/* Period */}
                <span className="font-body text-[10px] text-muted tracking-[0.15em] uppercase mb-2 block">
                  {exp.period}
                </span>

                {/* Role + company */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3 mb-3">
                  <h3 className="font-display font-bold text-xl tracking-tight text-ink">
                    {exp.role}
                  </h3>
                  <span className="font-body text-sm text-accent font-medium">
                    @ {exp.company}
                  </span>
                </div>

                {/* Description */}
                <p className="font-body text-sm text-ink/60 leading-[1.8] max-w-xl">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>

          {/* ── Education + Publications ── */}
          <div className="ed-list flex flex-col gap-4">

            <p className="font-body text-[10px] text-muted tracking-[0.2em] uppercase mb-2">
              Education
            </p>

            {education.map((edu, i) => (
              <div
                key={i}
                className="ed-item border border-warm rounded-2xl p-6 bg-paper hover:border-ink/20 transition-colors duration-300"
              >
                <p className="font-body text-[10px] text-muted tracking-widest uppercase mb-2">
                  {edu.period}
                </p>
                <h3 className="font-display font-bold text-base tracking-tight text-ink mb-1 leading-snug">
                  {edu.degree}
                </h3>
                <p className="font-body text-sm text-ink/55">{edu.school}</p>
              </div>
            ))}

            {/* Publications card */}
            <div className="ed-item border border-accent/25 rounded-2xl p-6 bg-accent/5">
              <p className="font-body text-[10px] text-accent tracking-[0.18em] uppercase mb-3">
                Publications
              </p>
              <p className="font-display font-bold text-2xl tracking-tightest text-ink mb-1">
                4 papers
              </p>
              <p className="font-body text-xs text-ink/50 leading-relaxed">
                NeurIPS · ICML<br />
                Model-based RL, sample efficiency & world models
              </p>
            </div>

            {/* Certifications hint */}
            <div className="ed-item border border-warm rounded-2xl p-6 bg-paper flex items-center justify-between group hover:border-ink/20 transition-colors duration-300 cursor-default">
              <div>
                <p className="font-body text-[10px] text-muted tracking-widest uppercase mb-1">Certifications</p>
                <p className="font-display font-bold text-base tracking-tight text-ink">AWS ML Specialty</p>
              </div>
              <span className="text-warm text-xl group-hover:text-muted transition-colors duration-200">→</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}