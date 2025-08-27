/**
 * Utilidades para manejar videos de YouTube
 */

/**
 * Convierte una URL de YouTube a formato embed
 * @param {string} url - URL de YouTube (watch?v= o youtu.be/)
 * @returns {string} URL de embed o null si no es válida
 */
export const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  
  // Expresiones regulares para diferentes formatos de YouTube
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?enablejsapi=1&rel=0&modestbranding=1`;
    }
  }
  
  return null;
};

/**
 * Extrae el ID del video de YouTube de una URL
 * @param {string} url - URL de YouTube
 * @returns {string|null} ID del video o null si no es válida
 */
export const getYouTubeVideoId = (url) => {
  if (!url) return null;
  
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
};

/**
 * Verifica si una URL es de YouTube
 * @param {string} url - URL a verificar
 * @returns {boolean} true si es una URL de YouTube válida
 */
export const isYouTubeUrl = (url) => {
  return getYouTubeVideoId(url) !== null;
};