import { useState, useEffect } from 'react';

const useAnimatedCounter = (endValue, duration = 2000, startAnimation = false) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!startAnimation) {
      setCurrentValue(0);
      return;
    }

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Ease out animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(easeOut * endValue);
      
      setCurrentValue(value);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [endValue, duration, startAnimation]);

  return currentValue;
};

export default useAnimatedCounter;
