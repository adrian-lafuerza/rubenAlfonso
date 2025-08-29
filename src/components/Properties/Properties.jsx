import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Mover el array fuera del componente para evitar recreaciones
const properties = [
  {
    id: 1,
    image: '/assets/images/property-1.png',
    alt: 'Propiedad moderna con diseño contemporáneo'
  },
  {
    id: 2,
    image: '/assets/images/property-2.png',
    alt: 'Propiedad de lujo con piscina interior'
  },
  {
    id: 3,
    image: '/assets/images/property-3.png',
    alt: 'Propiedad de lujo con piscina interior'
  },
  {
    id: 4,
    image: '/assets/images/imagen-1.jpg',
    alt: 'Complejo residencial moderno'
  },
  {
    id: 5,
    image: '/assets/images/imagen-2.jpg',
    alt: 'Propiedad moderna con diseño contemporáneo'
  },
  {
    id: 6,
    image: '/assets/images/imagen-3.jpg',
    alt: 'Propiedad de lujo con piscina interior'
  }
];

const Properties = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { ref: sectionRef, isInView: sectionInView } = useScrollReveal({ threshold: 0.2 });
  const { ref: headerRef, isInView: headerInView } = useScrollReveal({ threshold: 0.3 });
  const { ref: carouselRef, isInView: carouselInView } = useScrollReveal({ threshold: 0.4 });

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % properties.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateY: 15,
      z: -50
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      z: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      rotateY: -15,
      transition: {
        duration: 0.5
      }
    }
  };

  const sideImageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.7,
      x: 50
    },
    visible: {
      opacity: 0.6,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Removed indicatorVariants as it's not being used

  return (
    <motion.section 
      ref={sectionRef}
      className="py-16 bg-gray-100" 
      aria-label="Propiedades destacadas"
      initial="hidden"
      animate={sectionInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }
      }}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          ref={headerRef}
          className="text-center mb-6 md:mb-18"
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div 
            className="flex items-center justify-center mb-4"
            variants={childVariants}
          >
            <motion.h2 
              className="font-sofia-pro text-3xl md:text-5xl text-gray-900 md:leading-[60px]"
              variants={textRevealVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              🏡 Algunas propiedades que ya hemos
              <br/> 
              hecho realidad
            </motion.h2>
          </motion.div>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto mb-6 md:mb-18"
            variants={childVariants}
          >
            Cada inmueble tiene su historia. Estas son algunas de las favoritas de nuestros clientes.
          </motion.p>
        </motion.div>

        {/* Properties Carousel */}
        <motion.div 
          ref={carouselRef}
          className="relative max-w-8xl mx-auto py-2 md:py-18"
          initial="hidden"
          animate={carouselInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                staggerChildren: 0.2
              }
            }
          }}
        >
          {/* Mobile/Tablet - Single Image */}
          <div className="lg:hidden flex justify-center">
            <motion.div 
              className="relative"
              variants={childVariants}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={properties[currentSlide].image}
                  alt={properties[currentSlide].alt}
                  className="w-[38rem] max-w-full h-96 sm:h-96 object-cover rounded-lg shadow-xl"
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                />
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Desktop - Three Images */}
          <div className="hidden lg:flex justify-center items-center space-x-16 max-w-8xl">
            {/* Previous Image */}
            <motion.div 
              className="relative"
              variants={sideImageVariants}
            >
              <motion.img
                src={properties[(currentSlide - 1 + properties.length) % properties.length].image}
                alt={properties[(currentSlide - 1 + properties.length) % properties.length].alt}
                className="w-[28rem] h-[24rem] xl:w-[32rem] xl:h-[28rem] 2xl:w-[36rem] 2xl:h-[32rem] object-cover rounded-lg shadow-lg opacity-60"
                layoutId={`property-${(currentSlide - 1 + properties.length) % properties.length}`}
              />
            </motion.div>

            {/* Current Image */}
            <motion.div 
              className="relative z-10"
              variants={childVariants}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={properties[currentSlide].image}
                  alt={properties[currentSlide].alt}
                  className="w-[36rem] h-[30rem] xl:w-[42rem] xl:h-[36rem] 2xl:w-[48rem] 2xl:h-[40rem] object-cover rounded-lg shadow-xl scale-110 transition-transform duration-300"
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      scale: 0.8,
                      rotateY: 20,
                      z: -100
                    },
                    visible: {
                      opacity: 1,
                      scale: 1.1,
                      rotateY: 0,
                      z: 0,
                      transition: {
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }
                    },
                    exit: {
                      opacity: 0,
                      scale: 0.9,
                      rotateY: -20,
                      transition: {
                        duration: 0.5
                      }
                    }
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="exit"

                  layoutId={`property-${currentSlide}`}
                />
              </AnimatePresence>
            </motion.div>

            {/* Next Image */}
            <motion.div 
              className="relative"
              variants={sideImageVariants}
            >
              <motion.img
                src={properties[(currentSlide + 1) % properties.length].image}
                alt={properties[(currentSlide + 1) % properties.length].alt}
                className="w-[28rem] h-[24rem] xl:w-[32rem] xl:h-[28rem] 2xl:w-[36rem] 2xl:h-[32rem] object-cover rounded-lg shadow-lg opacity-60"
                layoutId={`property-${(currentSlide + 1) % properties.length}`}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Indicators */}
        <motion.div 
          className="flex justify-center mt-8 space-x-3"
          initial="hidden"
          animate={carouselInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                delay: 0.4,
                staggerChildren: 0.1
              }
            }
          }}
        >
          {properties.map((_, index) => (
            <motion.button
              key={index}
              className={`mt-4 w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-black scale-125 w-4' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir a la propiedad ${index + 1}`}
              variants={{
                hidden: { opacity: 0, scale: 0 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }
              }}

              whileTap={{
                scale: 0.9,
                transition: { duration: 0.1 }
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Properties;