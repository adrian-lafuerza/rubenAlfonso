import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getStories } from '../services/storiesService';

// Estados del contexto
const STORIES_ACTIONS = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  SET_CURRENT_STORY: 'SET_CURRENT_STORY',
  RESET_ERROR: 'RESET_ERROR'
};

// Estado inicial
const initialState = {
  stories: [],
  currentStory: null,
  loading: false,
  error: null,
  hasLoaded: false
};

// Reducer para manejar el estado
const storiesReducer = (state, action) => {
  switch (action.type) {
    case STORIES_ACTIONS.FETCH_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case STORIES_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        stories: action.payload,
        error: null,
        hasLoaded: true
      };
    
    case STORIES_ACTIONS.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        hasLoaded: true
      };
    
    case STORIES_ACTIONS.SET_CURRENT_STORY:
      return {
        ...state,
        currentStory: action.payload
      };
    
    case STORIES_ACTIONS.RESET_ERROR:
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

// Crear el contexto
const StoriesContext = createContext();

/**
 * Hook personalizado para usar el contexto de Stories
 * @returns {Object} Estado y funciones del contexto
 * @throws {Error} Si se usa fuera del provider
 */
export const useStories = () => {
  const context = useContext(StoriesContext);
  
  if (!context) {
    throw new Error('useStories debe ser usado dentro de StoriesProvider');
  }
  
  return context;
};

/**
 * Provider del contexto de Stories
 * Maneja el estado global de las stories con buenas prácticas
 */
export const StoriesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storiesReducer, initialState);

  // Función para obtener stories
  const fetchStories = async () => {
    dispatch({ type: STORIES_ACTIONS.FETCH_START });
    
    try {
      const stories = await getStories();
      dispatch({ 
        type: STORIES_ACTIONS.FETCH_SUCCESS, 
        payload: stories 
      });
    } catch (error) {
      dispatch({ 
        type: STORIES_ACTIONS.FETCH_ERROR, 
        payload: error.message 
      });
    }
  };

  // Función para establecer la story actual
  const setCurrentStory = (story) => {
    dispatch({ 
      type: STORIES_ACTIONS.SET_CURRENT_STORY, 
      payload: story 
    });
  };

  // Función para limpiar errores
  const resetError = () => {
    dispatch({ type: STORIES_ACTIONS.RESET_ERROR });
  };

  // Función para reintentar la carga
  const retryFetch = () => {
    resetError();
    fetchStories();
  };

  // Cargar stories al montar el componente
  useEffect(() => {
    if (!state.hasLoaded) {
      fetchStories();
    }
  }, [state.hasLoaded]);

  // Valor del contexto
  const contextValue = {
    // Estado
    stories: state.stories,
    currentStory: state.currentStory,
    loading: state.loading,
    error: state.error,
    hasLoaded: state.hasLoaded,
    
    // Funciones
    fetchStories,
    setCurrentStory,
    resetError,
    retryFetch
  };

  return (
    <StoriesContext.Provider value={contextValue}>
      {children}
    </StoriesContext.Provider>
  );
};

export default StoriesContext;