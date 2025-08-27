import { useState, useEffect, useRef, useCallback } from 'react';
import { useStories } from '../../contexts/StoriesContext';
import { motion } from 'framer-motion';
import useScrollReveal from '../../hooks/useScrollReveal';
import {
  containerVariants,
  childVariants,
  textRevealVariants
} from '../../utils/motionVariants';
import StoryCard from './StoryCard';

const Stories = () => {
  const { stories, loading, error, retryFetch } = useStories();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const startPosRef = useRef(0);
  const currentTranslateRef = useRef(0);

  const { ref: headerRef, isInView: headerInView } = useScrollReveal({ threshold: 0.3 });
  const { ref: carouselRef, isInView: carouselInView } = useScrollReveal({ threshold: 0.2 });

  const getVisibleItems = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      if (window.innerWidth < 1280) return 2;
      if (window.innerWidth < 1870) return 2;
      return 3;
    }
    return 3;
  };

  const [visibleItems, setVisibleItems] = useState(getVisibleItems());

  const handleNavigation = useCallback((newIndex) => {
    const maxIndex = Math.max(0, stories.length - 1);
    const clampedIndex = Math.max(0, Math.min(maxIndex, newIndex));
    setCurrentIndex(clampedIndex);
    currentTranslateRef.current = -clampedIndex * (100 / visibleItems);
  }, [stories.length, visibleItems]);

  // Drag functionality
  const handleDragStart = useCallback((clientX) => {
    setIsDragging(true);
    setDragStart(clientX);
    startPosRef.current = currentTranslateRef.current;
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'none';
    }
  }, []);

  const handleDragMove = useCallback((clientX) => {
    if (!isDragging) return;

    const diff = clientX - dragStart;
    const containerWidth = carouselRef.current?.offsetWidth || 1;
    const dragPercentage = (diff / containerWidth) * 100;

    setDragOffset(dragPercentage);

    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${startPosRef.current + dragPercentage}%)`;
    }
  }, [isDragging, dragStart]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);

    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 0.3s ease-out';
    }

    // Determine if we should move to next/previous slide
    const threshold = 50; // pixels
    const containerWidth = carouselRef.current?.offsetWidth || 1;
    const dragDistance = Math.abs(dragOffset * containerWidth / 100);

    if (dragDistance > threshold) {
      if (dragOffset > 0 && currentIndex > 0) {
        // Dragged right, go to previous
        handleNavigation(currentIndex - 1);
      } else if (dragOffset < 0 && currentIndex < stories.length - 1) {
        // Dragged left, go to next
        handleNavigation(currentIndex + 1);
      } else {
        // Snap back to current position
        if (carouselRef.current) {
          carouselRef.current.style.transform = `translateX(${currentTranslateRef.current}%)`;
        }
      }
    } else {
      // Snap back to current position
      if (carouselRef.current) {
        carouselRef.current.style.transform = `translateX(${currentTranslateRef.current}%)`;
      }
    }

    setDragOffset(0);
  }, [isDragging, dragOffset, currentIndex, stories.length, handleNavigation]);

  // Mouse events
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  // Touch events
  const handleTouchStart = (e) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    // No usar preventDefault() con eventos pasivos
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(getVisibleItems());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Global mouse events for drag
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Update transform when currentIndex changes
  useEffect(() => {
    if (!isDragging && carouselRef.current) {
      currentTranslateRef.current = -currentIndex * (100 / visibleItems);
      carouselRef.current.style.transform = `translateX(${currentTranslateRef.current}%)`;
    }
  }, [currentIndex, visibleItems, isDragging]);

  const handleStoryClick = (story) => {
    if (story.videoLink) {
      window.open(story.videoLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-100">
      <div className="max-w-[100%] xl:max-w-[90%] mx-auto">
        {/* Layout responsive: centrado en móvil/tablet, lado a lado en desktop */}
        <div className="lg:grid lg:grid-cols-12  lg:items-center">
          <motion.div
            ref={headerRef}
            className="font-sofia-pro lg:col-span-4 xl:text-left text-center mt-16 lg:mt-0 lg:ml-4 ml-0"
            initial="visible"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div
              className="flex items-center justify-center xl:justify-start mb-4 gap-3"
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
              className="text-3xl md:text-4xl lg:text-4xl text-gray-900 mb-4 lg:mb-6"
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
          {!loading && (
            <div className="lg:col-span-8 xl:col-span-8 relative py-10">
              <div className="overflow-hidden px-4 md:px-6 lg:px-8 py-0 md:py-12">
                <div
                  ref={carouselRef}
                  className={`flex transition-transform duration-500 ease-in-out ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} py-10`}
                  style={{
                    transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`
                  }}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  onDragStart={(e) => e.preventDefault()}
                >
                  {stories.map((item, index) => (
                    <div
                      key={item.id}
                      className="w-full md:w-1/2 lg:w-1/2 xl:w-1/3 min-[1280px]:max-[1870px]:!w-1/2 flex-shrink-0 px-2 md:px-3 lg:px-4"
                    >
                      <StoryCard
                        key={item.id}
                        story={item}
                        onClick={handleStoryClick}
                        visibleItems={visibleItems}
                        index={index}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {stories.length > 1 && (
                <div className="flex justify-center justify-center space-x-3 md:space-x-4">
                  <button
                    onClick={() => handleNavigation(currentIndex - 1)}
                    disabled={currentIndex === 0}
                    className="cursor-pointer group hover:-translate-y-1 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all duration-300"
                  >
                    <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-16 lg:h-16">
                      <svg
                        width="56"
                        height="56"
                        viewBox="0 0 66 66"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full transition-all duration-300"
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
                      </svg>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavigation(currentIndex + 1)}
                    disabled={currentIndex >= stories.length - 1}
                    className="cursor-pointer group hover:-translate-y-1 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all duration-300"
                  >
                    <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-16 lg:h-16">
                      <svg
                        width="56"
                        height="56"
                        viewBox="0 0 66 66"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full transition-all duration-300"
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
                      </svg>
                    </div>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {loading && (
          <div className="flex justify-center items-center py-12 md:py-16 lg:py-20">
            <div className="animate-spin rounded-full h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 border-b-2 border-gray-900"></div>
            <span className="ml-3 text-gray-600 text-sm md:text-base">Cargando contenido...</span>
          </div>
        )}
      </div>
    </section >
  );
};

export default Stories;