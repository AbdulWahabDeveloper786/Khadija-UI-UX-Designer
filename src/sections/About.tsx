import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from '@/components/SplitText';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 7, suffix: '+', label: 'Years Experience' },
  { value: 120, suffix: '+', label: 'Projects Delivered' },
  { value: 35, suffix: '+', label: 'Happy Clients' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        setCount(Math.round(obj.val));
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function About() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;

    if (left) {
      gsap.fromTo(left, { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: left, start: 'top 80%', toggleActions: 'play none none none' }
      });
    }
    if (right) {
      gsap.fromTo(right, { x: 40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: right, start: 'top 80%', toggleActions: 'play none none none' }
      });
    }
  }, []);

  return (
    <section id="about" className="relative bg-charcoal" style={{ zIndex: 1, padding: 'clamp(80px, 12vh, 160px) 0' }}>
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-[5%] items-start" style={{ maxWidth: 1400, padding: '0 clamp(24px, 4vw, 80px)' }}>
        {/* Left Column */}
        <div ref={leftRef} className="lg:col-span-5 opacity-0">
          <span className="section-label block mb-8">(02) About</span>

          <div className="mb-10">
            <SplitText animate="scroll" type="words" className="font-display text-cream leading-[1.15]" tag="h2" style={{ fontSize: 'clamp(28px, 4vw, 56px)' }}>
              I believe design is the silent ambassador of your brand.
            </SplitText>
          </div>

          <div className="space-y-6 mb-12">
            <p className="font-body font-light text-[16px] text-[#8a8a8a] leading-[1.7]">
              With over <span className="text-cream">7 years of experience</span> in digital product design, I've helped startups and Fortune 500 companies transform their user experiences. My approach combines rigorous research with intuitive creativity.
            </p>
            <p className="font-body font-light text-[16px] text-[#8a8a8a] leading-[1.7]">
              When I'm not pushing pixels, you'll find me exploring galleries, collecting vintage typography specimens, or mentoring the next generation of designers.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-cream mb-1" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <span className="font-body text-[12px] uppercase tracking-[1px] text-[#8a8a8a]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div ref={rightRef} className="lg:col-span-7 opacity-0">
          <div className="relative overflow-hidden">
            <img
              src="/portrait-about.jpg"
              alt="Khadija at her studio"
              className="w-full object-cover"
              style={{ aspectRatio: '3/4' }}
              loading="lazy"
            />
          </div>
          <span className="font-mono text-[11px] text-[#8a8a8a] mt-3 block">
            Khadija at her London studio
          </span>
        </div>
      </div>
    </section>
  );
}
