
export const isMobileDevice = () => {
  return window.innerWidth < 768;
};

export const shouldReduceAnimations = () => {
  // Check for reduced motion preference or mobile device
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches || isMobileDevice();
};

export const getOptimizedAnimationDuration = (defaultDuration: number) => {
  return shouldReduceAnimations() ? defaultDuration * 0.5 : defaultDuration;
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Optimize images for mobile
export const getOptimizedImageSrc = (src: string, isMobile: boolean) => {
  if (isMobile && src.includes('.png')) {
    return src.replace('.png', '_mobile.webp');
  }
  return src;
};

// Lazy load optimization
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const defaultOptions = {
    root: null,
    rootMargin: isMobileDevice() ? '50px' : '100px',
    threshold: isMobileDevice() ? 0.1 : 0.25,
    ...options,
  };
  
  return new IntersectionObserver(callback, defaultOptions);
};
