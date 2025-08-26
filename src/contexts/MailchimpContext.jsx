import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import mailchimpService from '../services/mailchimpService';

// Estados del contexto
const MAILCHIMP_ACTIONS = {
  FETCH_CAMPAIGNS_START: 'FETCH_CAMPAIGNS_START',
  FETCH_CAMPAIGNS_SUCCESS: 'FETCH_CAMPAIGNS_SUCCESS',
  FETCH_CAMPAIGNS_ERROR: 'FETCH_CAMPAIGNS_ERROR',
  FETCH_CAMPAIGN_CONTENT_START: 'FETCH_CAMPAIGN_CONTENT_START',
  FETCH_CAMPAIGN_CONTENT_SUCCESS: 'FETCH_CAMPAIGN_CONTENT_SUCCESS',
  FETCH_CAMPAIGN_CONTENT_ERROR: 'FETCH_CAMPAIGN_CONTENT_ERROR',
  FETCH_CAMPAIGN_STATS_START: 'FETCH_CAMPAIGN_STATS_START',
  FETCH_CAMPAIGN_STATS_SUCCESS: 'FETCH_CAMPAIGN_STATS_SUCCESS',
  FETCH_CAMPAIGN_STATS_ERROR: 'FETCH_CAMPAIGN_STATS_ERROR',
  SET_CURRENT_CAMPAIGN: 'SET_CURRENT_CAMPAIGN',
  RESET_ERROR: 'RESET_ERROR'
};

// Estado inicial
const initialState = {
  campaigns: [],
  currentCampaign: null,
  currentCampaignContent: null,
  currentCampaignStats: null,
  loading: {
    campaigns: false,
    content: false,
    stats: false
  },
  error: {
    campaigns: null,
    content: null,
    stats: null
  },
  hasLoaded: {
    campaigns: false,
    content: false,
    stats: false
  }
};

// Reducer para manejar el estado
const mailchimpReducer = (state, action) => {
  switch (action.type) {
    case MAILCHIMP_ACTIONS.FETCH_CAMPAIGNS_START:
      return {
        ...state,
        loading: { ...state.loading, campaigns: true },
        error: { ...state.error, campaigns: null }
      };
    
    case MAILCHIMP_ACTIONS.FETCH_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, campaigns: false },
        campaigns: action.payload?.data?.campaigns || [],
        error: { ...state.error, campaigns: null },
        hasLoaded: { ...state.hasLoaded, campaigns: true }
      };
    
    case MAILCHIMP_ACTIONS.FETCH_CAMPAIGNS_ERROR:
      return {
        ...state,
        loading: { ...state.loading, campaigns: false },
        error: { ...state.error, campaigns: action.payload },
        hasLoaded: { ...state.hasLoaded, campaigns: true }
      };
    
    case MAILCHIMP_ACTIONS.FETCH_CAMPAIGN_CONTENT_START:
      return {
        ...state,
        loading: { ...state.loading, content: true },
        error: { ...state.error, content: null }
      };
    
    case MAILCHIMP_ACTIONS.FETCH_CAMPAIGN_CONTENT_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, content: false },
        currentCampaignContent: action.payload,
        error: { ...state.error, content: null },
        hasLoaded: { ...state.hasLoaded, content: true }
      };
    
    case MAILCHIMP_ACTIONS.FETCH_CAMPAIGN_CONTENT_ERROR:
      return {
        ...state,
        loading: { ...state.loading, content: false },
        error: { ...state.error, content: action.payload },
        hasLoaded: { ...state.hasLoaded, content: true }
      };
    
    case MAILCHIMP_ACTIONS.FETCH_CAMPAIGN_STATS_START:
      return {
        ...state,
        loading: { ...state.loading, stats: true },
        error: { ...state.error, stats: null }
      };
    
    case MAILCHIMP_ACTIONS.FETCH_CAMPAIGN_STATS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, stats: false },
        currentCampaignStats: action.payload,
        error: { ...state.error, stats: null },
        hasLoaded: { ...state.hasLoaded, stats: true }
      };
    
    case MAILCHIMP_ACTIONS.FETCH_CAMPAIGN_STATS_ERROR:
      return {
        ...state,
        loading: { ...state.loading, stats: false },
        error: { ...state.error, stats: action.payload },
        hasLoaded: { ...state.hasLoaded, stats: true }
      };
    
    case MAILCHIMP_ACTIONS.SET_CURRENT_CAMPAIGN:
      return {
        ...state,
        currentCampaign: action.payload,
        // Limpiar contenido y stats cuando se cambia de campaña
        currentCampaignContent: null,
        currentCampaignStats: null,
        hasLoaded: { 
          ...state.hasLoaded, 
          content: false, 
          stats: false 
        }
      };
    
    case MAILCHIMP_ACTIONS.RESET_ERROR:
      return {
        ...state,
        error: {
          campaigns: null,
          content: null,
          stats: null
        }
      };
    
    default:
      return state;
  }
};

// Crear el contexto
const MailchimpContext = createContext();

/**
 * Hook personalizado para usar el contexto de Mailchimp
 * @returns {Object} Estado y funciones del contexto
 * @throws {Error} Si se usa fuera del provider
 */
export const useMailchimp = () => {
  const context = useContext(MailchimpContext);
  
  if (!context) {
    throw new Error('useMailchimp debe ser usado dentro de MailchimpProvider');
  }
  
  return context;
};

