import { motion } from 'framer-motion';
import RubenPhoto2 from '../../assets/images/ruben-photo-2.png';
import FacebookIcon from '../../assets/images/facebook-icon.svg';
import InstagramIcon from '../../assets/images/instagram-icon.svg';
import LinkedInIcon from '../../assets/images/linkedin-icon.svg';
import XIcon from '../../assets/images/x-icon.svg'
import YoutubeIcon from '../../assets/images/youtube-icon.svg'
import WhatsappIcon from '../../assets/images/whatsapp-icon.svg'
import useScrollReveal from '../../hooks/useScrollReveal';
import {
  slideInVariants,
  slideInFromRight,
  containerVariants,
  childVariants,
} from '../../utils/motionVariants';

const About = () => {
  const { ref: aboutRef, isInView: aboutInView } = useScrollReveal({ threshold: 0.2 });
  const { ref: imageRef, isInView: imageInView } = useScrollReveal({ threshold: 0.3 });
  const { ref: contentRef, isInView: contentInView } = useScrollReveal({ threshold: 0.2 });

  const socialIconVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  const textLineVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  return (
    <div className="relative">
      {/* Fondo gris cortado de atrás */}
      <motion.div
        className="absolute inset-0 h-full w-full overflow-hidden z-0"
        initial={{ opacity: 0, y: 20 }}
        animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-32 bg-gray-100"
        />
      </motion.div>

      <motion.section
        ref={aboutRef}
        className="bg-[#0E0E0E] text-white py-12 md:py-16 lg:py-20 xl:py-24  xl:max-w-[90%] lg:max-w-[90%] md:max-w-[100%] sm:max-w-[100%] mx-auto rounded-xl relative z-10"
        style={{ boxShadow: '0 50px 60px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(0, 0, 0, 0.07)' }}
        initial="hidden"
        animate={aboutInView ? "visible" : "hidden"}
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
        <div className="px-8">
          <div className="grid grid-cols-1 md::grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Columna izquierda - Imagen */}
            <motion.div
              ref={imageRef}
              className="flex justify-center"
              initial="hidden"
              animate={imageInView ? "visible" : "hidden"}
              variants={slideInVariants}
            >
              <motion.div
                className="relative"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="bg-white p-6 rounded-lg shadow-2xl relative"
                  whileHover={{
                    boxShadow: "0 25px 50px rgba(255,255,255,0.1)",
                    scale: 1.02
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img
                    src={RubenPhoto2}
                    alt="Rubén Alfonso"
                    className="w-full h-auto rounded-lg object-cover"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                  {/* Iconos de redes sociales */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center bg-[#0E0E0E] space-x-2 py-4 px-6 rounded-t-md lg:w-full md:w-full sm:w-full xl:w-[70%] w-full"
                    initial="hidden"
                    animate={imageInView ? "visible" : "hidden"}
                    variants={containerVariants}
                  >
                    {[
                      {
                        href: "https://www.facebook.com/wwwrubenalfonsocom/?_rdr",
                        icon: FacebookIcon,
                        label: "Síguenos en Facebook - Rubén Alfonso Real Estate",
                        title: "Facebook - Propiedades en Miami y España",
                        alt: "Facebook - Rubén Alfonso Real Estate"
                      },
                      {
                        href: "https://x.com/RUBENALFONSOG",
                        icon: XIcon,
                        label: "Siguenos en X - Comprando con España",
                        title: "X - Inversiones inmobiliarias Miami-España",
                        alt: "X - Comprando con España"
                      },
                      {
                        href: "https://www.instagram.com/comprandoconespana/",
                        icon: InstagramIcon,
                        label: "Síguenos en Instagram - Comprando con España",
                        title: "Instagram - Inversiones inmobiliarias Miami-España",
                        alt: "Instagram - Comprando con España"
                      },
                      {
                        href: "https://www.youtube.com/@RUBENALFONSOREALTOR",
                        icon: YoutubeIcon,
                        label: "Ver canal en YouTube - Rubén Alfonso",
                        title: "YouTube - Inversiones inmobiliarias Miami-España",
                        alt: "YouTube - Comprando con España"
                      },
                      {
                        href: "https://www.linkedin.com/in/ruben-alfonso-7143334/",
                        icon: LinkedInIcon,
                        label: "Conéctate en LinkedIn - Rubén Alfonso",
                        title: "LinkedIn - Perfil profesional inmobiliario",
                        alt: "LinkedIn - Rubén Alfonso"
                      },
                      {
                        href: "https://wa.me/17862282670",
                        icon: WhatsappIcon,
                        label: "Conéctate en WhatsApp - Rubén Alfonso",
                        title: "WhatsApp - Inversiones inmobiliarias Miami-España",
                        alt: "WhatsApp - Comprando con España"
                      },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        title={social.title}
                        rel="noopener noreferrer"
                        className="lg:p-2 sm:p-4 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 transform group"
                        aria-label={social.label}
                        variants={socialIconVariants}
                        custom={index}
                        whileHover={{
                          scale: 1.2,
                          y: -5,
                          boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <img
                          src={social.icon}
                          alt={social.alt}
                          className="w-8 h-8 group-hover:filter group-hover:brightness-0 transition-all duration-300"
                        />
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Columna derecha - Contenido */}
            <motion.div
              ref={contentRef}
              className="flex flex-col justify-center items-start lg:max-w-[85%] md:max-w-[100%] sm:max-w-[100%]"
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
              variants={slideInFromRight}
            >
              <motion.div
                className="flex items-center space-x-3"
                variants={childVariants}
              >
                <motion.h2
                  className="font-sofia-pro text-4xl sm:text-4xl lg:text-6xl hover:text-blue-500 transition-colors duration-300"
                  variants={textLineVariants}
                  custom={0}
                  whileHover={{
                    scale: 1.02
                  }}
                  transition={{ duration: 0.3 }}
                >
                  🎓 Experiencia real para inversiones reales
                </motion.h2>
              </motion.div>

              <motion.div
                className="flex flex-col gap-6 text-gray-300"
                variants={containerVariants}
              >
                {[
                  "Soy Rubén Alfonso, abogado de formación y asesor inmobiliario con más de 20 años de experiencia. He ayudado a cientos de familias e inversores a encontrar propiedades seguras, con alto potencial y sin dolores de cabeza legales.",
                  "Mi equipo y yo te guiamos paso a paso en el proceso de compra, ya sea en Miami o en España.",
                  "Trabajamos con compradores exigentes que buscan profesionalismo, estrategia y resultados.",
                  "Licenciado en Derecho – USM (Venezuela)",
                  "Agente certificado en Florida desde 2004",
                  "Especialista en fondos EB5, preconstrucción y subastas",
                  "Alianza estratégica con el equipo hispano más grande de Florida"
                ].map((text, index) => (
                  <motion.p
                    key={index}
                    className="text-lg leading-relaxed mt-6 hover:text-gray-300 transition-colors duration-200"
                    variants={textLineVariants}
                    custom={index + 1}
                    whileHover={{
                      x: 10
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {text}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;