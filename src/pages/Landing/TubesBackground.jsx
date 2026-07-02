import { useEffect, useRef } from 'react';

/**
 * Interactive tube-cursor background (Kevin Levron's threejs-components
 * "tubes1" cursor, loaded straight from the CDN as an ES module — same
 * snippet the user already had working, just wired into React).
 * If the CDN is unreachable the hero still looks complete thanks to the
 * CSS blob layer underneath, so this fails silently.
 */
export function TubesBackground() {
  const canvasRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    import(
      /* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js'
    )
      .then((mod) => {
        if (cancelled || !canvasRef.current) return;
        const TubesCursor = mod.default;
        appRef.current = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ['#f967fb', '#7c5cff', '#33dba0'],
            lights: {
              intensity: 200,
              colors: ['#83f36e', '#fe8a2e', '#ff008a', '#60aed5']
            }
          }
        });
      })
      .catch(() => {
        /* offline — the static gradient blobs carry the scene on their own */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <canvas ref={canvasRef} className="landing__tubes-canvas" aria-hidden="true" />;
}