/**
 * Provider del contexto de Mailchimp
 * Maneja el estado global de las campañas con buenas prácticas
 */
export const MailchimpProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mailchimpReducer, initialState);

  // Función para obtener campañas
  const fetchCampaigns = useCallback(async () => {
    dispatch({ type: MAILCHIMP_ACTIONS.FETCH_CAMPAIGNS_START });
    
    try {
      const campaigns = await mailchimpService.getCampaigns();
      dispatch({ 
        type: MAILCHIMP_ACTIONS.FETCH_CAMPAIGNS_SUCCESS, 
        payload: campaigns 
      });
    } catch (error) {
      dispatch({ 
        type: MAILCHIMP_ACTIONS.FETCH_CAMPAIGNS_ERROR, 
        payload: error.message 
      });
    }
  }, []);

  // Función para obtener contenido de una campaña
  const fetchCampaignContent = useCallback(async (campaignId) => {
    dispatch({ type: MAILCHIMP_ACTIONS.FETCH_CAMPAIGN_CONTENT_START });
    
    try {
      const content = await mailchimpService.getCampaignContent(campaignId);
      dispatch({ 
        type: MAILCHIMP_ACTIONS.FETCH_CAMPAIGN_CONTENT_SUCCESS, 
        payload: content 
      });
    } catch (error) {
      dispatch({ 
        type: MAILCHIMP_ACTIONS.FETCH_CAMPAIGN_CONTENT_ERROR, 
        payload: error.message 
      });
    }
  }, []);

  // Función para obtener estadísticas de una campaña
  const fetchCampaignStats = useCallback(async (campaignId) => {
    dispatch({ type: MAILCHIMP_ACTIONS.FETCH_CAMPAIGN_STATS_START });
    
    try {
      const stats = await mailchimpService.getCampaignById(campaignId);
      dispatch({ 
        type: MAILCHIMP_ACTIONS.FETCH_CAMPAIGN_STATS_SUCCESS, 
        payload: stats 
      });
    } catch (error) {
      dispatch({ 
        type: MAILCHIMP_ACTIONS.FETCH_CAMPAIGN_STATS_ERROR, 
        payload: error.message 
      });
    }
  }, []);

  // Función para obtener una campaña por ID
  const getCampaignById = (campaignId) => {
    return state.campaigns.find(campaign => campaign.id === campaignId);
  };

  // Función para establecer la campaña actual
  const setCurrentCampaign = useCallback(async (campaignId) => {
    console.log('setCurrentCampaign called with:', campaignId);
    console.log('Current campaigns in context:', state.campaigns.length);
    
    try {
      let campaign = getCampaignById(campaignId);
      console.log('Campaign found locally:', !!campaign);
      
      // Si no se encuentra en el array local, buscar en el servicio
      if (!campaign) {
        console.log('Campaña no encontrada localmente, buscando en el servicio:', campaignId);
        campaign = await mailchimpService.getCampaignById(campaignId);
        console.log('Campaign fetched from service:', !!campaign);
      }
      
      if (campaign) {
        console.log('Setting current campaign:', campaign.id);
        dispatch({ 
          type: MAILCHIMP_ACTIONS.SET_CURRENT_CAMPAIGN, 
          payload: campaign 
        });
        
        console.log('Loading campaign content and stats...');
        // Cargar automáticamente el contenido y estadísticas
        await Promise.all([
          fetchCampaignContent(campaignId),
          fetchCampaignStats(campaignId)
        ]);
        console.log('Content and stats loaded successfully');
      } else {
        console.error('Campaña no encontrada:', campaignId);
      }
    } catch (error) {
      console.error('Error al establecer campaña actual:', error);
    }
  }, [state.campaigns]);

  // Función para limpiar errores
  const resetError = () => {
    dispatch({ type: MAILCHIMP_ACTIONS.RESET_ERROR });
  };

  // Función para reintentar la carga de campañas
  const retryCampaignsFetch = () => {
    resetError();
    fetchCampaigns();
  };

  // Función para reintentar la carga de contenido
  const retryContentFetch = (campaignId) => {
    resetError();
    fetchCampaignContent(campaignId);
  };

  // Función para reintentar la carga de estadísticas
  const retryStatsFetch = (campaignId) => {
    resetError();
    fetchCampaignStats(campaignId);
  };

  // Cargar campañas al montar el componente
  useEffect(() => {
    if (!state.hasLoaded.campaigns) {
      fetchCampaigns();
    }
  }, [state.hasLoaded.campaigns]);

  // Valor del contexto
  const contextValue = {
    // Estado
    campaigns: state.campaigns,
    currentCampaign: state.currentCampaign,
    currentCampaignContent: state.currentCampaignContent,
    currentCampaignStats: state.currentCampaignStats,
    loading: state.loading,
    error: state.error,
    hasLoaded: state.hasLoaded,
    
    // Funciones
    fetchCampaigns,
    fetchCampaignContent,
    fetchCampaignStats,
    setCurrentCampaign,
    resetError,
    retryCampaignsFetch,
    retryContentFetch,
    retryStatsFetch
  };

  return (
    <MailchimpContext.Provider value={contextValue}>
      {children}
    </MailchimpContext.Provider>
  );
};

export default MailchimpContext;