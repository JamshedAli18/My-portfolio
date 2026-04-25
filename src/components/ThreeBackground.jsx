import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../context/useTheme";

const LIGHT_PALETTE = {
  particles: "#6d7f96",
  lines: "#7f91a8",
};

const DARK_PALETTE = {
  particles: "#9bb8d6",
  lines: "#7d9fbe",
};

export default function ThreeBackground() {
  const mountRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const palette = isDark ? DARK_PALETTE : LIGHT_PALETTE;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 28 : 56;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 22;
      positions[i3 + 1] = (Math.random() - 0.5) * 14;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(palette.particles),
      transparent: true,
      opacity: isDark ? 0.2 : 0.14,
      size: 0.05,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const points = new THREE.Points(particlesGeometry, particlesMaterial);
    group.add(points);

    const connectionPairs = [];
    const maxDistance = 4.6;

    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;
      let linked = 0;

      for (let j = i + 1; j < particleCount && linked < 2; j += 1) {
        const j3 = j * 3;
        const dx = positions[i3] - positions[j3];
        const dy = positions[i3 + 1] - positions[j3 + 1];
        const dz = positions[i3 + 2] - positions[j3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance && Math.random() > 0.35) {
          connectionPairs.push(i, j);
          linked += 1;
        }
      }
    }

    let lineGeometry = null;
    let lineMaterial = null;
    let lines = null;

    if (!isMobile) {
      const linePositions = new Float32Array(connectionPairs.length * 3);
      let lp = 0;

      for (let c = 0; c < connectionPairs.length; c += 2) {
        const a = connectionPairs[c] * 3;
        const b = connectionPairs[c + 1] * 3;

        linePositions[lp] = positions[a];
        linePositions[lp + 1] = positions[a + 1];
        linePositions[lp + 2] = positions[a + 2];
        linePositions[lp + 3] = positions[b];
        linePositions[lp + 4] = positions[b + 1];
        linePositions[lp + 5] = positions[b + 2];
        lp += 6;
      }

      lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

      lineMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(palette.lines),
        transparent: true,
        opacity: isDark ? 0.08 : 0.06,
        depthWrite: false,
      });

      lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      group.add(lines);
    }

    const resize = () => {
      const width = mount.clientWidth || window.innerWidth;
      const height = mount.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    resize();
    window.addEventListener("resize", resize);

    const clock = new THREE.Clock();
    let frameId = 0;
    let lastTick = 0;
    let isVisible = document.visibilityState === "visible";
    let isScrolling = false;
    let scrollIdleTimer = 0;

    const onVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
    };

    const onScroll = () => {
      isScrolling = true;
      if (scrollIdleTimer) {
        window.clearTimeout(scrollIdleTimer);
      }
      scrollIdleTimer = window.setTimeout(() => {
        isScrolling = false;
      }, 120);
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("scroll", onScroll, { passive: true });

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      if (!isVisible) return;
      if (isScrolling) return;

      const elapsed = clock.getElapsedTime();
      const targetStep = prefersReducedMotion ? 1 / 8 : 1 / 20;
      if (elapsed - lastTick < targetStep) return;
      lastTick = elapsed;

      const motionScale = prefersReducedMotion ? 0.4 : 1;
      group.rotation.y = Math.sin(elapsed * 0.04) * 0.03 * motionScale;
      group.rotation.x = Math.cos(elapsed * 0.03) * 0.015 * motionScale;
      group.position.y = Math.sin(elapsed * 0.14) * 0.1 * motionScale;
      particlesMaterial.opacity = (isDark ? 0.2 : 0.14) + Math.sin(elapsed * 0.32) * 0.01 * motionScale;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (scrollIdleTimer) {
        window.clearTimeout(scrollIdleTimer);
      }

      group.clear();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      if (lineGeometry) lineGeometry.dispose();
      if (lineMaterial) lineMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [isDark]);

  return (
    <div className="ai-bg" aria-hidden="true">
      <div className="ai-bg__gradient" />
      <div className="ai-bg__mesh" />
      <div className="ai-bg__wave ai-bg__wave--one" />
      <div className="ai-bg__wave ai-bg__wave--two" />
      <div className="ai-bg__wave ai-bg__wave--three" />
      <div ref={mountRef} className="ai-bg__canvas" />
    </div>
  );
}
