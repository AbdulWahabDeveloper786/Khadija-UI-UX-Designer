"use client";

import { useCallback, useState } from 'react';
import Lenis from 'lenis';
import { FilmGrain } from '@/components/FilmGrain';
import { CustomCursor } from '@/components/CustomCursor';
import { Preloader } from '@/components/Preloader';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { Navbar } from '@/sections/Navbar';
import { Hero } from '@/sections/Hero';
import { Marquee } from '@/sections/Marquee';
import { SelectedWork } from '@/sections/SelectedWork';
import { About } from '@/sections/About';
import { Services } from '@/sections/Services';
import { Testimonials } from '@/sections/Testimonials';
import { TextScroll } from '@/sections/TextScroll';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  useSmoothScroll();

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const win = window as unknown as { lenis?: Lenis };
      if (win.lenis) {
        win.lenis.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <>
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      <video
        src="/bg-ambient.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
          opacity: 0.80,
          pointerEvents: 'none'
        }}
      />
      <FilmGrain />
      <CustomCursor />
      <Navbar onNavigate={handleNavigate} />
      <main>
        <Hero onNavigate={handleNavigate} isLoaded={isLoaded} />
        <Marquee />
        <SelectedWork />
        <About />
        <Services />
        <Testimonials />
        <TextScroll />
        <Contact />
      </main>
      <Footer onNavigate={handleNavigate} />
    </>
  );
}
