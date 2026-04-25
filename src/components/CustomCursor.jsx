import { useEffect, useRef, useState } from "react";

const CLICKABLE_SELECTOR = [
  "a",
  "button",
  "[role='button']",
  "input[type='button']",
  "input[type='submit']",
  "label[for]",
  "summary",
  "[data-clickable='true']",
  ".clickable",
].join(",");

export default function CustomCursor({ enabled = true }) {
  const cursorRef = useRef(null);
  const visibleRef = useRef(false);
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    if (!enabled) {
      visibleRef.current = false;
      setVisible(false);
      return;
    }

    const updateInteractiveFromTarget = (target) => {
      if (!(target instanceof Element)) {
        setInteractive(false);
        return;
      }

      setInteractive(Boolean(target.closest(CLICKABLE_SELECTOR)));
    };

    const updateCursorPosition = (x, y) => {
      if (!cursorRef.current) {
        return;
      }

      cursorRef.current.style.transform = `translate3d(${x + 14}px, ${y + 16}px, 0)`;
    };

    const onMouseMove = (event) => {
      updateCursorPosition(event.clientX, event.clientY);
      updateInteractiveFromTarget(event.target);

      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const onMouseLeaveWindow = () => {
      visibleRef.current = false;
      setVisible(false);
    };

    const onMouseEnterWindow = () => {
      visibleRef.current = true;
      setVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeaveWindow);
    window.addEventListener("mouseenter", onMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeaveWindow);
      window.removeEventListener("mouseenter", onMouseEnterWindow);
    };
  }, [enabled]);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`custom-cursor ${visible ? "is-visible" : ""} ${interactive ? "is-interactive" : ""}`}
    >
      <span className="custom-cursor__dot" />
    </div>
  );
}
