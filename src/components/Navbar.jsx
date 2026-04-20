import { useEffect, useRef, useState } from "react";
import LogoMark from "./LogoMark";
import { useTheme } from "../context/useTheme";
import { scrollToTarget } from "../utils/scrollToTarget";

const NAV_LINKS = [
  { label: "About",      id: "about"      },
  { label: "Services",   id: "services"   },
  { label: "Projects",   id: "projects"   },
  { label: "Skills",     id: "skills"     },
  { label: "Certifications", id: "certifications" },
  { label: "Contact",    id: "contact"    },
];

export default function Navbar() {
  const navRef    = useRef(null);
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeId, setActiveId]     = useState("");
  const { isDark, toggle } = useTheme();

  /* ---------- scroll: bg + active section ---------- */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      let current = "";
      NAV_LINKS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) current = id;
      });
      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    scrollToTarget(id, { offset: -70, duration: 1.05 });
  };

  /* ---------- lock body scroll when drawer open ---------- */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ───── NAVBAR BAR ───── */}
      <nav
        ref={navRef}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          scrolled ? "top-0 bg-transparent md:flex md:justify-center md:px-3" : "top-0 bg-transparent"
        }`}
      >
        <div className={`mx-auto flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "h-16 w-full border-b border-warm bg-paper/95 px-4 sm:px-6 backdrop-blur-md dark:bg-[#101419]/95 dark:border-[#2a2f36] md:h-14 md:max-w-5xl md:rounded-full md:border md:bg-paper/90 md:shadow-[0_12px_35px_rgba(15,15,13,0.08)] md:dark:bg-[#111418]/90 md:dark:shadow-[0_12px_35px_rgba(0,0,0,0.28)]"
            : "h-16 max-w-6xl px-4 sm:px-6"
        }`}>
          <button
            onClick={() => scrollToTarget(0, { duration: 1.1 })}
            aria-label="Go to top"
            className="group inline-flex items-center justify-center rounded-full p-0.5 text-ink dark:text-[#f2efea] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <LogoMark
              isDark={isDark}
              className="h-10 w-10 drop-shadow-[0_8px_20px_rgba(15,15,13,0.08)] transition-transform duration-300 group-hover:scale-[1.02] dark:drop-shadow-[0_8px_20px_rgba(0,0,0,0.28)]"
            />
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, id }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`relative font-body text-sm tracking-wide transition-colors duration-200 group pb-0.5 ${
                    activeId === id
                      ? "text-ink dark:text-[#f2efea]"
                      : "text-muted dark:text-[#b4b7bb] hover:text-ink dark:hover:text-[#f2efea]"
                  }`}
                >
                  {label}
                  {/* underline indicator */}
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-accent transition-all duration-300 ${
                      activeId === id ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggle}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="relative h-10 w-10 rounded-full border border-warm dark:border-[#3a424d] bg-paper dark:bg-[#1b2129] text-ink dark:text-[#f2efea] flex items-center justify-center transition-all duration-300 hover:border-accent hover:text-accent"
            >
              <span
                className={`absolute transition-all duration-400 ${
                  isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2.5v2.5" />
                  <path d="M12 19v2.5" />
                  <path d="M2.5 12H5" />
                  <path d="M19 12h2.5" />
                  <path d="m5.8 5.8 1.8 1.8" />
                  <path d="m16.4 16.4 1.8 1.8" />
                  <path d="m18.2 5.8-1.8 1.8" />
                  <path d="m7.6 16.4-1.8 1.8" />
                </svg>
              </span>
              <span
                className={`absolute transition-all duration-400 ${
                  isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M21.25 13.02A9.25 9.25 0 1 1 10.98 2.75a.9.9 0 0 1 .96 1.19 7.68 7.68 0 0 0 9.37 9.37.9.9 0 0 1 1.19.96Z" />
                </svg>
              </span>
            </button>

            <button
              onClick={() => scrollTo("contact")}
              className="items-center gap-1.5 font-body text-sm font-medium bg-ink text-paper dark:bg-[#f2efea] dark:text-[#0f1115] px-5 py-2.5 rounded-full hover:bg-accent hover:text-[#fff5ef] transition-all duration-300 flex"
            >
              Hire Me <span className="opacity-60 text-xs">↗</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            <span
              className={`block h-px bg-ink dark:bg-[#f2efea] origin-center transition-all duration-300 ${
                menuOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6"
              }`}
            />
            <span
              className={`block h-px bg-ink dark:bg-[#f2efea] transition-all duration-300 ${
                menuOpen ? "w-0 opacity-0" : "w-4"
              }`}
            />
            <span
              className={`block h-px bg-ink dark:bg-[#f2efea] origin-center transition-all duration-300 ${
                menuOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-6"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* ───── MOBILE DRAWER ───── */}
      <div className={`fixed inset-0 z-40 md:hidden overflow-hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        {/* backdrop */}
        <div
          className={`absolute inset-0 bg-ink/25 dark:bg-black/45 backdrop-blur-sm transition-opacity duration-400 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[90vw] sm:w-72 max-w-xs bg-paper dark:bg-[#12171d] flex flex-col pt-20 px-5 sm:px-8 shadow-xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-col gap-5 sm:gap-7 mt-4">
            {NAV_LINKS.map(({ label, id }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`font-display font-bold text-xl sm:text-3xl tracking-tightest text-left w-full transition-colors duration-200 ${
                    activeId === id ? "text-accent" : "text-ink dark:text-[#f2efea] hover:text-accent"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-auto mb-10 pt-6 border-t border-warm dark:border-[#2b313a]">
            <button
              onClick={toggle}
              className="w-full mb-3 font-body text-sm font-medium border border-warm dark:border-[#3a424d] text-ink dark:text-[#f2efea] py-3 rounded-full hover:border-accent transition-colors duration-300"
            >
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="w-full font-body text-sm font-medium bg-ink text-paper dark:bg-[#f2efea] dark:text-[#0f1115] py-3.5 rounded-full hover:bg-accent hover:text-[#fff5ef] transition-all duration-300"
            >
              Hire Me ↗
            </button>
            <p className="font-body text-xs text-muted dark:text-[#b4b7bb] text-center mt-4">
              Open to new opportunities
            </p>
          </div>
        </div>
      </div>
    </>
  );
}