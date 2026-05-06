import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onUpdate: () => {
        // Update the React state to drive the number smoothly
        // tl.progress() goes from 0 to 1
        setProgress(Math.floor(tl.progress() * 100));
      },
      onComplete: () => {
        document.body.style.overflow = '';
        onComplete();
      }
    });

    // Animate progress bar width
    if (progressBarRef.current) {
      tl.to(progressBarRef.current, {
        width: '100%',
        duration: 2.5,
        ease: 'power2.inOut',
      });
    } else {
      // Fallback timeline just to take time if ref is missing
      tl.to({}, { duration: 2.5 });
    }

    // After reaching 100%, animate out
    if (containerRef.current) {
      tl.to(
        containerRef.current,
        {
          yPercent: -100,
          duration: 1,
          ease: 'expo.inOut',
          delay: 0.3,
        }
      );
    }

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex flex-col justify-between p-8 bg-charcoal z-[100]"
    >
      <div className="flex justify-between items-start text-cream">
        <span className="font-mono text-sm uppercase tracking-widest">Khadija Portfolio</span>
        <span className="font-mono text-sm uppercase tracking-widest">Loading</span>
      </div>

      <div className="flex flex-col items-center justify-center flex-1">
        <div 
          ref={counterRef} 
          className="font-display text-cream leading-none" 
          style={{ fontSize: 'clamp(80px, 15vw, 200px)' }}
        >
          {progress}%
        </div>
      </div>

      <div className="w-full">
        <div className="h-[2px] w-full bg-cream/20 relative overflow-hidden">
          <div 
            ref={progressBarRef}
            className="absolute top-0 left-0 h-full bg-copper w-0" 
          />
        </div>
      </div>
    </div>
  );
}
