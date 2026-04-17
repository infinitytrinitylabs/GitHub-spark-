import { useEffect, useState } from 'react';

/**
 * A cinematic opening splash — "dephodile.co" materialises while the
 * first 3D frame is compiled. Auto-dismisses on first paint + timeout.
 */
export function LoadingScreen() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1800);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-ink text-bone flex items-end justify-between p-8 md:p-12 pointer-events-none">
      <div className="flex items-end gap-4">
        <span className="h-3 w-3 rounded-full bg-daffodil animate-pulse" />
        <span className="font-display text-5xl md:text-7xl lowercase leading-none">
          dephodile
        </span>
        <span className="font-display text-2xl md:text-3xl text-daffodil lowercase leading-none">
          .co
        </span>
      </div>
      <p className="eyebrow text-bone/60">Warming up the light ·</p>
      <div className="absolute bottom-0 left-0 h-[2px] bg-daffodil w-full origin-left animate-[scaleX_1.6s_ease-out_forwards]" />
      <style>{`@keyframes scaleX { from { transform: scaleX(0);} to { transform: scaleX(1);} }`}</style>
    </div>
  );
}
