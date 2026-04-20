import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const CARD_COLORS = [
	{ light: "bg-[#f0e6db]", dark: "dark:bg-[#1e1a15]" },
	{ light: "bg-[#e8f0f5]", dark: "dark:bg-[#1d1f28]" },
	{ light: "bg-[#ebe4f0]", dark: "dark:bg-[#1a1f26]" },
	{ light: "bg-[#f0eee5]", dark: "dark:bg-[#211f1b]" },
	{ light: "bg-[#e8f2ed]", dark: "dark:bg-[#1e1a14]" },
	{ light: "bg-[#f5e8e4]", dark: "dark:bg-[#1b1d23]" },
];

const SERVICE_META = [
	{ chip: "Workflow", footer: "Automation systems" },
	{ chip: "Integration", footer: "LLM-powered features" },
	{ chip: "Knowledge", footer: "Context-aware retrieval" },
	{ chip: "Conversation", footer: "Personalized interactions" },
	{ chip: "Infrastructure", footer: "Scalable API backbone" },
	{ chip: "Interface", footer: "Responsive frontend delivery" },
];

function ServiceCard({ service, index }) {
	const meta = SERVICE_META[index] || {
		chip: "AI Service",
		footer: "Production ready",
	};
	const description = service.description || "Description coming soon.";
	const cardColor = CARD_COLORS[index % CARD_COLORS.length];

	return (
		<article
			className={`sv-card group relative isolate w-full overflow-hidden border border-ink/10 dark:border-[#3a4248] ${cardColor.light} ${cardColor.dark} min-h-[132px] sm:min-h-[150px] lg:min-h-[170px] transition-all duration-400 hover:border-accent/50 hover:-translate-y-0.5`}
			style={{ transitionDelay: `${Math.min(index, 5) * 40}ms` }}
		>
			<div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/[0.01] dark:to-white/[0.02] pointer-events-none" />
			<div className="absolute inset-y-0 right-0 w-[38px] sm:w-[44px] bg-ink dark:bg-[#0a0d0f] text-paper dark:text-paper flex flex-col items-center justify-center py-2 sm:py-2.5 z-20">
				<span className="font-body text-[9px] sm:text-[10px] tracking-[0.02em] opacity-70 text-center [writing-mode:vertical-rl] rotate-180">
					{meta.footer}
				</span>
			</div>

			<span className="absolute right-[48px] sm:right-[58px] bottom-[-10px] sm:bottom-[-14px] z-10 font-display font-black text-[46px] sm:text-[64px] lg:text-[78px] leading-none text-black/6 dark:text-black/10 select-none pointer-events-none">
				{String(index + 1).padStart(2, "0")}
			</span>

			<div className="relative z-10 h-full flex flex-col px-3.5 sm:px-5 lg:px-6 py-2.5 sm:py-3 pr-[46px] sm:pr-[56px]">
				<h3 className="font-display font-extrabold uppercase tracking-[-0.02em] text-ink dark:text-paper text-[1.1rem] sm:text-[1.35rem] lg:text-[1.6rem] leading-[0.95] max-w-[88%]">
					{service.title}
				</h3>

				<p
					className="mx-auto mt-2.5 sm:mt-3 max-w-[400px] text-center font-body text-[12px] sm:text-[13px] leading-[1.4] text-ink/80 dark:text-paper/90"
					style={{
						display: "-webkit-box",
						WebkitLineClamp: 2,
						WebkitBoxOrient: "vertical",
						overflow: "hidden",
					}}
				>
					{description}
				</p>
			</div>
		</article>
	);
}

export default function Services() {
	const sectionRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				".sv-label",
				{ x: -20, opacity: 0 },
				{
					x: 0,
					opacity: 1,
					duration: 0.6,
					ease: "power3.out",
					scrollTrigger: { trigger: ".sv-label", start: "top 88%", once: true },
				}
			);

			gsap.fromTo(
				".sv-heading-line",
				{ y: 36, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.7,
					ease: "power3.out",
					stagger: 0.08,
					scrollTrigger: { trigger: ".sv-heading", start: "top 86%", once: true },
				}
			);

			gsap.fromTo(
				".sv-card",
				{ y: 26, opacity: 0, scale: 0.985 },
				{
					y: 0,
					opacity: 1,
					scale: 1,
					duration: 0.6,
					ease: "power3.out",
					stagger: 0.08,
					scrollTrigger: { trigger: ".sv-grid", start: "top 88%", once: true },
				}
			);
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			id="services"
			className="w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-6 border-t border-warm dark:border-[#2e333a] bg-warm/25 dark:bg-[#12161c]"
		>
			<div className="max-w-6xl mx-auto">
				<div className="sv-label flex items-center gap-4 mb-12 sm:mb-16">
					<span className="font-body text-[10px] text-muted dark:text-[#b4b7bb] tracking-[0.2em] uppercase">
						02 - Services
					</span>
					<span className="h-px bg-warm dark:bg-[#2e333a] w-16 sm:w-20" />
				</div>

				<div className="sv-heading mb-10 sm:mb-12">
					<h2
						className="font-display font-extrabold tracking-tightest text-ink dark:text-[#f2efea] leading-[1.05]"
						style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}
					>
						<span className="sv-heading-line block">Intelligent AI Solutions</span>
						<span className="sv-heading-line block text-muted dark:text-accent">End-to-End</span>
					</h2>
					<p className="sv-heading-line mt-4 max-w-2xl font-body text-sm sm:text-[15px] leading-[1.75] text-ink/60 dark:text-[#c9ced5]/80">
						From automation to production delivery, each service is designed to create measurable impact.
					</p>
				</div>

			<div className="sv-grid w-full grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6">
				{services.map((service, index) => (
					<div key={service.id}>
						<ServiceCard service={service} index={index} />
					</div>
				))}
			</div>
			</div>
		</section>
	);
}
