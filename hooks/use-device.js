import { useEffect, useState } from "react";

export function useDevice() {
 
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => { 
    if (typeof window !== 'undefined') {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener('resize', handleResize);

      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
   
  if (windowSize.width <576) return 'small' 
   if (windowSize.width < 768) return 'medium'; 

  return 'large'
}
 
