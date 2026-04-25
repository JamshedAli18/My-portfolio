import { personalInfo } from "../data/portfolioData";
import { useTheme } from "../context/useTheme";
import LogoMark from "./LogoMark";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

export default function Footer() {
  const { isDark } = useTheme();
  const socialLinks = [
    {
      label: "GitHub",
      href: personalInfo.github,
      icon: FaGithub,
      external: true,
    },
    {
      label: "LinkedIn",
      href: personalInfo.linkedin,
      icon: FaLinkedinIn,
      external: true,
    },
    {
      label: "Email",
      href: `mailto:${personalInfo.email}`,
      icon: FiMail,
      external: false,
    },
  ];

  return (
    <footer className="relative w-full border-t border-warm/80 dark:border-[#2e333a] px-4 sm:px-6 py-7 sm:py-9 lg:py-11 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#ebe7df]/80 to-transparent dark:from-[#10141b]/70" />

      <div className="relative max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Go to top"
          className="inline-flex items-center justify-center rounded-full p-1 transition-transform duration-300 hover:-translate-y-0.5"
        >
          <LogoMark className="h-8 w-8" isDark={isDark} />
        </button>

        <p className="font-body text-[11px] sm:text-xs text-muted dark:text-[#b4b7bb] text-center order-3 sm:order-2 w-full sm:w-auto tracking-[0.08em] uppercase">
          © {new Date().getFullYear()} {personalInfo.name}
        </p>

        <div className="flex items-center gap-2 sm:gap-3 order-2 sm:order-3">
          {socialLinks.map(({ label, href, icon, external }) => {
            const SocialIcon = icon;

            return (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group relative h-10 w-10 sm:h-11 sm:w-11 inline-flex items-center justify-center rounded-2xl border border-[#d9d4ca] dark:border-[#2f3743] bg-[#f7f3ec]/85 dark:bg-[#171d27]/75 text-[#5e5a54] dark:text-[#aeb4bd] shadow-[0_12px_26px_rgba(20,20,16,0.08)] dark:shadow-[0_14px_32px_rgba(0,0,0,0.38)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:text-ink dark:hover:text-[#f5f2ec] hover:border-accent/45 dark:hover:border-[#5a88b1]"
              >
                <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent/10 via-transparent to-[#4e8dbf]/15 dark:from-[#e07938]/15 dark:to-[#6f9fc8]/20" />
                <SocialIcon className="relative text-base sm:text-[18px] transition-transform duration-300 group-hover:scale-110" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}