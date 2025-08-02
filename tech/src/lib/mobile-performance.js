
// export const isMobileDevice = () => {
//   return window.innerWidth < 768;
// };

// export const shouldReduceAnimations = () => {
//   // Check for reduced motion preference or mobile device
//   return window.matchMedia('(prefers-reduced-motion: reduce)').matches || isMobileDevice();
// };

// export const getOptimizedAnimationDuration = (defaultDuration: number) => {
//   return shouldReduceAnimations() ? defaultDuration * 0.5 : defaultDuration;
// };

// export const debounce = <T extends (...args: any[]) => void>(
//   func: T,
//   wait: number
// ): ((...args: Parameters<T>) => void) => {
//   let timeout: NodeJS.Timeout;
//   return (...args: Parameters<T>) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func(...args), wait);
//   };
// };

// // Optimize images for mobile
// export const getOptimizedImageSrc = (src: string, isMobile: boolean) => {
//   if (isMobile && src.includes('.png')) {
//     return src.replace('.png', '_mobile.webp');
//   }
//   return src;
// };

// // Lazy load optimization
// export const createIntersectionObserver = (
//   callback: IntersectionObserverCallback,
//   options?: IntersectionObserverInit
// ) => {
//   const defaultOptions = {
//     root: null,
//     rootMargin: isMobileDevice() ? '50px' : '100px',
//     threshold: isMobileDevice() ? 0.1 : 0.25,
//     ...options,
//   };
  
//   return new IntersectionObserver(callback, defaultOptions);
// };


// uiUtils.jsx

// Checks if current device is considered mobile
export const isMobileDevice = () => {
  return window.innerWidth < 768;
};

// Detects user motion preferences or mobile status
export const shouldReduceAnimations = () => {
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    isMobileDevice()
  );
};

// Adjusts animation duration based on device/performance
export const getOptimizedAnimationDuration = (defaultDuration) => {
  return shouldReduceAnimations() ? defaultDuration * 0.5 : defaultDuration;
};

// Debounce utility (removes TypeScript generics)
export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Converts PNG to mobile-optimized WEBP for mobile devices
export const getOptimizedImageSrc = (src, isMobile) => {
  if (isMobile && src.includes('.png')) {
    return src.replace('.png', '_mobile.webp');
  }
  return src;
};

// Creates IntersectionObserver with defaults based on device
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: isMobileDevice() ? '50px' : '100px',
    threshold: isMobileDevice() ? 0.1 : 0.25,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};
