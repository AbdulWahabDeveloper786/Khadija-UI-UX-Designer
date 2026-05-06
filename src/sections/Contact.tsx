import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from '@/components/SplitText';
import { MagneticButton } from '@/components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { label: 'LinkedIn', href: '#' },
  { label: 'Dribbble', href: '#' },
  { label: 'Behance', href: '#' },
  { label: 'Twitter', href: '#' },
];

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 85%', toggleActions: 'play none none none' }
      });
    }
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    const text = `Hi Khadija, I have a project inquiry.\n\n*Name:* ${name || 'N/A'}\n*Email:* ${email || 'N/A'}\n*Message:* ${message || 'N/A'}`;
    const url = `https://wa.me/923123923304?text=${encodeURIComponent(text)}`;
    
    window.open(url, '_blank');
  }

  return (
    <section id="contact" className="relative bg-charcoal" style={{ zIndex: 1, padding: 'clamp(80px, 12vh, 160px) 0' }}>
      <div className="mx-auto max-w-[800px] text-center" style={{ padding: '0 clamp(24px, 4vw, 80px)' }}>
        <span className="section-label block mb-6">(04) Contact</span>

        <div className="mb-6">
          <SplitText animate="scroll" type="words" className="font-display text-cream leading-[1.1]" tag="h2" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
            Let's Create Something Beautiful
          </SplitText>
        </div>

        <p className="font-body font-light text-[18px] text-[#8a8a8a] mt-6">
          Have a project in mind? I'd love to hear about it.
        </p>

        <a
          href="mailto:hello@khadija.design"
          className="font-display text-copper hover:text-copper-hover transition-colors inline-block mt-8 relative group"
          style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
          data-cursor="link"
        >
          hello@khadija.design
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-copper group-hover:w-full transition-all duration-500" />
        </a>

        <div className="flex flex-wrap items-center justify-center gap-8 mt-10">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-[14px] uppercase tracking-[2px] text-[#8a8a8a] hover:text-cream hover:-translate-y-0.5 transition-all"
              data-cursor="link"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="mt-16 text-left opacity-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="minimal-input"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="minimal-input"
              required
            />
          </div>
          <textarea
            name="message"
            placeholder="Tell me about your project..."
            rows={4}
            className="minimal-input resize-none mb-10"
            required
          />
          <div className="text-center">
            <MagneticButton className="pill-btn pill-btn-filled">
              Send Message
            </MagneticButton>
          </div>
        </form>
      </div>
    </section>
  );
}
