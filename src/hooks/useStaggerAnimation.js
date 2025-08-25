import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';

/**
 * Hook para crear animaciones escalonadas (stagger) con framer-motion
 * @param {boolean} trigger - Condición que activa las animaciones
 * @param {number} staggerDelay - Delay entre cada elemento (en segundos)
 * @returns {Object} - Controles de animación
 */
const useStaggerAnimation = (trigger, staggerDelay = 0.1) => {
  const controls = useAnimation();

  useEffect(() => {
    if (trigger) {
      controls.start(i => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * staggerDelay,
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }));
    }
  }, [trigger, controls, staggerDelay]);

  return controls;
};

export default useStaggerAnimation;