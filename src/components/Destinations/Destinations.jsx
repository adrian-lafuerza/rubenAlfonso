import React from 'react';
import { motion } from 'framer-motion';
import RubenPhoto from '../../assets/images/ruben-photo.png';
import YoutubeButton from '../../assets/images/youtube-button.svg';
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
  parallaxVariants
} from '../../utils/motionVariants';

const Destinations = () => {
  const { ref: headerRef, isInView: headerInView } = useScrollReveal({ threshold: 0.2 });
  const { ref: spainRef, isInView: spainInView } = useScrollReveal({ threshold: 0.3 });
  const { ref: miamiRef, isInView: miamiInView } = useScrollReveal({ threshold: 0.3 });
  const { ref: spainVideoRef, isInView: spainVideoInView } = useScrollReveal({ threshold: 0.4 });
  const { ref: miamiVideoRef, isInView: miamiVideoInView } = useScrollReveal({ threshold: 0.4 });

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateY: -15,
      z: -100
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
    }
  };

  const textStaggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const benefitVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  return (
    <motion.section 
      className="bg-gray-100" 
      aria-label="Destinos de inversión"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        ref={headerRef}
        className="text-center mb-12"
        initial="hidden"
        animate={headerInView ? "visible" : "hidden"}
        variants={slideInFromBottom}
      >
        <motion.div 
          className="flex items-center justify-center mb-4"
          variants={childVariants}
        >
          <motion.span 
            className="text-2xl mr-2" 
            role="img" 
            aria-label="Ubicación"
            whileHover={{ 
              scale: 1.2,
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.5 }
            }}
          >
            📍
          </motion.span>
          <motion.h2 
            className="text-2xl md:text-4xl font-bold text-gray-900 hover:text-gray-800 transition-colors duration-300"
            variants={childVariants}
            whileHover={{ 
              scale: 1.02
            }}
          >
            ¿Dónde quieres comprar?
          </motion.h2>
        </motion.div>
        <motion.p 
          className="md:text-lg md:text-md text-gray-600 max-w-3xl mx-auto hover:text-gray-700 transition-colors duration-300"
          variants={childVariants}
          whileHover={{ 
            scale: 1.01
          }}
        >
          Ya sea en el vibrante sur de Florida o bajo el sol del Mediterráneo, estoy listo para ayudarte a tomar la mejor decisión inmobiliaria.
        </motion.p>
      </motion.div>

      <div className="">
        {/* Spain Section */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] lg:min-h-[500px]"
          initial="hidden"
          animate={spainInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Spain Image */}
          <motion.div 
            className='relative'
            variants={slideInFromLeft}
          >
            <motion.img 
              className='w-full h-full object-cover opacity-80' 
              src='./assets/images/background-2.png'
              whileHover={{ 
                scale: 1.05,
                opacity: 0.9
              }}
              transition={{ duration: 0.6 }}
            />
            {/* Video Card */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                ref={spainVideoRef}
                className="lg:w-[576px] lg:h-[650px] sm:w-50 sm:h-64 md:w-64 md:h-80"
                initial="hidden"
                animate={spainVideoInView ? "visible" : "hidden"}
                variants={cardVariants}
                style={{ perspective: 1000 }}
              >
                <motion.div 
                  className="relative h-full"
                  whileHover={{ 
                    rotateY: 5,
                    rotateX: 5,
                    scale: 1.02,
                    z: 50
                  }}
                  transition={{ duration: 0.4 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div 
                    className="bg-black p-3 md:p-4 rounded-lg h-full flex flex-col"
                    whileHover={{
                      boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
                    }}
                  >
                    <div className="flex-1 relative bg-gray-800 overflow-hidden">
                      <motion.img
                        src={RubenPhoto}
                        alt="Ruben Alvarez"
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                      <motion.div 
                        className="cursor-pointer"
                        whileHover={{ 
                          scale: 1.2,
                          rotate: [0, -5, 5, 0],
                          y: -5
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={YoutubeButton}
                          alt="Play video"
                          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Spain Content */}
          <motion.div 
            ref={spainRef}
            className='bg-black flex items-start justify-center lg:p-18 px-6 py-18'
            variants={slideInFromRight}
          >
            <motion.div 
              className="text-white"
              variants={textStaggerVariants}
            >
              <motion.h3 
                className="text-5xl md:text-5xl font-bold mb-6 hover:text-yellow-300 transition-colors duration-300"
                variants={textItemVariants}
                whileHover={{ 
                  scale: 1.05,
                  textShadow: "0 0 20px rgba(252, 211, 77, 0.5)"
                }}
              >
                ESPAÑA
              </motion.h3>
              <motion.h4 
                className="text-xl mb-4 font-semibold"
                variants={textItemVariants}
              >
                🏡 ¿Por qué comprar en España?
              </motion.h4>
              <motion.p 
                className="text-lg mb-4 font-bold"
                variants={textItemVariants}
              >
                Estilo de vida, inversión segura y oportunidades únicas en el corazón de Europa.
              </motion.p>
              <motion.p 
                className="text-lg mb-4"
                variants={textItemVariants}
              >
                Comprar una propiedad en España no es solo adquirir una vivienda: es invertir en calidad de vida. España ofrece un equilibrio inigualable entre clima, gastronomía, cultura y seguridad, lo que la convierte en uno de los destinos más atractivos para compradores e inversores de todo...
              </motion.p>
              <motion.p 
                className="text-lg mb-4"
                variants={textItemVariants}
              >
                Además, el mercado inmobiliario español sigue ofreciendo oportunidades con alta proyección de revalorización, especialmente en zonas como Madrid, la Costa Blanca o la Costa del Sol, donde la demanda tanto nacional como extranjera se mantiene sólida.
              </motion.p>
              <motion.h4 
                className="text-xl mb-4 font-semibold"
                variants={textItemVariants}
              >
                Ventajas de comprar en España:
              </motion.h4>
              <motion.div 
                className='space-y-2 text-sm md:text-base ml-2 mb-4'
                variants={containerVariants}
              >
                {[
                  "• 🏖️ Clima mediterráneo con más de 300 días de sol al año.",
                  "• 🏙️ Madrid: epicentro económico y cultural, ideal para inversión urbana.",
                  "• 🏡 Costa del Sol y Costa Blanca: destinos vacacionales con alta rentabilidad en alquiler turístico.",
                  "• 📈 Mercado estable y seguro, con oportunidades desde retornos del 7%.",
                  "• 🛂 Posibilidad de acceder a la Golden Visa por inversión.",
                  "• 🇪🇸 Beneficios fiscales y derechos garantizados como comprador extranjero."
                ].map((benefit, index) => (
                  <motion.p 
                    key={index}
                    className="hover:text-gray-100 transition-colors duration-200"
                    variants={benefitVariants}
                    custom={index}
                    whileHover={{ 
                      x: 10,
                      scale: 1.02
                    }}
                  >
                    {benefit}
                  </motion.p>
                ))}
              </motion.div>
              <motion.p 
                className="text-lg mb-8"
                variants={textItemVariants}
              >
                Como abogado y asesor especializado, Rubén Alfonso te acompaña durante todo el proceso: desde la elección de la zona hasta la firma de escritura, con total transparencia, respaldo legal y orientación financiera.
              </motion.p>
              <motion.button
                className="cursor-pointer font-semibold text-white border-2 border-white mt-8 px-8 py-3 rounded-md font-medium hover:bg-white hover:text-[#0E0E0E] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                aria-label="Información sobre comprar en Spain"
                variants={textItemVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(255,255,255,0.2)",
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Proyectos
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Miami Section */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] lg:min-h-[500px]"
          initial="hidden"
          animate={miamiInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Miami Content - Aparece segundo en móvil, primero en desktop */}
          <motion.div 
            ref={miamiRef}
            className='bg-black flex items-start justify-center  lg:p-18 px-6 py-18 order-2 lg:order-1 '
            variants={slideInFromLeft}
          >
            <motion.div 
              className="text-white"
              variants={textStaggerVariants}
            >
              <motion.h3 
                className="text-5xl md:text-5xl font-bold my-6 hover:text-cyan-400 transition-colors duration-300"
                variants={textItemVariants}
                whileHover={{ 
                  scale: 1.05,
                  textShadow: "0 0 20px rgba(6, 182, 212, 0.5)"
                }}
              >
                MIAMI
              </motion.h3>
              <motion.h4 
                className="text-xl mb-4 font-semibold"
                variants={textItemVariants}
              >
                🏡 ¿Por qué comprar en Miami?
              </motion.h4>
              <motion.p 
                className="text-lg mb-4 font-bold"
                variants={textItemVariants}
              >
                Acceso directo al mercado inmobiliario más dinámico de EE.UU.
              </motion.p>
              <motion.p 
                className="text-lg mb-4"
                variants={textItemVariants}
              >
                Miami no es solo una ciudad: es una puerta de entrada estratégica al mercado norteamericano, ideal tanto para vivir como para invertir. Su crecimiento económico sostenido, su atractivo fiscal y su multiculturalidad la posicionan como uno de los destinos más rentables y seguros par...
              </motion.p>
              <motion.p 
                className="text-lg mb-4"
                variants={textItemVariants}
              >
                Ya sea que busques una residencia personal, una segunda vivienda o un activo para generar ingresos pasivos, Miami ofrece propiedades con alto potencial de revalorización y una demanda constante tanto en el sector de lujo como en el mercado de inversión.
              </motion.p>
              <motion.h4 
                className="text-xl mb-4 font-semibold"
                variants={textItemVariants}
              >
                Ventajas de comprar en Miami:
              </motion.h4>
              <motion.div 
                className='space-y-2 text-sm md:text-base ml-2 mb-4'
                variants={containerVariants}
              >
                {[
                  "• 🌇 Crecimiento constante en zonas clave como Brickell, Wynwood o Doral.",
                  "• 💼 Estabilidad jurídica y seguridad en la inversión.",
                  "• 🛃 Trato favorable a inversores internacionales.",
                  "• 💵 Posibilidad de rentas en dólares con alto retorno.",
                  "• 🧾 Sin impuestos estatales sobre la renta.",
                  "• ✈️ Conectividad directa con América Latina y Europa."
                ].map((benefit, index) => (
                  <motion.p 
                    key={index}
                    className="hover:text-gray-100 transition-colors duration-200"
                    variants={benefitVariants}
                    custom={index}
                    whileHover={{ 
                      x: 10,
                      scale: 1.02
                    }}
                  >
                    {benefit}
                  </motion.p>
                ))}
              </motion.div>
              <motion.p 
                className="text-lg mb-8"
                variants={textItemVariants}
              >
                Rubén Alfonso no solo te ayuda a encontrar la propiedad adecuada, sino que te asesora en aspectos legales, fiscales y migratorios, incluyendo opciones como el visado EB5, fideicomisos y estructuras de inversión optimizadas.
              </motion.p>
              <motion.button
                className="cursor-pointer font-semibold text-white border-2 border-white mt-8 px-8 py-3 rounded-md font-medium hover:bg-white hover:text-[#0E0E0E] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                aria-label="Información sobre comprar en Miami"
                variants={textItemVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(255,255,255,0.2)",
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Proyectos
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Miami Image - Aparece primero en móvil, segundo en desktop */}
          <motion.div 
            className='relative order-1 lg:order-2'
            variants={slideInFromRight}
          >
            <motion.img 
              className='w-full h-full object-cover opacity-80' 
              src='./assets/images/background-1.png'
              whileHover={{ 
                scale: 1.05,
                opacity: 0.9
              }}
              transition={{ duration: 0.6 }}
            />
            {/* Video Card */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                ref={miamiVideoRef}
                className="lg:w-[576px] lg:h-[650px] sm:w-50 sm:h-64 md:w-64 md:h-80"
                initial="hidden"
                animate={miamiVideoInView ? "visible" : "hidden"}
                variants={cardVariants}
                style={{ perspective: 1000 }}
              >
                <motion.div 
                  className="relative h-full"
                  whileHover={{ 
                    rotateY: -5,
                    rotateX: 5,
                    scale: 1.02,
                    z: 50
                  }}
                  transition={{ duration: 0.4 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div 
                    className="bg-black p-3 md:p-4 rounded-lg h-full flex flex-col"
                    whileHover={{
                      boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
                    }}
                  >
                    <div className="flex-1 relative bg-gray-800 overflow-hidden">
                      <motion.img
                        src={RubenPhoto}
                        alt="Ruben Alvarez"
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                      <motion.div 
                        className="cursor-pointer"
                        whileHover={{ 
                          scale: 1.2,
                          rotate: [0, -5, 5, 0],
                          y: -5
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={YoutubeButton}
                          alt="Play video"
                          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Destinations;