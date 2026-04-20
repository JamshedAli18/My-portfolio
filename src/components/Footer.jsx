import { personalInfo } from "../data/portfolioData";
import LogoMark from "./LogoMark";
import { scrollToTarget } from "../utils/scrollToTarget";

export default function Footer() {
  return (
    <footer className="w-full border-t border-warm dark:border-[#2e333a] px-4 sm:px-6 py-6 sm:py-8 lg:py-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <button
          onClick={() => scrollToTarget(0, { duration: 1.1 })}
          aria-label="Go to top"
          className="group inline-flex items-center justify-center rounded-full p-0.5 text-ink dark:text-[#f2efea] transition-transform duration-300 hover:-translate-y-0.5"
        >
          <LogoMark className="h-10 sm:h-12 w-10 sm:w-12 drop-shadow-[0_10px_24px_rgba(15,15,13,0.08)] transition-transform duration-300 group-hover:scale-[1.02] dark:drop-shadow-[0_10px_24px_rgba(0,0,0,0.28)]" />
        </button>
        <p className="font-body text-[11px] sm:text-xs text-muted dark:text-[#b4b7bb] text-center order-3 sm:order-2 w-full sm:w-auto">
          © {new Date().getFullYear()} {personalInfo.name} · Built with React, Tailwind & GSAP
        </p>
        <div className="flex items-center gap-4 sm:gap-5 lg:gap-6 order-2 sm:order-3">
          {[
            { label: "GitHub",   href: personalInfo.github   },
            { label: "LinkedIn", href: personalInfo.linkedin },
            { label: "Email",    href: `mailto:${personalInfo.email}` },
          ].map(({ label, href }) => (
            <a key={label} href={href}
              target={label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="font-body text-[11px] sm:text-xs text-muted dark:text-[#b4b7bb] hover:text-ink dark:hover:text-[#f2efea] transition-colors duration-200">
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}