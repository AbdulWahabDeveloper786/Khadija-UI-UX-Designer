import { useRef, useEffect, useState } from 'react';

interface NavbarProps {
  onNavigate: (id: string) => void;
}

const navItems = [
  { label: 'Home', id: 'hero' },
  { label: 'Work', id: 'work' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Contact', id: 'contact' },
];

export function Navbar({ onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 100);
    }

    function observeSections() {
      const sections = ['hero', 'work', 'about', 'services', 'testimonials', 'contact'];
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { threshold: 0.3 }
      );

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });

      return () => observer.disconnect();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    const cleanup = observeSections();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cleanup();
    };
  }, []);

  function handleNavClick(id: string) {
    onNavigate(id);
    setMobileOpen(false);
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ${scrolled
          ? 'bg-charcoal/80 backdrop-blur-xl border-b border-cream/5 py-5'
          : 'bg-transparent py-8'
          }`}
        style={{ transitionDuration: '400ms' }}
      >
        <div className="mx-auto flex items-center justify-between" style={{ maxWidth: 1400, padding: '0 clamp(24px, 4vw, 80px)' }}>
          <button
            onClick={() => handleNavClick('hero')}
            className="font-display text-lg text-cream tracking-wide"
            data-cursor="link"
          >
            Khadija.
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link font-body text-[13px] uppercase tracking-[2px] text-cream/80 hover:text-cream transition-colors ${activeSection === item.id ? 'active' : ''
                  }`}
                data-cursor="link"
              >
                {item.label}
              </button>
            ))}
            <MagneticButtonWrapper
              onClick={() => handleNavClick('contact')}
              className="pill-btn pill-btn-outline"
            >
              Let&apos;s Talk
            </MagneticButtonWrapper>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[6px] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-cursor="link"
          >
            <span
              className={`block w-6 h-[1px] bg-cream transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''
                }`}
            />
            <span
              className={`block w-6 h-[1px] bg-cream transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
                }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-charcoal transition-all duration-500 flex flex-col items-center justify-center gap-8 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className="font-display text-4xl text-cream hover:text-copper transition-colors"
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => handleNavClick('contact')}
          className="font-body text-sm uppercase tracking-[2px] text-copper mt-4"
        >
          Let&apos;s Talk
        </button>
      </div>
    </>
  );
}

function MagneticButtonWrapper({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = ref.current;
    if (!btn) return;

    const el = btn;

    function onMouseMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    }

    function onMouseLeave() {
      el.style.transform = 'translate(0, 0)';
    }

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <button ref={ref} className={`magnetic-btn ${className || ''}`} onClick={onClick} data-cursor="link">
      {children}
    </button>
  );
}
