import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: '01',
    title: 'UI/UX Design',
    desc: 'Crafting intuitive interfaces that users love.',
    image: '/service-hover-1.jpg',
  },
  {
    num: '02',
    title: 'Brand Identity',
    desc: 'Building memorable visual systems.',
    image: '/service-hover-2.jpg',
  },
  {
    num: '03',
    title: 'Design Systems',
    desc: 'Scalable components for consistent products.',
    image: '/service-hover-3.jpg',
  },
  {
    num: '04',
    title: 'Creative Direction',
    desc: 'Vision-led design that tells your story.',
    image: '/service-hover-4.jpg',
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeImg, setActiveImg] = useState<string>(services[0].image);
  const mousePos = useRef({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const rows = sectionRef.current?.querySelectorAll('.service-row');
    if (!rows) return;

    const triggers: ScrollTrigger[] = [];

    rows.forEach((row, i) => {
      const tl = gsap.fromTo(row, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, delay: i * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: row, start: 'top 85%', toggleActions: 'play none none none' }
      });
      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
    });

    return () => { triggers.forEach((t) => t.kill()); };
  }, []);

  useEffect(() => {
    let currentX = mousePos.current.x;
    let currentY = mousePos.current.y;
    let rafId: number;

    function animate() {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      if (imageRef.current) {
        imageRef.current.style.left = `${currentX - 150}px`;
        imageRef.current.style.top = `${currentY - 100}px`;
      }
      rafId = requestAnimationFrame(animate);
    }
    animate();

    return () => cancelAnimationFrame(rafId);
  }, []);

  function handleMouseMove(e: React.MouseEvent) {
    mousePos.current = { x: e.clientX, y: e.clientY };
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-charcoal"
      style={{ zIndex: 1, padding: 'clamp(80px, 12vh, 160px) 0' }}
      onMouseMove={handleMouseMove}
    >
      <div className="mx-auto" style={{ maxWidth: 1400, padding: '0 clamp(24px, 4vw, 80px)' }}>
        <div className="mb-16">
          <span className="section-label block mb-4">(03) Services</span>
          <h2 className="font-display text-cream" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
            What I Do
          </h2>
        </div>

        <div className="flex flex-col">
          {services.map((service, i) => (
            <div
              key={service.num}
              className="service-row group border-b border-cream/8 py-10 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 opacity-0 hover:bg-cream/[0.02] transition-colors duration-300"
              onMouseEnter={() => {
                setHoveredIdx(i);
                setActiveImg(service.image);
              }}
              onMouseLeave={() => setHoveredIdx(null)}
              data-cursor="link"
            >
              <span className="font-mono text-[14px] text-[#8a8a8a] w-12">{service.num}</span>
              <h3 className="font-display text-cream flex-1" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                {service.title}
              </h3>
              <p className="font-body text-[15px] text-[#8a8a8a] max-w-[400px] hidden lg:block">
                {service.desc}
              </p>
              <span className="text-cream text-xl transition-transform duration-300 group-hover:rotate-45">
                →
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating hover image */}
      <img
        ref={imageRef}
        src={activeImg}
        alt=""
        className={`service-hover-image ${hoveredIdx !== null ? 'visible' : ''}`}
        style={{ opacity: hoveredIdx !== null ? 1 : 0 }}
      />
    </section>
  );
}
