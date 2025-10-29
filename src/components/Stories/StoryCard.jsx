import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PlayIcon from '../../assets/images/Play.svg';
import useScrollReveal from '../../hooks/useScrollReveal';
import { getYouTubeEmbedUrl, isYouTubeUrl } from '../../utils/youtubeUtils';

/**
 * Componente de card individual para cada story
 */
const StoryCard = ({ story, onClick, visibleItems, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false); // Nuevo estado para controlar si ya se reprodujo una vez
  const iframeRef = useRef(null);
  const videoRef = useRef(null);
  const { ref: cardRef, isInView: cardInView } = useScrollReveal({ threshold: 0.3 });

  // Debug: Log de la story para ver qué datos llegan
  console.log('StoryCard - Datos de la story:', story);
  console.log('StoryCard - Video URL:', story.video);
  console.log('StoryCard - Background Image:', story.backgroundImage);

  // Determinar si es un video MP4 de Contentful o una imagen con video de YouTube
  const isContentfulVideo = story.video && !story.backgroundImage;
  const hasBackgroundImage = story.backgroundImage && !story.video;
  const hasYouTubeVideo = story.videoLink && isYouTubeUrl(story.videoLink);

  console.log('StoryCard - isContentfulVideo:', isContentfulVideo);
  console.log('StoryCard - hasBackgroundImage:', hasBackgroundImage);
  console.log('StoryCard - hasYouTubeVideo:', hasYouTubeVideo);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleVideoLoad = () => {
    console.log('Video cargado exitosamente');
    setVideoLoaded(true);
  };

  const handleVideoError = (error) => {
    console.error('Error al cargar el video:', error);
    console.error('Video URL que falló:', story.video);
  };

  const handleVideoClick = () => {
    console.log('handleVideoClick ejecutado');
    console.log('isContentfulVideo:', isContentfulVideo);
    console.log('videoRef.current:', videoRef.current);
    
    // Marcar que el video ya se reprodujo una vez
    setHasPlayedOnce(true);
    
    if (isContentfulVideo) {
      // Para videos MP4 de Contentful, reproducir directamente
      setShowVideo(true);
      if (videoRef.current) {
        console.log('Intentando reproducir video...');
        videoRef.current.muted = false; // Activar sonido al hacer click
        videoRef.current.play().then(() => {
          console.log('Video reproduciéndose exitosamente');
          setVideoPlaying(true);
        }).catch((error) => {
          console.error('Error al reproducir video:', error);
        });
      } else {
        console.error('videoRef.current es null');
      }
    } else if (hasYouTubeVideo) {
      // Para videos de YouTube
      setShowVideo(true);
    } else {
      // Fallback
      onClick(story);
    }
  };

  const handleVideoStateChange = (event) => {
    // YouTube Player API states:
    // -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
    // Solo cambiar el estado si no se ha reproducido antes (para mostrar/ocultar el botón inicial)
    if (!hasPlayedOnce) {
      if (event.data === 1) {
        setVideoPlaying(true);
      } else {
        setVideoPlaying(false);
      }
    }
  };

  // Manejar eventos del video MP4 nativo
  const handleNativeVideoPlay = () => {
    // Solo cambiar el estado si no se ha reproducido antes
    if (!hasPlayedOnce) {
      setVideoPlaying(true);
    }
  };

  const handleNativeVideoPause = () => {
    // Solo cambiar el estado si no se ha reproducido antes
    if (!hasPlayedOnce) {
      setVideoPlaying(false);
    }
  };

  const handleNativeVideoEnded = () => {
    // Solo cambiar el estado si no se ha reproducido antes
    if (!hasPlayedOnce) {
      setVideoPlaying(false);
    }
  };

  // Configurar la comunicación con YouTube API
  useEffect(() => {
    if (showVideo && iframeRef.current && hasYouTubeVideo) {
      const handleMessage = (event) => {
        if (event.origin !== 'https://www.youtube.com') return;

        try {
          const data = JSON.parse(event.data);
          if (data.event === 'video-progress' && data.info) {
            // El video está reproduciéndose
            if (data.info.playerState === 1) {
              setVideoPlaying(true);
            } else {
              setVideoPlaying(false);
            }
          }
        } catch (e) {
          // Ignorar errores de parsing
        }
      };

      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, [showVideo, hasYouTubeVideo]);

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
      key={story.id}
      className="relative rounded-3xl overflow-hidden group flex-shrink-0 bg-gray-100"
      variants={cardVariants}
      initial="hidden"
      animate={cardInView ? "visible" : "hidden"}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
    >
      {/* Contenido principal */}
      <div className="relative w-full h-[660px] xl:h-[600px]">
        <AnimatePresence >
          {/* Loading spinner para videos MP4 */}
          {isContentfulVideo && !videoLoaded && (
            <motion.div
              key="video-loading-spinner"
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

          {/* Loading spinner para imágenes */}
          {hasBackgroundImage && !imageLoaded && (
            <motion.div
              key="image-loading-spinner"
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

          {/* Video MP4 de Contentful */}
          {isContentfulVideo && (
            <motion.video
              key="contentful-video"
              ref={videoRef}
              src={story.video}
              className="w-full h-full object-cover"
              controls={showVideo}
              muted={true}
              loop
              playsInline
              autoPlay={false}
              preload="auto"
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
              onPlay={handleNativeVideoPlay}
              onPause={handleNativeVideoPause}
              onEnded={handleNativeVideoEnded}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ display: 'block', visibility: 'visible' }}
            />
          )}

          {/* Iframe de YouTube */}
          {showVideo && hasYouTubeVideo && (
            <motion.div
              key="youtube-video"
              className="absolute inset-0 z-10 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <iframe
                ref={iframeRef}
                src={`${getYouTubeEmbedUrl(story.videoLink)}&autoplay=1`}
                title={`Video de ${story.name}`}
                className="w-full h-[600px]"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={() => setVideoPlaying(true)}
              />
              {/* Botón para cerrar el video de YouTube */}
              <motion.button
                onClick={() => {
                  setShowVideo(false);
                  setVideoPlaying(false);
                }}
                className="absolute top-4 right-4 z-20 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Imagen de fondo (solo cuando hay backgroundImage) */}
        {hasBackgroundImage && (
          <>
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
          </>
        )}

        {/* Información de la story y botón de play en la parte inferior */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 ${visibleItems === 1 ? 'p-4' : 'p-6'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            {/* Nombre y posición (solo si existe) */}
            {story.name && story.name.trim() !== '' && story.name !== 'Sin nombre' && (
              <motion.div
                className="w-max" // Ajusta el ancho al contenido
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.4 } }
                }}
                initial="hidden"
                animate={cardInView ? "visible" : "hidden"}
              >
                <h3 className={`font-bold text-white drop-shadow-lg ${visibleItems === 1 ? 'text-lg' : 'text-xl'
                  }`}>
                  {story.name}
                </h3>
                {story.positionJob && (
                  <p className="text-white text-sm opacity-90 drop-shadow-lg">
                    {story.positionJob}
                  </p>
                )}
              </motion.div>
            )}
            
            {/* Botón de play - aparece solo una vez al inicio */}
            <AnimatePresence>
              {!hasPlayedOnce && !videoPlaying && (isContentfulVideo || hasYouTubeVideo) && (
                <motion.div
                  key="play-button"
                  className="flex items-end"
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
                  exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
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
                    onClick={handleVideoClick}
                    className="cursor-pointer p-2 bg-transparent transition-all duration-300"
                  >
                    <motion.img
                      src={PlayIcon}
                      alt="Play"
                      className={`filter brightness-0 transition-transform duration-300 ${visibleItems === 1 ? 'w-8 h-8' : 'w-10 h-10'
                        }`}
                      whileHover={{
                        scale: 1.25,
                        transition: { duration: 0.2 }
                      }}
                    />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StoryCard;