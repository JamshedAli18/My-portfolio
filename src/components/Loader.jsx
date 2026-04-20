import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(loaderRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.15, ease: "power2.out" }
      )

      // dots appear staggered
      .fromTo(".loader-dot",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.2, ease: "back.out(2)", stagger: 0.08 }
      )

      // dots bounce once
      .to(".loader-dot",
        { y: -7, duration: 0.18, ease: "power2.out", stagger: 0.07, yoyo: true, repeat: 1 }
      )

      // slide up exit
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 0.55,
        ease: "power4.inOut",
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-paper"
      style={{ opacity: 0 }}
    >
      <div className="flex items-center gap-2.5">
        <span className="loader-dot w-2 h-2 rounded-full bg-ink/25 block" />
        <span className="loader-dot w-2 h-2 rounded-full bg-accent block" />
        <span className="loader-dot w-2 h-2 rounded-full bg-ink/25 block" />
      </div>
    </div>
  );
}