"use client";

import { useEffect, useRef } from "react";

export function HeroSculpture() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const resetPointer = () => {
      scene.style.setProperty("--pointer-shift-x", "0px");
      scene.style.setProperty("--pointer-shift-y", "0px");
      scene.style.setProperty("--pointer-rotate-x", "0deg");
      scene.style.setProperty("--pointer-rotate-y", "0deg");
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches || event.pointerType === "touch") return;

      const bounds = scene.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;

      scene.style.setProperty(
        "--pointer-shift-x",
        `${(x - 0.5) * 18}px`
      );
      scene.style.setProperty(
        "--pointer-shift-y",
        `${(y - 0.5) * 18}px`
      );
      scene.style.setProperty(
        "--pointer-rotate-x",
        `${(0.5 - y) * 8}deg`
      );
      scene.style.setProperty(
        "--pointer-rotate-y",
        `${(x - 0.5) * 10}deg`
      );
    };

    const handleScroll = () => {
      if (reducedMotion.matches) return;

      const bounds = scene.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const sceneCenter = bounds.top + bounds.height / 2;
      const shift = Math.max(
        -12,
        Math.min(12, (viewportCenter - sceneCenter) * 0.025)
      );

      scene.style.setProperty("--scroll-shift", `${shift}px`);
    };

    const handleMotionPreference = () => {
      if (reducedMotion.matches) {
        resetPointer();
        scene.style.setProperty("--scroll-shift", "0px");
      } else {
        handleScroll();
      }
    };

    scene.addEventListener("pointermove", handlePointerMove);
    scene.addEventListener("pointerleave", resetPointer);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    reducedMotion.addEventListener("change", handleMotionPreference);

    handleScroll();

    return () => {
      scene.removeEventListener("pointermove", handlePointerMove);
      scene.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      reducedMotion.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className="hero-sculpture-scene"
      role="img"
      aria-label="An abstract orange 3D sculpture representing connected technology"
    >
      <div className="hero-sculpture-glow" />

      <div className="hero-sculpture-orbit hero-sculpture-orbit-one" />
      <div className="hero-sculpture-orbit hero-sculpture-orbit-two" />

      <div className="hero-sculpture-shadow" />

      <div className="hero-sculpture-interactive">
        <div className="hero-sculpture-object">
          <div className="hero-sculpture-loop">
            <div className="hero-sculpture-loop-inner" />
          </div>

          <div className="hero-sculpture-core" />
          <div className="hero-sculpture-highlight" />
        </div>
      </div>

      <div className="hero-sculpture-caption">
       
      </div>
    </div>
  );
}
