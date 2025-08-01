import { useEffect, useState } from 'react';

export default function PerformanceOptimizer({ children }) {
  const [isSlowDevice, setIsSlowDevice] = useState(false);

  useEffect(() => {
    // Detect slow devices and reduce animations/effects
    const detectSlowDevice = () => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Check for low-end devices
      const isSlowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
      const isLowMemory = navigator.deviceMemory && navigator.deviceMemory <= 2;
      const isSlowConnection = navigator.connection &&
        (navigator.connection.effectiveType === '2g' || navigator.connection.effectiveType === 'slow-2g');

      if (prefersReducedMotion || isSlowCPU || isLowMemory || isSlowConnection) {
        setIsSlowDevice(true);
        document.documentElement.classList.add('reduce-motion');
      }
    };

    detectSlowDevice();

    // Optimize font loading
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        document.documentElement.classList.add('fonts-loaded');
      });
    }

    // Preload critical resources on fast connections
    if (navigator.connection && navigator.connection.effectiveType === '4g') {
      const preloadLinks = document.querySelectorAll('link[rel="preload"]');
      preloadLinks.forEach(link => {
        if (link.getAttribute('href')?.includes('font')) {
          link.crossOrigin = 'anonymous';
        }
      });
    }

    // Critical Web Vitals tracking
    if ('PerformanceObserver' in window) {
      // Track Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcpEntry = entries[entries.length - 1];
        console.log('LCP:', lcpEntry.startTime);
      });

      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // Fallback for older browsers
      }

      // Track First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('FID:', entry.processingStart - entry.startTime);
        }
      });

      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // Fallback for older browsers
      }

      // Track Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        console.log('CLS:', clsValue);
      });

      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // Fallback for older browsers
      }
    }

    return () => {
      // Cleanup observers if needed
    };
  }, []);

  return (
    <div className={isSlowDevice ? 'reduce-motion-device' : ''}>
      {children}
    </div>
  );
}
// Lazy loading image component for better performance
export function LazyImage({ src, alt, fallback, className = '', ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(fallback || '');

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    img.onerror = () => {
      setHasError(true);
      if (fallback) {
        setImageSrc(fallback);
      }
    };
    img.src = src;
  }, [src, fallback]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      loading="lazy"
      decoding="async"
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
// Critical CSS injector for above-the-fold content
export function CriticalCSS() {
  useEffect(() => {
    // Inject critical CSS for above-the-fold content
    const criticalCSS = `
      .hero-section {
        display: flex;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      .logo-container {
        margin-bottom: 2rem;
      }
      .hero-title {
        font-size: clamp(2rem, 8vw, 4rem);
        font-weight: 700;
        background: linear-gradient(135deg, #fbbf24, #ef4444, #ec4899);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      @media (max-width: 768px) {
        .hero-section {
          padding: clamp(2rem, 6vw, 3rem);
        }
        .backdrop-blur-lg {
          backdrop-filter: blur(8px) !important;
        }
        .animate-spin,
        .animate-pulse {
          animation: none !important;
        }
      }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.innerText = criticalCSS;
    document.head.appendChild(styleSheet);

    return () => {
      if (document.head.contains(styleSheet)) {
        document.head.removeChild(styleSheet);
      }
    };
  }, []);

  return null;
}