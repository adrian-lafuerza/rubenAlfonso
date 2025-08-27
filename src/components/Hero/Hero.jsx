import { useState } from 'react';
import { motion } from 'framer-motion';
import RubenPhoto from '../../assets/images/ruben-photo.png';
import YoutubeButton from '../../assets/images/youtube-button.svg';
import useScrollReveal from '../../hooks/useScrollReveal';
import useAnimatedCounter from '../../hooks/useAnimatedCounter';
import { 
  slideInVariants, 
  slideInFromRight, 
  slideInFromBottom,
  scaleInVariants,
  containerVariants,
  childVariants,
  hoverVariants,
  counterVariants,
  textRevealVariants
} from '../../utils/motionVariants';

const Hero = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const { ref: heroRef, isInView: heroInView } = useScrollReveal({ threshold: 0.2 });
    const { ref: statsRef, isInView: statsInView } = useScrollReveal({ threshold: 0.3 });
    const { ref: imageRef, isInView: imageInView } = useScrollReveal({ threshold: 0.2 });

    // Animated counters
    const yearsCounter = useAnimatedCounter(20, 2000, statsInView);
    const familiesCounter = useAnimatedCounter(500, 2500, statsInView);
    const clientsCounter = useAnimatedCounter(300, 2200, statsInView);

    const handlePlayVideo = () => {
        setIsVideoPlaying(true);
    };

    return (
        <motion.section
            ref={heroRef}
            className="bg-white min-h-screen flex items-center justify-center max-w-[90%] mx-auto pt-20 md:pt-24"
            aria-label="Sección principal - Rubén Alfonso Real Estate"
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={containerVariants}
        >
            <div className="mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
                    {/* Contenido de texto - Columna izquierda */}
                    <motion.div 
                        className="space-y-6 lg:space-y-8"
                        variants={childVariants}
                    >
                        {/* Título principal */}
                        <motion.header variants={childVariants}>
                            <motion.h1 
                                className="font-sofia-pro text-3xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight"
                                variants={textRevealVariants}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.span 
                                    variants={childVariants}
                                    custom={0}
                                >
                                    La Mejor Decisión De Tu Vida{' '}
                                </motion.span>
                                <motion.span 
                                    className="block"
                                    variants={childVariants}
                                    custom={1}
                                >
                                    Puede Empezar Con Una{' '}
                                </motion.span>
                                <motion.span 
                                    className="block border-b-8 border-[#0E0E0E] inline-block leading-normal"
                                    variants={childVariants}
                                    custom={2}
                                    whileHover={{ 
                                        borderColor: "#3B82F6",
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    Propiedad
                                </motion.span>
                            </motion.h1>
                        </motion.header>

                        {/* Descripción */}
                        <motion.p 
                            className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl"
                            variants={slideInVariants}
                            custom={3}
                        >
                            Asesoro personalmente a compradores e inversores de Latinoamérica y
                            España que quieren proteger su patrimonio comprando en el sur de la
                            Florida o en España.
                        </motion.p>

                        {/* Botones de acción */}
                        <motion.div 
                            className="flex flex-col sm:flex-row gap-4 sm:gap-6"
                            variants={containerVariants}
                        >
                            <motion.button
                                className="cursor-pointer font-semibold text-[#0E0E0E] border-2 border-[#0E0E0E] px-8 py-3 rounded-md font-medium hover:bg-[#0E0E0E] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                aria-label="Información sobre comprar en Miami"
                                variants={childVariants}
                                custom={4}
                                whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.location.href = `https://www.compracondomiami.com/`}
                            >
                                Quiero comprar en Miami
                            </motion.button>
                            <motion.button
                                className="cursor-pointer font-semibold text-[#0E0E0E] border-2 border-[#0E0E0E] px-8 py-3 rounded-md font-medium hover:bg-[#0E0E0E] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                aria-label="Información sobre comprar en España"
                                variants={childVariants}
                                custom={5}
                                whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.location.href = `https://comprando-con-esp-ohta.vercel.app/project`}
                            >
                                Quiero comprar en España
                            </motion.button>
                        </motion.div>

                        {/* Estadísticas */}
                        <motion.div 
                            ref={statsRef}
                            className="grid grid-cols-3 gap-1 pt-4 lg:pt-8"
                            initial="hidden"
                            animate={statsInView ? "visible" : "hidden"}
                            variants={containerVariants}
                        >
                            <motion.div 
                                className="bg-black text-white p-2 sm:p-6 text-center rounded-l-md"
                                variants={counterVariants}
                                custom={0}
                            >
                                <motion.div 
                                    className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                                >
                                    +{yearsCounter} Años
                                </motion.div>
                                <div className="text-xs sm:text-sm text-gray-300 mt-1">
                                    Experiencia
                                </div>
                            </motion.div>
                            <motion.div 
                                className="bg-black text-white p-2 sm:p-6 text-center"
                                variants={counterVariants}
                                custom={1}
                            >
                                <motion.div 
                                    className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                                >
                                    +{familiesCounter}
                                </motion.div>
                                <div className="text-xs sm:text-sm text-gray-300">
                                    Familias Atendidas
                                </div>
                            </motion.div>
                            <motion.div 
                                className="bg-black text-white p-2 sm:p-6 text-center rounded-r-md"
                                variants={counterVariants}
                                custom={2}
                            >
                                <motion.div 
                                    className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                                >
                                    +{clientsCounter}
                                </motion.div>
                                <div className="text-xs sm:text-sm text-gray-300">
                                    Clientes Satisfechos
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Imagen y video - Columna derecha */}
                    <motion.div 
                        ref={imageRef}
                        className="relative flex items-stretch h-full lg:justify-end sm:justify-center"
                        initial="hidden"
                        animate={imageInView ? "visible" : "hidden"}
                        variants={slideInFromRight}
                    >
                        <motion.div 
                            className="max-w-1xl flex flex-col h-full"
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="relative flex-1">
                                {/* Marco negro grueso */}
                                <motion.div 
                                    className="bg-black p-3 md:p-4 rounded-lg h-full flex flex-col"
                                    whileHover={{ 
                                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Imagen container con altura completa */}
                                    <motion.div 
                                        className="flex-1 relative bg-gray-800 overflow-hidden rounded-t-lg"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {!isVideoPlaying ? (
                                            <motion.img
                                                src={RubenPhoto}
                                                alt="Ruben Alvarez"
                                                className="w-full h-full object-cover"
                                                initial={{ scale: 1.1, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.8, ease: "easeOut" }}
                                            />
                                        ) : (
                                            <div className="relative w-full h-full">
                                                <video
                                                    className="w-full h-full object-cover"
                                                    controls
                                                    autoPlay
                                                    onEnded={() => setIsVideoPlaying(false)}
                                                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                                                >
                                                    <source src="/assets/videos/principal.mp4" type="video/mp4" />
                                                    Tu navegador no soporta el elemento de video.
                                                </video>
                                            </div>
                                        )}
                                    </motion.div>

                                    {/* Botón de YouTube posicionado mitad dentro y mitad fuera */}
                                    {!isVideoPlaying && (
                                        <motion.div 
                                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ 
                                                delay: 0.5, 
                                                duration: 0.6, 
                                                ease: "backOut" 
                                            }}
                                        >
                                            <motion.div 
                                                className="cursor-pointer"
                                                onClick={handlePlayVideo}
                                                whileHover={{ 
                                                    scale: 1.1,
                                                    rotate: 5
                                                }}
                                                whileTap={{ scale: 0.9 }}
                                                animate={{
                                                    y: [0, -5, 0],
                                                }}
                                                transition={{
                                                    y: {
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }
                                                }}
                                            >
                                                <img
                                                    src={YoutubeButton}
                                                    alt="Play video"
                                                    className="w-28 h-28"
                                                />
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default Hero;