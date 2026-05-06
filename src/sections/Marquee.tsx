export function Marquee() {
  const row1Content = "UI Design \u2022 UX Research \u2022 Brand Identity \u2022 Web Design \u2022 App Design \u2022 Prototyping \u2022 Design Systems \u2022 ";
  const row2Content = "Figma \u2022 Sketch \u2022 Adobe XD \u2022 Principle \u2022 After Effects \u2022 HTML/CSS \u2022 JavaScript \u2022 ";

  return (
    <section className="relative overflow-hidden py-10 bg-charcoal" style={{ zIndex: 1 }}>
      {/* Row 1 - scrolls left */}
      <div className="overflow-hidden mb-4">
        <div className="marquee-track animate-marquee-left">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={`r1-${i}`}
              className="font-display text-cream/15 whitespace-nowrap mr-8"
              style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
            >
              {row1Content}
            </span>
          ))}
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={`r1-dup-${i}`}
              className="font-display text-cream/15 whitespace-nowrap mr-8"
              style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
            >
              {row1Content}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 - scrolls right */}
      <div className="overflow-hidden">
        <div className="marquee-track animate-marquee-right">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={`r2-${i}`}
              className="font-display text-cream/15 whitespace-nowrap mr-8"
              style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
            >
              {row2Content}
            </span>
          ))}
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={`r2-dup-${i}`}
              className="font-display text-cream/15 whitespace-nowrap mr-8"
              style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
            >
              {row2Content}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
