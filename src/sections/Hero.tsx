import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { MagneticButton } from '@/components/MagneticButton';
import { SplitText } from '@/components/SplitText';

interface HeroProps {
  onNavigate: (id: string) => void;
  isLoaded?: boolean;
}

export function Hero({ onNavigate, isLoaded = true }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isLoaded) return;

    const tl = gsap.timeline({ delay: 0.2 });

    if (metaRef.current) {
      tl.fromTo(metaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
    }
    // SplitText animates itself via its own useEffect, but wait!
    // Since SplitText animates independently on mount, we should conditionally render the text or pass a key/prop
    if (subRef.current) {
      tl.fromTo(subRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4');
    }
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.4');
    }
    if (portraitRef.current) {
      tl.fromTo(portraitRef.current, { x: 60, opacity: 0, scale: 1.05 }, { x: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out' }, 0.6);
    }
    if (scrollRef.current) {
      tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 2.0);
    }

    return () => { tl.kill(); };
  }, [isLoaded]);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * -20,
        y: (e.clientY / window.innerHeight - 0.5) * -20,
      });
    }
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: 1400, padding: '0 clamp(24px, 4vw, 80px)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 relative z-10">
            <div ref={metaRef} className="mb-8 opacity-0">
              <span className="font-mono text-[11px] uppercase tracking-[3px] text-[#8a8a8a]">
                UI/UX Designer &amp; Creative Director — Based in London
              </span>
            </div>

            <h1 className="font-display text-cream leading-[1.05] mb-8" style={{ fontSize: 'clamp(48px, 8vw, 120px)' }}>
              <SplitText animate="hero" delay={0.4} type="words" isLoaded={isLoaded}>Crafting</SplitText>
              <SplitText animate="hero" delay={0.6} type="words" isLoaded={isLoaded}>Digital Experiences</SplitText>
            </h1>

            <p
              ref={subRef}
              className="font-body font-light text-[#8a8a8a] max-w-[480px] opacity-0"
              style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', lineHeight: 1.6 }}
            >
              I design interfaces that feel intuitive, look stunning, and drive meaningful engagement for brands worldwide.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-6 mt-12">
              <MagneticButton
                className="pill-btn pill-btn-filled"
                onClick={() => onNavigate('work')}
              >
                View My Work
              </MagneticButton>
              <MagneticButton
                className="pill-btn pill-btn-outline"
              >
                <a href="https://wa.me/+923122099198" target="_blank" rel="noopener noreferrer">
                  Let's Talk
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Right Portrait */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div
              ref={portraitRef}
              className="relative opacity-0"
              style={{
                transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <img
                src="/Hero_Image.webp"
                alt="Khadija"
                className="w-full max-w-[500px] object-cover"
                style={{ aspectRatio: '3/4' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0">
        <div className="w-[1px] h-10 bg-cream/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-cream animate-scroll-line" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[2px] text-[#8a8a8a]">Scroll</span>
      </div>
    </section>
  );
}
