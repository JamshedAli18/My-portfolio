import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, PROJECT_CATEGORIES, personalInfo } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

function getOptimizedProjectImage(image) {
  if (!image) return "";

  try {
    const url = new URL(image);
    if (url.hostname.includes("images.unsplash.com")) {
      url.searchParams.set("auto", "format");
      url.searchParams.set("fit", "crop");
      url.searchParams.set("w", "900");
      url.searchParams.set("q", "60");
    }
    return url.toString();
  } catch {
    return image;
  }
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const cardNo = String(index + 1).padStart(2, "0");
  const visibleTech = project.stack.slice(0, 4);
  const extraTechCount = Math.max(project.stack.length - visibleTech.length, 0);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(card,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: "power3.out",
          delay: (index % 2) * 0.1,
          scrollTrigger: { trigger: card, start: "top 92%", once: true } }
      );
    }, card);
    return () => ctx.revert();
  }, [index]);

  return (
    <article
      ref={cardRef}
      className="group relative rounded-2xl border border-warm/90 dark:border-[#39414c] overflow-hidden bg-paper dark:bg-[#171c23] transition-all duration-500 hover:border-accent/45 dark:hover:border-accent/60 hover:shadow-[0_20px_40px_-26px_rgba(0,0,0,0.46)]"
    >
      <div className="grid md:grid-cols-[1.03fr_0.97fr] min-h-auto md:min-h-[228px]">
        <div className="p-3 sm:p-4 md:p-4 lg:p-5 bg-paper/92 dark:bg-[#171c23]/92 flex flex-col">
          <p className="font-body text-[10px] text-muted dark:text-[#aeb4bc] tracking-[0.16em] uppercase mb-1.5 sm:mb-2">{cardNo}</p>
          <p className="font-body text-xs sm:text-[13px] text-muted dark:text-[#b8bdc5] mb-2">
            {project.category} / {project.year}
          </p>

          <h3 className="font-display font-extrabold text-lg sm:text-xl lg:text-2xl leading-[1.05] tracking-tight text-ink dark:text-[#f3efe8] mb-3">
            {project.title}
          </h3>

          <p
            className="font-body text-[12px] leading-[1.55] text-ink/66 dark:text-[#d4d9df]/82 mb-4"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.description}
          </p>

          <div className="flex items-center gap-2 flex-wrap mt-auto">
            {project.github && (
              <a href={project.github}
                target="_blank" rel="noopener noreferrer"
                className="font-body text-[9px] px-2.5 py-1.5 rounded-full border border-warm dark:border-[#3c4450] text-ink/70 dark:text-[#d1d6dd] hover:text-accent hover:border-accent/40 transition-colors duration-200">
                GitHub
              </a>
            )}
            {project.live && (
              <a href={project.live}
                target="_blank" rel="noopener noreferrer"
                className="font-body text-[9px] px-2.5 py-1.5 rounded-full border border-warm dark:border-[#3c4450] text-ink/70 dark:text-[#d1d6dd] hover:text-accent hover:border-accent/40 transition-colors duration-200">
                Live Demo
              </a>
            )}
            {project.colab && (
              <a href={project.colab}
                target="_blank" rel="noopener noreferrer"
                className="font-body text-[9px] px-2.5 py-1.5 rounded-full border border-warm dark:border-[#3c4450] text-ink/70 dark:text-[#d1d6dd] hover:text-accent hover:border-accent/40 transition-colors duration-200">
                Colab
              </a>
            )}
        </div>
      </div>

        <div className="relative min-h-[190px] md:min-h-[228px] overflow-hidden">
          {project.image ? (
            <img
              src={getOptimizedProjectImage(project.image)}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#252a31] to-[#12161c]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/65" />
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4">
            <p className="font-body text-[9px] uppercase tracking-[0.16em] text-white/85 mb-2">Tech Used</p>
            <div className="flex flex-wrap gap-1.5">
              {visibleTech.map((tech) => (
                <span
                  key={tech}
                  className="font-body text-[9px] px-2 py-1 rounded-full text-orange-50 border border-orange-200/30 bg-black/35 backdrop-blur-[1px]"
                >
                  {tech}
                </span>
              ))}
              {extraTechCount > 0 && (
                <span className="font-body text-[9px] px-2 py-1 rounded-full text-orange-50 border border-orange-200/30 bg-black/35 backdrop-blur-[1px]">
                  +{extraTechCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const gridRef    = useRef(null);
  const [activeCategory, setActiveCategory] = useState("Gen AI (LangChain)");

  const filtered = projects.filter((p) => p.category === activeCategory);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".proj-label",
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".proj-label", start: "top 88%", once: true } }
      );
      gsap.fromTo(".proj-heading",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".proj-heading", start: "top 88%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-project-item]");
    const emptyState = gridRef.current.querySelector("[data-empty-state]");

    gsap.killTweensOf([gridRef.current, cards, emptyState]);

    gsap.fromTo(
      gridRef.current,
      { opacity: 0.6, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );

    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { y: 18, opacity: 0, scale: 0.985 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out", stagger: 0.06 }
      );
    }

    if (emptyState) {
      gsap.fromTo(
        emptyState,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" }
      );
    }
  }, [activeCategory]);

  return (
    <section ref={sectionRef} id="projects" className="w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-6 border-t border-warm dark:border-[#2e333a] bg-warm/25 dark:bg-[#12161c]">
      <div className="max-w-6xl mx-auto">

        <div className="proj-label flex items-center justify-between mb-10 sm:mb-12 lg:mb-16">
          <div className="flex items-center gap-4">
            <span className="font-body text-[10px] text-muted dark:text-[#b4b7bb] tracking-[0.2em] uppercase">03 — Projects</span>
            <span className="h-px bg-warm dark:bg-[#2e333a] w-10 sm:w-12 lg:w-16" />
          </div>
          <span className="hidden sm:block font-body text-[11px] sm:text-xs text-muted dark:text-[#b4b7bb]">{projects.length} total projects</span>
        </div>

        <div className="proj-heading mb-8 sm:mb-10 lg:mb-12">
          <h2 className="font-display font-extrabold tracking-tightest text-ink dark:text-[#f2efea] leading-[1.0]"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}>
            Things I've <span className="text-muted dark:text-accent">built.</span>
          </h2>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 lg:gap-2 mb-8 sm:mb-10 lg:mb-12">
          {PROJECT_CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`font-body text-[10px] sm:text-[11px] px-2.5 sm:px-4 py-1 sm:py-2 rounded-full border transition-all duration-250 ${
                activeCategory === cat
                  ? "bg-ink dark:bg-accent text-paper border-ink dark:border-accent"
                  : "bg-paper dark:bg-[#171c23] text-muted dark:text-[#b4b7bb] border-warm dark:border-[#39414c] hover:border-accent/40 dark:hover:border-accent/55 hover:text-accent"
              }`}>
              {cat}
              <span className={`ml-1 text-[8px] sm:text-[9px] ${activeCategory === cat ? "text-paper/60" : "text-muted/60 dark:text-[#98a0aa]"}`}>
                {projects.filter((p) => p.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* Cards */}
        {filtered.length > 0 ? (
          <div
            ref={gridRef}
            className="grid gap-3 sm:gap-4 lg:gap-5 max-w-6xl mx-auto"
          >
            {filtered.map((project, i) => (
              <div key={project.id} data-project-item>
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </div>
        ) : (
          <div ref={gridRef}>
            <div data-empty-state className="max-w-2xl mx-auto rounded-xl border border-dashed border-warm dark:border-[#39414c] bg-paper/70 dark:bg-[#171c23]/60 px-4 sm:px-6 py-8 sm:py-10 text-center">
              <p className="font-body text-sm text-muted dark:text-[#b4b7bb] tracking-[0.12em] uppercase mb-2">Projects Coming Soon</p>
              <p className="font-body text-[13px] text-ink/60 dark:text-[#d4d7db]/75">This category is ready. Add your projects and they will appear here automatically.</p>
            </div>
          </div>
        )}

        <div className="mt-10 sm:mt-12 flex justify-center">
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
            className="font-body text-sm text-muted dark:text-[#c7ccd2] border border-warm dark:border-[#39414c] px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:border-accent/40 dark:hover:border-accent/55 hover:text-accent transition-all duration-300">
            View all on GitHub ↗
          </a>
        </div>

      </div>
    </section>
  );
}