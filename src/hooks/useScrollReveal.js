import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to the returned ref and adds an
 * `is-visible` class the first time the element crosses into the
 * viewport. Elements then animate in purely via CSS (see the
 * `[data-reveal]` rules in Landing.css) — cheap, no per-frame JS.
 */
export function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}

/**
 * Tracks page scroll progress (0–1) and toggles a `scrolled` flag once
 * the user has moved past a small threshold — used to shrink/blur the
 * nav bar and drive the scroll progress bar.
 */
export function useScrollProgress(scrolledThreshold = 24) {
  const barRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    function update() {
      ticking = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? Math.min(1, window.scrollY / max) : 0;

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${pct})`;
      }
      if (navRef.current) {
        navRef.current.classList.toggle('is-scrolled', window.scrollY > scrolledThreshold);
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [scrolledThreshold]);

  return { barRef, navRef };
}
