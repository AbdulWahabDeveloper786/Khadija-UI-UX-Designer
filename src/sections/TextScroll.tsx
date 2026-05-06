export function TextScroll() {
  const content = "Figma \u2022 Sketch \u2022 Principle \u2022 After Effects \u2022 HTML5 \u2022 CSS3 \u2022 React \u2022 TypeScript \u2022 Framer \u2022 Webflow \u2022 Notion \u2022 Slack \u2022 ";

  return (
    <section className="relative overflow-hidden py-8 bg-charcoal-elevated" style={{ zIndex: 1 }}>
      <div className="overflow-hidden">
        <div
          className="flex whitespace-nowrap"
          style={{
            animation: 'marquee-left 20s linear infinite',
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="font-body uppercase tracking-[4px] text-[#8a8a8a]/50 mr-8"
              style={{ fontSize: 'clamp(14px, 2vw, 20px)' }}
            >
              {content}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
