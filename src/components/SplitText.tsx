import { useRef, useEffect, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  type?: 'chars' | 'words';
  animate?: 'hero' | 'scroll';
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  style?: CSSProperties;
  isLoaded?: boolean;
}

export function SplitText({ children, className = '', type = 'chars', animate = 'scroll', delay = 0, tag = 'div', style, isLoaded = true }: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const text = children;
    const items = type === 'chars' ? text.split('') : text.split(' ');

    el.innerHTML = items
      .map((item) =>
        `<span class="split-item"><span class="split-inner">${item === ' ' ? '&nbsp;' : item}</span></span>`
      )
      .join(type === 'words' ? ' ' : '');

    const inners = el.querySelectorAll('.split-inner');

    if (animate === 'hero') {
      if (!isLoaded) return; // Wait for preloader

      gsap.fromTo(
        inners,
        { y: 80, opacity: 0, rotateX: -40 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.03,
          ease: 'expo.out',
          delay: delay,
        }
      );
    } else {
      gsap.fromTo(
        inners,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.02,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          delay: delay,
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === el) t.kill();
      });
    };
  }, [children, type, animate, delay, isLoaded]);

  const Tag = tag;

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={className}
      style={{ perspective: '1000px', ...style }}
    />
  );
}
