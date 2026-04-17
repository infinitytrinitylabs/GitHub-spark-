import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * SmoothScroll wires up Lenis for buttery scroll and exposes the scroll
 * progress (0..1) via the provided ref so 3D scenes can react to it.
 */
export function SmoothScroll({
  scrollRef,
  children,
}: {
  scrollRef: React.MutableRefObject<number>;
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let raf = 0;
    const frame = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onScroll = ({ progress }: { progress: number }) => {
      scrollRef.current = progress;
    };
    lenis.on('scroll', onScroll);

    // IntersectionObserver for reveal animations
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in');
        });
      },
      { threshold: 0.15 },
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      io.disconnect();
    };
  }, [scrollRef]);

  return <div ref={wrapperRef}>{children}</div>;
}
