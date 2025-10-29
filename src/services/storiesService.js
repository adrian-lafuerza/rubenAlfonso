/**
 * Servicio para obtener Stories desde Contentful
 * Maneja la comunicación con la API de backend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Datos de fallback para cuando el backend no esté disponible
const fallbackStories = [
  {
    id: 'story-1',
    name: 'María González',
    positionJob: 'Compradora de Primera Vivienda',
    backgroundImage: '',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    videoDetails: null,
    videoLink: ''
  },
  {
    id: 'story-2',
    name: 'Carlos Rodríguez',
    positionJob: 'Inversionista Inmobiliario',
    backgroundImage: '/assets/images/story-2.jpg',
    video: '',
    videoDetails: null,
    videoLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 'story-3',
    name: 'Ana Martínez',
    positionJob: 'Vendedora de Propiedad',
    backgroundImage: '',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    videoDetails: null,
    videoLink: ''
  },
  {
    id: 'story-4',
    name: 'Roberto Silva',
    positionJob: 'Comprador Internacional',
    backgroundImage: '/assets/images/story-4.jpg',
    video: '',
    videoDetails: null,
    videoLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 'story-5',
    name: 'Laura Fernández',
    positionJob: 'Relocación Familiar',
    backgroundImage: '',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    videoDetails: null,
    videoLink: ''
  }
];

/**
 * Obtiene todas las stories desde el backend
 * @returns {Promise<Array>} Array de stories con campos: name, positionJob, backgroundImage, videoLink
 * @throws {Error} Si hay error en la petición
 */
export const getStories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contentful/stories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response);
    

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const { data } = await response.json();


    // Validar que la respuesta tenga la estructura esperada
    if (!Array.isArray(data.stories)) {
      throw new Error('La respuesta no es un array válido');
    }

    // Validar que cada story tenga los campos requeridos
    const validatedStories = data.stories.map((story, index) => {

      return {
        id: story.id || `story-${index}`,
        name: story.name || 'Sin nombre',
        positionJob: story.positionJob || '',
        backgroundImage: story.backgroundImage || '',
        video: story.video || '',
        videoDetails: story.videoDetails || null,
        videoLink: story.videoLink || ''
      };
    });

    return validatedStories;

  } catch (error) {
    console.warn('Backend no disponible, usando datos de fallback:', error.message);
    // Retornar datos de fallback en lugar de lanzar error
    return fallbackStories;
  }
};

/**
 * Obtiene una story específica por ID
 * @param {string} id - ID de la story
 * @returns {Promise<Object>} Story específica
 * @throws {Error} Si hay error en la petición o no se encuentra la story
 */
export const getStoryById = async (id) => {
  try {
    const stories = await getStories();
    const story = stories.find(s => s.id === id);

    if (!story) {
      throw new Error(`Story con ID ${id} no encontrada`);
    }

    return story;
  } catch (error) {
    console.error(`Error al obtener story ${id}:`, error);
    throw error;
  }
};