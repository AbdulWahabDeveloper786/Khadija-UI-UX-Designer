import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Khadija transformed our product from functional to exceptional. Her attention to detail and strategic thinking elevated every screen.",
    name: "Sarah Mitchell",
    role: "VP of Product, Aura Health",
    avatar: "/avatar-sarah.jpg",
  },
  {
    quote: "Working with Khadija was a game-changer. She brought clarity to our vision and delivered a brand identity that truly resonates.",
    name: "James Chen",
    role: "Founder, Nomad Studio",
    avatar: "/avatar-james.jpg",
  },
  {
    quote: "Her design system saved us months of development time. Khadija thinks at scale while never compromising on craft.",
    name: "Amara Okafor",
    role: "CMO, Meridian Bank",
    avatar: "/avatar-amara.jpg",
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(section.querySelector('.quote-mark'), { opacity: 0, y: 20 }, {
      opacity: 0.3, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' }
    });

    gsap.fromTo(contentRef.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' }
    });
  }, []);

  function goTo(idx: number) {
    if (animating) return;
    setAnimating(true);

    const content = contentRef.current;
    if (!content) {
      setCurrent(idx);
      setAnimating(false);
      return;
    }

    content.classList.add('testimonial-exit');

    setTimeout(() => {
      setCurrent(idx);
      content.classList.remove('testimonial-exit');
      content.classList.add('testimonial-enter');
      setTimeout(() => {
        content.classList.remove('testimonial-enter');
        setAnimating(false);
      }, 600);
    }, 400);
  }

  function next() {
    goTo((current + 1) % testimonials.length);
  }

  function prev() {
    goTo((current - 1 + testimonials.length) % testimonials.length);
  }

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative bg-charcoal"
      style={{ zIndex: 1, padding: '160px 0' }}
    >
      <div className="mx-auto max-w-[900px] text-center" style={{ padding: '0 clamp(24px, 4vw, 80px)' }}>
        <span className="quote-mark block mb-6">&ldquo;</span>

        <div ref={contentRef}>
          <p
            className="font-display text-cream italic leading-[1.4] mb-12"
            style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
          >
            {t.quote}
          </p>

          <div className="flex flex-col items-center gap-4">
            <img
              src={t.avatar}
              alt={t.name}
              className="w-12 h-12 rounded-full object-cover grayscale"
            />
            <div>
              <p className="font-body text-[16px] font-medium text-cream">{t.name}</p>
              <p className="font-body text-[14px] text-[#8a8a8a]">{t.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream hover:border-cream hover:bg-cream/5 transition-all"
            data-cursor="link"
          >
            ←
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? 'bg-copper w-6' : 'bg-cream/20 hover:bg-cream/40'
                }`}
                data-cursor="link"
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream hover:border-cream hover:bg-cream/5 transition-all"
            data-cursor="link"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
