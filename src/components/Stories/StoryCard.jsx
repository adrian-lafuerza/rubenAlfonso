import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PlayIcon from '../../assets/images/Play.svg';
import useScrollReveal from '../../hooks/useScrollReveal';

/**
 * Componente de card individual para cada story
 */
const StoryCard = ({ story, onClick, visibleItems, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { ref: cardRef, isInView: cardInView } = useScrollReveal({ threshold: 0.3 });

  // Calcular ancho dinámico basado en items visibles
  const getCardWidth = () => {
    if (visibleItems === 1) {
      return 'calc(100% - 16px)'; // En móvil, usar ancho completo menos padding
    } else if (visibleItems === 2) {
      return 'calc(50% - 12px)'; // En tablet, 50% menos la mitad del gap
    } else {
      return 'calc(33.333% - 16px)'; // En desktop, 33.33% menos gap
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateY: 15,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-3xl overflow-hidden group flex-shrink-0 bg-gray-100"
      style={{
        background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
        border: '3px solid #000',
        aspectRatio: '2.5/4',
        height: visibleItems === 1 ? '420px' : visibleItems === 2 ? '450px' : '564px',
        width: getCardWidth(),
        minWidth: visibleItems === 1 ? '250px' : visibleItems === 2 ? '280px' : '300px',
      }}
      variants={cardVariants}
      initial="hidden"
      animate={cardInView ? "visible" : "hidden"}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
        transition: { duration: 0.3 }
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
    >
      {/* Imagen de fondo */}
      <div className="relative w-full h-full">
        <AnimatePresence>
          {!imageLoaded && (
            <motion.div 
              className="absolute inset-0 bg-gray-200 flex items-center justify-center"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {!imageError ? (
          <motion.img
            src={story.backgroundImage}
            alt={story.name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'cover'
            }}
            onLoad={handleImageLoad}
            onError={handleImageError}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: imageLoaded ? 1 : 0,
              transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
            }}
          />
        ) : (
          <motion.div 
            className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-gray-600 text-center">
              <motion.svg 
                className="w-12 h-12 mx-auto mb-2" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </motion.svg>
              <motion.p 
                className="text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                Imagen no disponible
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* Información de la story en la parte inferior */}
        <motion.div 
          className={`absolute bottom-0 left-0 right-0 ${visibleItems === 1 ? 'p-4' : 'p-6'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex-1"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.4
                  }
                }
              }}
              initial="hidden"
              animate={cardInView ? "visible" : "hidden"}
            >
              <h3 className={`font-bold text-white mb-1 drop-shadow-lg ${
                visibleItems === 1 ? 'text-lg' : 'text-xl'
              }`}>
                {story.name}
              </h3>
              {story.positionJob && (
                <p className="text-white text-sm opacity-90 drop-shadow-lg">
                  {story.positionJob}
                </p>
              )}
            </motion.div>
            {/* Botón de play al lado del nombre */}
            <motion.div 
              className={`${visibleItems === 1 ? 'ml-2' : 'ml-4'}`}
              variants={{
                hidden: { opacity: 0, scale: 0, rotate: -180 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }
              }}
              initial="hidden"
              animate={cardInView ? "visible" : "hidden"}
              whileHover={{
                scale: 1.1,
                rotate: 12,
                transition: { duration: 0.2 }
              }}
              whileTap={{
                scale: 0.9,
                transition: { duration: 0.1 }
              }}
            >
              <motion.button
                onClick={() => onClick(story)}
                className={`backdrop-blur-sm rounded-2xl border-2 border-white shadow-lg hover:bg-[#0E0E0E] transition-colors duration-300 cursor-pointer ${
                  visibleItems === 1 ? 'p-3' : 'p-4'
                }`}
                whileHover={{
                  backgroundColor: "#0E0E0E",
                  boxShadow: "0 10px 25px rgba(255,255,255,0.2)"
                }}
              >
                <motion.img
                  src={PlayIcon}
                  alt="Play"
                  className={`filter brightness-0 invert transition-transform duration-300 ${
                    visibleItems === 1 ? 'w-8 h-8' : 'w-10 h-10'
                  }`}
                  whileHover={{
                    scale: 1.25,
                    transition: { duration: 0.2 }
                  }}
                />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StoryCard;