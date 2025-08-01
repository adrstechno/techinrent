import * from "react";
const MOBILE_BREAKPOINT = 768;
export function useMobile() {
  const [isMobile, setIsMobile] = React.useState(
    undefined,
  );
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width)`);
    // Debounced resize handler for better performance
    let timeoutId= () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      }, 100); // Debounce resize events
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => {
      mql.removeEventListener("change", onChange);
      clearTimeout(timeoutId);
    };
  }, []);
  return !!isMobile;
}
