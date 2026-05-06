declare module 'lenis' {
  interface LenisOptions {
    lerp?: number;
    duration?: number;
    smoothWheel?: boolean;
    smoothTouch?: boolean;
    wheelMultiplier?: number;
    touchMultiplier?: number;
    infinite?: boolean;
    orientation?: 'vertical' | 'horizontal';
    gestureOrientation?: 'vertical' | 'horizontal' | 'both';
    wrapper?: HTMLElement | Window;
    content?: HTMLElement;
  }

  export default class Lenis {
    constructor(options?: LenisOptions);
    raf(time: number): void;
    scrollTo(target: string | HTMLElement | number, options?: { offset?: number; immediate?: boolean; duration?: number }): void;
    on(event: string, callback: (...args: unknown[]) => void): void;
    destroy(): void;
  }
}
