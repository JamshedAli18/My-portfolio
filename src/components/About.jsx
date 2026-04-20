import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "1.5+", label: "Years in ML / AI" },
  { value: "10+", label: "Certifications" },
];

const CORE_STACK = [
  {
    name: "PyTorch",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
    fallback: "PT",
  },
  {
    name: "TensorFlow",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    fallback: "TF",
  },
  {
    name: "LangChain",
    icon: "/logos/langchain.png",
    fallback: "LC",
    fit: "cover",
  },
  {
    name: "LangGraph",
    icon: "/logos/langgraph.png",
    fallback: "LG",
    fit: "contain",
    iconClass: "translate-y-[0.5px] scale-95",
    labelClass: "translate-y-[0.5px]",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    fallback: "DK",
  },
  {
    name: "FastAPI",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    fallback: "FA",
  },
  {
    name: "OpenAI",
    icon: "/logos/openai.png",
    fallback: "OA",
    blend: "multiply",
  },
  {
    name: "Hugging Face",
    icon: "https://cdn.simpleicons.org/huggingface",
    fallback: "HF",
  },
  {
    name: "Claude",
    icon: "https://cdn.simpleicons.org/anthropic",
    fallback: "CL",
  },
  {
    name: "Meta",
    icon: "https://cdn.simpleicons.org/meta",
    fallback: "MT",
  },
  {
    name: "Grok (xAI)",
    icon: "/logos/grok.png",
    fallback: "GX",
    fit: "cover",
  },
  {
    name: "Weights & Biases",
    icon: "https://cdn.simpleicons.org/weightsandbiases",
    fallback: "WB",
  },
  {
    name: "MLflow",
    icon: "https://cdn.simpleicons.org/mlflow",
    fallback: "MF",
  },
  {
    name: "n8n",
    icon: "https://cdn.simpleicons.org/n8n",
    fallback: "N8",
  },
];

const BIO_1 = "AI Engineer with hands-on experience building LLM applications, RAG pipelines, and agentic AI systems using LangChain, LangGraph, and OpenAI APIs.";
const BIO_2 = "I build end-to-end ML solutions with Python and FastAPI, with work spanning computer vision, NLP, and scalable intelligent systems for real-world problems.";

