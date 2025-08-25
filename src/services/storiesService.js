/**
 * Servicio para obtener Stories desde Contentful
 * Maneja la comunicación con la API de backend
 */

const API_BASE_URL = 'http://localhost:3000/api/contentful';

// Datos de fallback para cuando el backend no esté disponible
const fallbackStories = [
  {
    id: 'story-1',
    name: 'María González',
    positionJob: 'Compradora de Primera Vivienda',
    backgroundImage: '/assets/images/story-1.jpg',
    videoLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 'story-2',
    name: 'Carlos Rodríguez',
    positionJob: 'Inversionista Inmobiliario',
    backgroundImage: '/assets/images/story-2.jpg',
    videoLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 'story-3',
    name: 'Ana Martínez',
    positionJob: 'Vendedora de Propiedad',
    backgroundImage: '/assets/images/story-3.jpg',
    videoLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 'story-4',
    name: 'Roberto Silva',
    positionJob: 'Comprador Internacional',
    backgroundImage: '/assets/images/story-4.jpg',
    videoLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 'story-5',
    name: 'Laura Fernández',
    positionJob: 'Relocación Familiar',
    backgroundImage: '/assets/images/story-5.jpg',
    videoLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
];

/**
 * Obtiene todas las stories desde el backend
 * @returns {Promise<Array>} Array de stories con campos: name, positionJob, backgroundImage, videoLink
 * @throws {Error} Si hay error en la petición
 */
export const getStories = async () => {
  try {
    // const response = await fetch(`http://localhost:3000/api/contentful/stories`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    // if (!response.ok) {
    //   throw new Error(`Error ${response.status}: ${response.statusText}`);
    // }

    // const { data } = await response.json();


    // // Validar que la respuesta tenga la estructura esperada
    // if (!Array.isArray(data.stories)) {
    //   throw new Error('La respuesta no es un array válido');
    // }

    // // Validar que cada story tenga los campos requeridos
    // const validatedStories = data.stories.map((story, index) => {
    //   if (!story.name || !story.backgroundImage || !story.videoLink) {
    //     console.warn(`Story en índice ${index} no tiene todos los campos requeridos:`, story);
    //   }

    //   return {
    //     id: story.id || `story-${index}`,
    //     name: story.name || 'Sin nombre',
    //     positionJob: story.positionJob || '',
    //     backgroundImage: story.backgroundImage || '',
    //     videoLink: story.videoLink || ''
    //   };
    // });

    // return validatedStories;

    return [
      {
        "id": "Wqf3zLboL7Q21JJw9LKQM",
        "name": "Jalen kyles",
        "positionJob": "Founder of Mediahouse",
        "backgroundImage": "https://images.ctfassets.net/idspblp1qwgn/66DTnX0Pg18g4ETWcKfRYW/d5e6d5f3fe71f758de2d49e95c7b7bb0/happy-young-smiling-confident-professional-business_1173099-13781_1.png",
        "videoLink": "https://www.youtube.com/watch?v=Dr21lqqMpig",
      },
      {
        "id": "7winFcm4nPpweFgrFMUSd1",
        "name": "Jehna Doe",
        "positionJob": "Founder of Mediahouse",
        "backgroundImage": "https://images.ctfassets.net/idspblp1qwgn/66DTnX0Pg18g4ETWcKfRYW/d5e6d5f3fe71f758de2d49e95c7b7bb0/happy-young-smiling-confident-professional-business_1173099-13781_1.png",
        "videoLink": "https://www.youtube.com/watch?v=Dr21lqqMpig",
      },
      {
        "id": "4lbGzZcqBFdms6xSPb7cCU",
        "name": "John Doe",
        "positionJob": "Founder of Mediahouse",
        "backgroundImage": "https://images.ctfassets.net/idspblp1qwgn/7zAdxV81qijP3mmAqpgqJF/f57f937d65a8086852b882e3fdaf21ec/smart-self-confident-business-man_329181-542_1.png",
        "videoLink": "https://www.youtube.com/watch?v=Dr21lqqMpig",
      },
      {
        "id": "1zm4erAgo7VMSWipwdLTvw",
        "name": "Jalen kyle",
        "positionJob": "",
        "backgroundImage": "https://images.ctfassets.net/idspblp1qwgn/4s3sTrxoUb4i5bWWXcMd5f/71502192b364cc56574c8eb66920aa63/waist-up-shot-healthy-happy-caucasian-guy-with-short-haircut_176420-24242_1.png",
        "videoLink": "https://www.youtube.com/watch?v=Dr21lqqMpig",
      }
    ]
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