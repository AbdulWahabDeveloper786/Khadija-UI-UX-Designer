interface FooterProps {
  onNavigate: (id: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative bg-charcoal border-t border-cream/8" style={{ zIndex: 1, padding: '48px 0' }}>
      <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-4" style={{ maxWidth: 1400, padding: '0 clamp(24px, 4vw, 80px)' }}>
        <span className="font-body text-[13px] text-[#8a8a8a]">
          © {new Date().getFullYear()} Khadija. All rights reserved.
        </span>

        <button
          onClick={() => onNavigate('hero')}
          className="font-body text-[13px] uppercase tracking-[1px] text-cream hover:text-copper transition-colors"
          data-cursor="link"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