/* split sentence into words wrapped in spans */
function SplitText({ text, className }) {
  const words = text.split(" ");
  return (
    <p className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="bio-word inline-block"
          style={{ overflow: "hidden", marginRight: "0.28em" }}
        >
          <span className="bio-word-inner inline-block">
            {word}
          </span>
        </span>
      ))}
    </p>
  );
}

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(".ab-label",
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".ab-label", start: "top 88%", once: true } }
      );

      gsap.fromTo(".ab-heading-word",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: ".ab-heading", start: "top 85%", once: true } }
      );

      /* word by word reveal — each word slides up from hidden */
      gsap.fromTo(".bio-word-inner",
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.018,
          scrollTrigger: {
            trigger: ".ab-bio",
            start: "top 82%",
            once: true,
          },
        }
      );

      gsap.fromTo(".ab-tags",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out",
          scrollTrigger: { trigger: ".ab-tags", start: "top 88%", once: true } }
      );

      gsap.fromTo(".ab-stat",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: ".ab-stats", start: "top 85%", once: true } }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-6 border-t border-warm dark:border-[#2e333a]">
      <div className="max-w-6xl mx-auto">

        <div className="ab-label flex items-center gap-4 mb-10 sm:mb-14 lg:mb-20">
          <span className="font-body text-[10px] text-muted dark:text-[#b4b7bb] tracking-[0.2em] uppercase">01 — About</span>
          <span className="h-px bg-warm dark:bg-[#2e333a] w-12 sm:w-16 lg:w-20" />
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8 sm:gap-12 xl:gap-24 items-start">

          {/* LEFT */}
          <div className="min-w-0">
            <div className="ab-heading mb-6 sm:mb-8 lg:mb-10">
              <h2
                className="font-display font-extrabold leading-[1.15] tracking-tightest"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}
              >
                {["Researcher", "turned", "engineer."].map((word, i) => (
                  <span
                    key={i}
                    className={`ab-heading-word inline-block mr-3 ${i === 2 ? "text-muted dark:text-accent" : "text-ink dark:text-[#f2efea]"}`}
                  >
                    {word}
                  </span>
                ))}
              </h2>
            </div>

            {/* Bio — word by word animation */}
            <div className="ab-bio flex flex-col gap-3 sm:gap-5 mb-4 sm:mb-6 lg:mb-8">
              <SplitText
                text={BIO_1}
                className="font-body text-xs sm:text-sm lg:text-base text-ink/65 dark:text-[#d4d7db]/80 leading-[1.7] sm:leading-[1.8]"
              />
              <SplitText
                text={BIO_2}
                className="font-body text-xs sm:text-sm lg:text-base text-ink/65 dark:text-[#b9bec4]/80 leading-[1.7] sm:leading-[1.8]"
              />
            </div>

            <div className="ab-tags w-full max-w-full overflow-hidden pr-1 lg:pr-4">
              <div className="ab-tags-track flex w-max max-w-none items-center gap-2">
                {[...CORE_STACK, ...CORE_STACK].map((tech, index) => (
                  <span
                    key={`${tech.name}-${index}`}
                    title={tech.name}
                    aria-label={tech.name}
                    className="ab-tag inline-flex flex-shrink-0 items-center gap-1.5 h-9 pl-2 pr-3 border border-warm dark:border-[#39414c] rounded-full bg-paper dark:bg-[#171c23] hover:border-ink/40 dark:hover:border-accent/55 cursor-default transition-all duration-200"
                  >
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full overflow-hidden">
                      {tech.icon ? (
                        <>
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            className={`w-4 h-4 ${tech.iconClass || ""}`}
                            loading="lazy"
                            style={{
                              objectFit: tech.fit || "contain",
                              ...(tech.blend ? { mixBlendMode: tech.blend } : {}),
                            }}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              const fallbackEl = e.currentTarget.nextElementSibling;
                              if (fallbackEl) fallbackEl.classList.remove("hidden");
                            }}
                          />
                          <span className="hidden font-body text-[7px] font-semibold tracking-[0.06em] text-ink/75 dark:text-[#d4d7db]">
                            {tech.fallback}
                          </span>
                        </>
                      ) : (
                        <span className="font-body text-[7px] font-semibold tracking-[0.06em] text-ink/75 dark:text-[#d4d7db]">
                          {tech.fallback}
                        </span>
                      )}
                    </span>
                    <span className={`font-body text-[11px] sm:text-xs text-ink/75 dark:text-[#d4d7db] leading-none whitespace-nowrap ${tech.labelClass || ""}`}>
                      {tech.name}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="min-w-0 flex flex-col gap-3 sm:gap-4">
            <div className="ab-stats grid grid-cols-1 min-[420px]:grid-cols-2 gap-2.5 sm:gap-3">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="ab-stat border border-warm dark:border-[#39414c] rounded-2xl p-3 sm:p-4.5 bg-paper dark:bg-[#171c23] hover:border-ink/25 dark:hover:border-accent/55 transition-all duration-300"
                >
                  <p
                    className="font-body font-extrabold tracking-tightest text-ink dark:text-[#f2efea] leading-none mb-1.5"
                    style={{ fontSize: "clamp(1.45rem, 3.2vw, 2.2rem)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="font-body text-xs text-muted dark:text-[#b4b7bb] leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-ink dark:bg-accent text-paper p-5 sm:p-7">
              <p className="font-body text-[10px] text-paper/40 tracking-[0.18em] uppercase mb-2 sm:mb-3">
                Currently
              </p>
              <p className="font-display font-bold text-lg sm:text-xl tracking-tight leading-snug mb-1">
                AI Engineer
              </p>
              <p className="font-body text-sm text-paper/55 mb-4 sm:mb-5">
                {personalInfo.location}
              </p>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="font-body text-xs text-paper/50">Open to new opportunities</span>
              </div>
            </div>

            <a
              href="https://drive.google.com/file/d/1IVsBuqwzJJwX9zugoCVTA2mZBkIt98oI/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full rounded-2xl border border-warm dark:border-[#39414c] bg-paper dark:bg-[#171c23] px-5 sm:px-6 py-4 sm:py-4.5 hover:border-accent/55 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-[10px] tracking-[0.18em] uppercase text-muted dark:text-[#b4b7bb] mb-1.5">
                    Resume
                  </p>
                  <p className="font-display font-bold text-base sm:text-lg tracking-tight text-ink dark:text-[#f2efea] leading-none">
                    Download CV
                  </p>
                </div>
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-accent text-paper transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↘
                </span>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}