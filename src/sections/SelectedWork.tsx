import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    client: 'Aura Health',
    title: 'Mobile health app redesign',
    tags: ['UI Design', 'UX Research'],
    year: '2024',
    image: '/project-aura.jpg',
    layout: 'left',
  },
  {
    id: 2,
    client: 'Nomad Studio',
    title: 'Creative agency website',
    tags: ['Web Design', 'Branding'],
    year: '2024',
    image: '/project-nomad.jpg',
    layout: 'right',
  },
  {
    id: 3,
    client: 'Meridian Bank',
    title: 'Digital banking platform',
    tags: ['UI Design', 'Design System'],
    year: '2023',
    image: '/project-meridian.jpg',
    layout: 'full',
  },
  {
    id: 4,
    client: 'Cultivate',
    title: 'E-commerce experience',
    tags: ['UX Research', 'Web Design'],
    year: '2023',
    image: '/project-cultivate.jpg',
    layout: 'overlap',
  },
];

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.project-card');
    if (!cards) return;

    const triggers: ScrollTrigger[] = [];

    cards.forEach((card) => {
      const tl = gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);

      const img = card.querySelector('.project-card-image');
      if (img) {
        const imgTl = gsap.fromTo(
          img,
          { scale: 1.05 },
          {
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
        if (imgTl.scrollTrigger) triggers.push(imgTl.scrollTrigger);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative bg-charcoal" style={{ zIndex: 1, padding: 'clamp(80px, 12vh, 160px) 0' }}>
      <div className="mx-auto" style={{ maxWidth: 1400, padding: '0 clamp(24px, 4vw, 80px)' }}>
        <div className="mb-20">
          <span className="section-label block mb-4">(01) Portfolio</span>
          <h2 className="font-display text-cream" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
            Selected Work
          </h2>
        </div>

        <div className="flex flex-col" style={{ gap: 120 }}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const imageContainer = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    if (!imageContainer.current) return;
    const rect = imageContainer.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    imageContainer.current.style.setProperty('--mouse-x', `${x}`);
    imageContainer.current.style.setProperty('--mouse-y', `${y}`);
  }

  const isLeft = project.layout === 'left';
  const isRight = project.layout === 'right';
  const isFull = project.layout === 'full';
  const isOverlap = project.layout === 'overlap';

  return (
    <div
      className={`project-card group opacity-0 ${isFull ? 'flex flex-col' : 'grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'}`}
      onMouseMove={handleMouseMove}
      data-cursor="view"
    >
      {/* Image */}
      <div
        ref={imageContainer}
        className={`overflow-hidden ${
          isLeft ? 'lg:col-span-7 lg:order-1' :
          isRight ? 'lg:col-span-7 lg:order-2' :
          isOverlap ? 'lg:col-span-7 lg:order-1' :
          'w-full'
        }`}
      >
        <img
          src={project.image}
          alt={project.title}
          className="project-card-image w-full object-cover"
          style={{ aspectRatio: isFull ? '21/9' : '4/3' }}
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div
        className={`${
          isLeft ? 'lg:col-span-5 lg:order-2 lg:pl-8' :
          isRight ? 'lg:col-span-5 lg:order-1 lg:pr-8' :
          isOverlap ? 'lg:col-span-5 lg:order-2 lg:pl-8 lg:-ml-[5%]' :
          'mt-8 text-center max-w-xl mx-auto'
        }`}
      >
        <span className="font-body text-[13px] uppercase tracking-[2px] text-[#8a8a8a] block mb-3">
          {project.client}
        </span>
        <h3 className="font-display text-cream mb-4" style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}>
          {project.title}
        </h3>
        <div className={`flex flex-wrap gap-2 mb-4 ${isFull ? 'justify-center' : ''}`}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1 border border-cream/15 rounded-full font-body text-[10px] uppercase tracking-[1px] text-[#8a8a8a]"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="font-mono text-[12px] text-[#8a8a8a]">{project.year}</span>
      </div>
    </div>
  );
}
