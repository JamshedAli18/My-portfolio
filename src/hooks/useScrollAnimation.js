import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const { y = 40, opacity = 0, duration = 0.8, ease = "power3.out",
    delay = 0, stagger = 0, selector = null, start = "top 85%" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = selector ? el.querySelectorAll(selector) : el;
    const ctx = gsap.context(() => {
      gsap.fromTo(targets, { y, opacity }, {
        y: 0, opacity: 1, duration, ease, delay, stagger,
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [delay, duration, ease, opacity, selector, stagger, start, y]);

  return ref;
};