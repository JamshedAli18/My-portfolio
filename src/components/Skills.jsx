import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_META = {
  "Machine Learning": { number: "01", desc: "Core ML methods and validation" },
  "Deep Learning": { number: "02", desc: "Neural model design and training" },
  "Generative and Agentic Ai": { number: "03", desc: "LLMs, agents, and orchestration" },
  "AI & ML Frameworks": { number: "04", desc: "Core AI and ML development stack" },
  "Backend & Frontend": { number: "05", desc: "Application and API development" },
  "DevOps & Tools": { number: "06", desc: "Delivery tooling and engineering ops" },
};

const LEARNING_TOOLS = [
  {
    label: "VS Code",
    tone: "linear-gradient(135deg, #25a7ff 0%, #006bdf 100%)",
    icon: VSCodeIcon,
  },
  {
    label: "PyCharm",
    tone: "linear-gradient(135deg, #101828 0%, #1f2937 100%)",
    icon: PyCharmIcon,
  },
  {
    label: "Antigravity",
    tone: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
    icon: AntigravityIcon,
  },
  {
    label: "GitHub",
    tone: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
    icon: GitHubIcon,
  },
];

function VSCodeIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M17.2 4.2 8.6 10.9 5.3 8.4 3.4 10l4.1 2.4-4.1 2.4 1.9 1.6 3.3-2.5 8.6 6.7c.7.5 1.7 0 1.7-.9V5.1c0-.9-1-1.4-1.7-.9Z" fill="currentColor" />
      <path d="M17.2 4.2 12 8.4v7.2l5.2 4c.7.5 1.7 0 1.7-.9V5.1c0-.9-1-1.4-1.7-.9Z" fill="rgba(255,255,255,0.2)" />
    </svg>
  );
}

function PyCharmIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="4" fill="#111827" />
      <path d="M6.1 6.6h5.2v1.7H7.9v1.8h3.1v1.7H7.9v3.6H6.1V6.6Z" fill="#ffffff" />
      <path d="M13.4 6.6h4.4v1.7h-2.6v4.6h2.6v1.7h-4.4V6.6Z" fill="#00d084" />
      <path d="M13.7 14.7 18 6.6h1.7l-4.4 8.1h-1.6Z" fill="#ff4db8" />
    </svg>
  );
}

function AntigravityIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="6.8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7.2 15.1a7 7 0 0 0 9.6 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M8 9.1c1-.9 2.3-1.4 4-1.4s3 .5 4 1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      <path d="M18 6.2l1.6-1.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function GitHubIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 3.5a8.5 8.5 0 0 0-2.7 16.5c.4.1.5-.2.5-.4v-1.5c-2.1.4-2.6-.9-2.6-.9-.4-.9-.9-1.1-.9-1.1-.8-.5.1-.5.1-.5.9.1 1.4 1 1.4 1 .8 1.3 2.1.9 2.6.7.1-.6.3-.9.6-1.2-1.7-.2-3.4-.9-3.4-3.8 0-.8.3-1.5.8-2.1-.1-.2-.3-1 .1-2 0 0 .7-.2 2.2.8a7.8 7.8 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.4 1 .2 1.8.1 2 .5.6.8 1.3.8 2.1 0 2.9-1.7 3.6-3.4 3.8.3.3.6.8.6 1.7v2.5c0 .2.1.5.5.4A8.5 8.5 0 0 0 12 3.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LearningToolBadge({ tool }) {
  const Icon = tool.icon;

  return (
    <div className="flex h-8 w-[132px] items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 backdrop-blur-[2px] transition-transform duration-200 hover:-translate-y-0.5 sm:w-[140px]">
      <span
        className="grid h-5.5 w-5.5 shrink-0 place-items-center rounded-full text-white shadow-sm"
        style={{ background: tool.tone }}
      >
        <Icon className="h-3 w-3" />
      </span>
      <span className="min-w-0 flex-1 text-center font-body text-[9px] sm:text-[10px] text-paper/80 tracking-wide truncate">
        {tool.label}
      </span>
    </div>
  );
}

