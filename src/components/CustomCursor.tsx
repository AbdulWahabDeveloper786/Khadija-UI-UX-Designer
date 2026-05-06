import { useRef, useEffect, useState } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<'default' | 'text' | 'link' | 'view'>('default');

  useEffect(() => {
    if (!cursorRef.current || !dotRef.current) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isActive = true;

    function animate() {
      if (!isActive) return;
      const lerp = 0.15;
      cursorX += (mouseX - cursorX) * lerp;
      cursorY += (mouseY - cursorY) * lerp;

      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      requestAnimationFrame(animate);
    }
    animate();

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="view"]')) {
        setCursorState('view');
      } else if (target.closest('a, button, [data-cursor="link"], .pill-btn, .nav-link')) {
        setCursorState('link');
      } else if (target.closest('p, h1, h2, h3, h4, span, [data-cursor="text"], .quote-text')) {
        setCursorState('text');
      } else {
        setCursorState('default');
      }
    }

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      isActive = false;
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      >
        <div className={`cursor-ring cursor-${cursorState}`}>
          {cursorState === 'view' && (
            <span className="cursor-view-text">View</span>
          )}
        </div>
      </div>
      <div
        ref={dotRef}
        className="cursor-dot"
      />
    </>
  );
}
