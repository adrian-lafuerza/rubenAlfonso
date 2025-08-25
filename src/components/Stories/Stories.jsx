import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStories } from '../../contexts/StoriesContext';
import PlayIcon from '../../assets/images/Play.svg';
import useScrollReveal from '../../hooks/useScrollReveal';
import { 
  slideInVariants, 
  slideInFromLeft,
  slideInFromRight,
  slideInFromBottom,
  scaleInVariants,
  containerVariants,
  childVariants,
  hoverVariants,
  fadeInVariants,
  textRevealVariants
} from '../../utils/motionVariants';

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
        height: visibleItems === 1 ? '420px' : visibleItems === 2 ? '450px' : '700px',
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
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
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
              <h3 className={`font-bold text-white mb-1 drop-shadow-lg ${visibleItems === 1 ? 'text-lg' : 'text-xl'
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
                className={`backdrop-blur-sm rounded-2xl border-2 border-white shadow-lg hover:bg-[#0E0E0E] transition-colors duration-300 cursor-pointer ${visibleItems === 1 ? 'p-3' : 'p-4'
                  }`}
                whileHover={{
                  backgroundColor: "#0E0E0E",
                  boxShadow: "0 10px 25px rgba(255,255,255,0.2)"
                }}
              >
                <motion.img
                  src={PlayIcon}
                  alt="Play"
                  className={`filter brightness-0 invert transition-transform duration-300 ${visibleItems === 1 ? 'w-8 h-8' : 'w-10 h-10'
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

/**
 * Componente principal de Stories
 */
const Stories = () => {
  const { stories, loading, error, retryFetch } = useStories();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef(null);
  
  const { ref: sectionRef, isInView: sectionInView } = useScrollReveal({ threshold: 0.1 });
  const { ref: headerRef, isInView: headerInView } = useScrollReveal({ threshold: 0.3 });
  const { ref: carouselRef, isInView: carouselInView } = useScrollReveal({ threshold: 0.2 });
  const { ref: marqueeRef, isInView: marqueeInView } = useScrollReveal({ threshold: 0.5 });

  // Debug: Log para verificar el estado
  // console.log('Stories Debug:', { stories, loading, error, storiesLength: stories?.length });

  // Calcular items visibles según el tamaño de pantalla
  const [visibleItems, setVisibleItems] = useState(3);

  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(1); // Móvil: 1 card
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2); // Tablet: 2 cards
      } else {
        setVisibleItems(3); // Desktop: 3 cards
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);

    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  // Manejar click en story para abrir video
  const handleStoryClick = (story) => {
    if (story.videoLink) {
      window.open(story.videoLink, '_blank', 'noopener,noreferrer');
    }
  };

  // Navegación
  const handleNavigation = (index) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerWidth = container.clientWidth;
      const cardWidth = containerWidth / visibleItems;
      const scrollPosition = index * cardWidth;

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });

      setCurrentIndex(index);
    }
  };

  // Funciones para drag simplificadas
  const handleMouseDown = (e) => {
    if (!scrollContainerRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  };

  // Touch events para móviles - usando useEffect para event listeners no pasivos
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleTouchStart = (e) => {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - container.offsetLeft);
      setScrollLeft(container.scrollLeft);
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, startX, scrollLeft]);

  // Event listeners globales para drag
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!isDragging || !scrollContainerRef.current) return;
      e.preventDefault();
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, startX, scrollLeft]);

  // Debug: Agregar un return tempotal para verificar si el componente se renderiza
  // return (
  //   <div style={{ padding: '50px', backgroundColor: 'red', color: 'white', fontSize: '24px' }}>
  //     STORIES COMPONENT IS RENDERING - Debug Mode
  //     <br />Loading: {loading ? 'true' : 'false'}
  //     <br />Error: {error || 'none'}
  //     <br />Stories: {stories?.length || 0}
  //   </div>
  // );

  // Estados de carga y error con animaciones
  if (loading) {
    return (
      <motion.section 
        className="py-12 md:py-16 lg:py-20 xl:py-24  bg-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"
              variants={childVariants}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div 
              className="h-4 bg-gray-200 rounded w-96 mx-auto"
              variants={childVariants}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
          </motion.div>
          <motion.div 
            className="flex gap-6 overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i} 
                className="min-w-[320px] bg-white rounded-2xl overflow-hidden shadow-lg"
                variants={childVariants}
              >
                <motion.div 
                  className="h-72 bg-gray-200"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                />
                <div className="p-4">
                  <motion.div 
                    className="h-6 bg-gray-200 rounded mb-2"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 + 0.3 }}
                  />
                  <motion.div 
                    className="h-4 bg-gray-200 rounded w-2/3"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 + 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    );
  }

  if (error) {
    return (
      <motion.section 
        className="py-12 md:py-16 lg:py-20 xl:py-24 bg-gray-100"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            className="bg-white rounded-2xl p-8 shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div 
              className="text-red-500 mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
            >
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </motion.div>
            <motion.h3 
              className="text-xl font-semibold text-gray-900 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Error al cargar las historias
            </motion.h3>
            <motion.p 
              className="text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {error}
            </motion.p>
            <motion.button
              onClick={retryFetch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Intentar de nuevo
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  if (!stories || stories.length === 0) {
    return (
      <motion.section 
        className="py-12 md:py-16 lg:py-20 xl:py-24 bg-gray-100"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            className="bg-white rounded-2xl p-8 shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.h3 
              className="text-xl font-semibold text-gray-900 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              No hay historias disponibles
            </motion.h3>
            <motion.p 
              className="text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Actualmente no hay historias para mostrar.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      ref={sectionRef}
      className="py-16 md:py-20 lg:py-28 xl:py-32 bg-gray-100"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Layout responsive: centrado en móvil/tablet, lado a lado en desktop */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
          {/* Encabezado - Columna izquierda en desktop */}
          <motion.div 
            ref={headerRef}
            className="font-sofia-pro lg:col-span-4 text-center lg:text-left mb-16 lg:mb-0"
            initial="visible"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div 
              className="flex items-center justify-center lg:justify-start mb-4 gap-3"
              variants={childVariants}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.svg
                  key={star}
                  className="w-8 h-8 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                  variants={{
                    hidden: { opacity: 0, scale: 0, rotate: -180 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                      transition: {
                        duration: 0.5,
                        delay: star * 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }
                    }
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: 360,
                    transition: { duration: 0.3 }
                  }}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </motion.svg>
              ))}
            </motion.div>
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4 lg:mb-6"
              variants={textRevealVariants}
            >
              Lo Que Dicen Quienes
              <br />
              <motion.span 
                className='block border-b-8 border-[#0E0E0E] inline-block leading-normal mr-2'
                whileHover={{
                  borderBottomColor: "#3B82F6",
                  transition: { duration: 0.3 }
                }}
              >
                Confiaron
              </motion.span>
              En Nosotros
            </motion.h2>
            <motion.p 
              className="text-gray-600 text-lg lg:text-xl leading-relaxed"
              variants={childVariants}
            >
              Más que clientes, son historias de éxito. Estas personas ya dieron el paso... ¿y tú?
            </motion.p>
          </motion.div>

          {/* Contenedor de stories - Columna derecha en desktop */}
          <motion.div 
            ref={carouselRef}
            className="lg:col-span-8 relative py-8"
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Stories carousel */}
            <motion.div
              ref={scrollContainerRef}
              className={`flex overflow-x-auto scrollbar-hide pb-16 select-none py-8 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'
                } ${visibleItems === 1 ? 'gap-4' : 'gap-6'
                }`}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onScroll={() => {
                if (scrollContainerRef.current && !isDragging) {
                  const container = scrollContainerRef.current;
                  const containerWidth = container.clientWidth;
                  const scrollLeft = container.scrollLeft;
                  const cardWidth = containerWidth / visibleItems;
                  const index = Math.round(scrollLeft / cardWidth);
                  setCurrentIndex(Math.max(0, Math.min(index, stories.length - visibleItems)));
                }
              }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2
                  }
                }
              }}
              initial="visible"
              animate="visible"
            >
              {stories.map((story, index) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  onClick={handleStoryClick}
                  visibleItems={visibleItems}
                  index={index}
                />
              ))}
            </motion.div>

            {/* Controles de navegación - Solo aparecen cuando hay más stories que items visibles */}
            {stories.length > visibleItems && (
              <motion.div 
                className="flex justify-center mt-12 lg:mt-16 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={carouselInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <motion.button
                  onClick={() => handleNavigation(Math.max(0, currentIndex - 1))}
                  disabled={currentIndex === 0}
                  className="cursor-pointer group disabled:cursor-not-allowed transition-all duration-300"
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: { duration: 0.1 }
                  }}
                >
                  <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-16 lg:h-16">
                    <motion.svg
                      width="56"
                      height="56"
                      viewBox="0 0 66 66"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full transition-all duration-300"
                      whileHover={{
                        rotate: -5,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <circle
                        cx="33"
                        cy="33"
                        r="32.5"
                        fill="transparent"
                        stroke="black"
                        className="group-hover:fill-black disabled:group-hover:fill-transparent"
                      />
                      <path
                        d="M22.2929 33.7071C21.9024 33.3166 21.9024 32.6834 22.2929 32.2929L28.6569 25.9289C29.0474 25.5384 29.6805 25.5384 30.0711 25.9289C30.4616 26.3195 30.4616 26.9526 30.0711 27.3431L24.4142 33L30.0711 38.6569C30.4616 39.0474 30.4616 39.6805 30.0711 40.0711C29.6805 40.4616 29.0474 40.4616 28.6569 40.0711L22.2929 33.7071ZM43 33V34H23V33V32H43V33Z"
                        fill="black"
                        className="group-hover:fill-white disabled:group-hover:fill-black"
                      />
                    </motion.svg>
                  </div>
                </motion.button>
                <motion.button
                  onClick={() => handleNavigation(Math.min(stories.length - visibleItems, currentIndex + 1))}
                  disabled={currentIndex >= stories.length - visibleItems}
                  className="cursor-pointer group disabled:cursor-not-allowed transition-all duration-300"
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: { duration: 0.1 }
                  }}
                >
                  <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-16 lg:h-16">
                    <motion.svg
                      width="56"
                      height="56"
                      viewBox="0 0 66 66"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full transition-all duration-300"
                      whileHover={{
                        rotate: 5,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <circle
                        cx="33"
                        cy="33"
                        r="32.5"
                        fill="transparent"
                        stroke="black"
                        className="group-hover:fill-black disabled:group-hover:fill-transparent"
                      />
                      <path
                        d="M42.7071 33.7071C43.0976 33.3166 43.0976 32.6834 42.7071 32.2929L36.3431 25.9289C35.9526 25.5384 35.3195 25.5384 34.9289 25.9289C34.5384 26.3195 34.5384 26.9526 34.9289 27.3431L40.5858 33L34.9289 38.6569C34.5384 39.0474 34.5384 39.6805 34.9289 40.0711C35.3195 40.4616 35.9526 40.4616 36.3431 40.0711L42.7071 33.7071ZM23 33V34H42V33V32H23V33Z"
                        fill="black"
                        className="group-hover:fill-white disabled:group-hover:fill-black"
                      />
                    </motion.svg>
                  </div>
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Marquee infinito - Fuera del contenedor para ocupar todo el ancho */}
      <motion.div 
        ref={marqueeRef}
        className="w-full bg-black py-8 mt-20"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div 
          className="marquee"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="marquee__content">
             <span className="text-white text-lg md:text-4xl font-bold mx-8 md:mx-12 whitespace-nowrap">mejores oportunidades inmobiliarias en EE.UU. y España</span>
             <span className="text-white text-lg md:text-4xl font-bold mx-8 md:mx-12 whitespace-nowrap">★</span>
             <span className="text-white text-lg md:text-4xl font-bold mx-8 md:mx-12 whitespace-nowrap">Tu puerta de entrada a las mejores oportunidades inmobiliarias en EE.UU. y España</span>
             <span className="text-white text-lg md:text-4xl font-bold mx-8 md:mx-12 whitespace-nowrap">★</span>
           </div>
           <div className="marquee__content" aria-hidden="true">
             <span className="text-white text-lg md:text-4xl font-bold mx-8 md:mx-12 whitespace-nowrap">mejores oportunidades inmobiliarias en EE.UU. y España</span>
             <span className="text-white text-lg md:text-4xl font-bold mx-8 md:mx-12 whitespace-nowrap">★</span>
             <span className="text-white text-lg md:text-4xl font-bold mx-8 md:mx-12 whitespace-nowrap">Tu puerta de entrada a las mejores oportunidades inmobiliarias en EE.UU. y España</span>
             <span className="text-white text-lg md:text-4xl font-bold mx-8 md:mx-12 whitespace-nowrap">★</span>
           </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Stories;