function FlipCard({ category, items, meta }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      style={{ height: "168px", perspective: "1000px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onTouchStart={() => setFlipped(!flipped)}
    >
      {/* Card inner — rotates on flip */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >

        {/* ── FRONT ── */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          className="absolute inset-0 border border-warm dark:border-[#39414c] rounded-2xl p-2.5 bg-paper dark:bg-[#171c23] flex flex-col justify-between hover:border-ink/20 dark:hover:border-accent/55 transition-colors duration-300"
        >
          {/* top row: number + count */}
          <div className="flex items-start justify-between">
            <span className="font-body text-[10px] text-muted/50 dark:text-[#98a0aa] tracking-[0.2em] uppercase">
              {meta.number}
            </span>
            <span className="font-body text-[9px] text-muted/50 dark:text-[#98a0aa] border border-warm dark:border-[#39414c] rounded-full px-2 py-0.5">
              {items.length} skills
            </span>
          </div>

          {/* middle: title */}
          <div className="min-w-0">
            <h3 className="font-display font-extrabold text-[13px] sm:text-sm tracking-tight text-ink dark:text-[#f2efea] mb-1 leading-tight break-words">
              {category}
            </h3>
            <p className="font-body text-[9px] sm:text-[10px] text-muted dark:text-[#b4b7bb] leading-relaxed break-words">
              {meta.desc}
            </p>
          </div>

          {/* bottom: hover hint */}
          <div className="flex items-center gap-2">
            <span className="w-4 h-px bg-accent" />
            <span className="font-body text-[9px] text-muted/50 dark:text-[#98a0aa] tracking-widest uppercase">
              Hover to explore
            </span>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 border border-ink/10 rounded-2xl p-2.5 bg-ink dark:bg-accent flex flex-col justify-between overflow-hidden"
        >
          {/* top: category label */}
          <div className="flex items-start justify-between gap-2 mb-2.5">
            <span className="min-w-0 font-body text-[8px] sm:text-[9px] text-paper/40 tracking-[0.14em] uppercase break-words leading-tight">
              {meta.number} — {category}
            </span>
            <span className="font-body text-[9px] text-paper/30 shrink-0">
              {items.length}
            </span>
          </div>

          {/* skills list */}
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 flex-1 overflow-hidden">
            {items.map((skill, i) => (
              <div key={skill} className="flex items-center gap-2 min-w-0">
                <span
                  className="w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: i === 0 ? "#c8472a" : "#ffffff30" }}
                />
                <span className="font-body text-[8px] sm:text-[9px] text-paper/70 leading-tight break-words">
                  {skill}
                </span>
              </div>
            ))}
          </div>

          {/* bottom accent */}
          <div className="mt-3 h-px w-full bg-white/10" />
        </div>

      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".sk-label",
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".sk-label", start: "top 88%", once: true } }
      );
      gsap.fromTo(".sk-heading",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".sk-heading", start: "top 88%", once: true } }
      );
      gsap.fromTo(".sk-card",
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: ".sk-grid", start: "top 85%", once: true } }
      );
      gsap.fromTo(".sk-bottom",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".sk-bottom", start: "top 90%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="w-full py-24 sm:py-32 px-4 sm:px-6 border-t border-warm dark:border-[#2e333a]">
      <div className="max-w-6xl mx-auto">

        {/* Label */}
        <div className="sk-label flex items-center gap-4 mb-12 sm:mb-16">
          <span className="font-body text-[10px] text-muted tracking-[0.2em] uppercase">
            04 — Skills
          </span>
          <span className="h-px bg-warm dark:bg-[#2e333a] w-16 sm:w-20" />
        </div>

        {/* Heading */}
        <div className="sk-heading flex items-end justify-between mb-12 sm:mb-14">
          <h2
            className="font-display font-extrabold tracking-tightest text-ink dark:text-[#f2efea] leading-[1.15]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
          >
            What I <span className="text-muted dark:text-accent">work with.</span>
          </h2>
          <span className="hidden md:block font-body text-xs text-muted dark:text-[#b4b7bb] mb-1">
            {Object.values(skills).flat().length} total skills
          </span>
        </div>

        {/* Flip cards grid */}
        <div className="sk-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="sk-card min-w-0">
              <FlipCard
                category={category}
                items={items}
                meta={CATEGORY_META[category]}
              />
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="sk-bottom relative overflow-hidden rounded-2xl bg-ink dark:bg-accent text-paper p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-5">
          <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-accent/15 pointer-events-none" />
          <div className="relative z-10">
            <p className="font-display font-extrabold text-xl sm:text-2xl tracking-tightest mb-1.5">
              Always learning.
            </p>
            <p className="font-body text-xs sm:text-sm text-paper/50 max-w-sm">
              Currently exploring Agentic AI using tools like CrewAI, LangGraph, and n8n.
            </p>
          </div>
          <div className="relative z-10 flex flex-col items-start gap-1.5 sm:gap-2">
            {LEARNING_TOOLS.map((tool) => (
              <LearningToolBadge key={tool.label} tool={tool} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}