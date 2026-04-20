export function scrollToTarget(target, options = {}) {
  const lenis = window.__lenis;

  let resolvedTarget = target;

  if (typeof target === "string") {
    const id = target.startsWith("#") ? target.slice(1) : target;
    resolvedTarget = document.getElementById(id) ?? target;
  }

  if (lenis) {
    lenis.scrollTo(resolvedTarget, {
      duration: options.duration ?? 1,
      offset: options.offset ?? 0,
      easing: options.easing,
    });
    return;
  }

  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
    return;
  }

  if (typeof target === "string") {
    if (resolvedTarget instanceof Element) {
      resolvedTarget.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (target.startsWith("#")) {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    return;
  }

  target?.scrollIntoView({ behavior: "smooth" });
}
