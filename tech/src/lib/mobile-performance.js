// Check if the device is mobile based on window width
export const isMobileDevice = () => {
  return window.innerWidth < 768;
};

// Check for reduced motion preference or mobile device
export const shouldReduceAnimations = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches || isMobileDevice();
};

// Adjust animation duration for mobile or reduced motion
export const getOptimizedAnimationDuration = (defaultDuration) => {
  return shouldReduceAnimations() ? defaultDuration * 0.5 : defaultDuration;
};

// Debounce a function to limit execution rate
export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Optimize images for mobile by replacing .png with _mobile.webp
export const getOptimizedImageSrc = (src, isMobile) => {
  if (isMobile && src.includes('.png')) {
    return src.replace('.png', '_mobile.webp');
  }
  return src;
};

// Create an IntersectionObserver with mobile-optimized settings
export const createIntersectionObserver = (callback, options) => {
  const defaultOptions = {
    root: null,
    rootMargin: isMobileDevice() ? '50px' : '100px',
    threshold: isMobileDevice() ? 0.1 : 0.25,
    ...options,
  };
  return new IntersectionObserver(callback, defaultOptions);
};