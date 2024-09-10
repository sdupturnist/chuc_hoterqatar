import { useState, useEffect } from 'react';

function useWindowWidth() {
  // Initialize windowWidth state
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    // Check if window is available before adding event listener
    if (typeof window === 'undefined') return;

    // Function to update state with new window width
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowWidth;
}

export default useWindowWidth;
