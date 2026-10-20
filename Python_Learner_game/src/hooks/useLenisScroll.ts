import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface UseLenisOptions {
  enabled?: boolean;
  reducedMotion?: boolean;
}

export function useLenisScroll(options: UseLenisOptions = {}) {
  const { enabled = true, reducedMotion = false } = options;
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Skip if disabled or user prefers reduced motion
    if (!enabled || reducedMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    try {
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;

      let rafId: number;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
        lenisRef.current = null;
      };
    } catch (e) {
      console.warn('Lenis smooth scrolling not supported in this environment:', e);
    }
  }, [enabled, reducedMotion]);

  return lenisRef;
}
