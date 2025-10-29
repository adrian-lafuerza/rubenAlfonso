import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from './components/BlogCard';
import { useMailchimp } from '../../contexts/MailchimpContext';

const Blog = () => {
  const navigate = useNavigate();
  const { 
    campaigns, 
    loading: mailchimpLoading, 
    error: mailchimpError, 
    fetchCampaigns,
    retryCampaignsFetch 
  } = useMailchimp();
  const [displayedCampaigns, setDisplayedCampaigns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const ITEMS_PER_PAGE = 21;

  // Actualizar campañas mostradas cuando cambien las campañas del contexto
  useEffect(() => {
    console.log('Blog: campaigns updated', { 
      campaignsLength: campaigns?.length, 
      campaigns: campaigns?.slice(0, 3)?.map(c => ({ id: c.id, subject: c.settings?.subject_line })),
      loading: mailchimpLoading.campaigns 
    });
    
    if (campaigns?.length > 0) {
      const itemsToShow = currentPage * ITEMS_PER_PAGE;
      const newDisplayedCampaigns = campaigns.slice(0, itemsToShow);
      setDisplayedCampaigns(newDisplayedCampaigns);
      setHasMore(newDisplayedCampaigns.length < campaigns.length);
    }
  }, [campaigns, currentPage, mailchimpLoading.campaigns]);

  // Función para cargar más campañas (paginación local)
  const loadMoreCampaigns = () => {
    setCurrentPage(prev => prev + 1);
  };

  // Función para manejar el click en una campaña
  const handleCampaignClick = (campaign) => {
    navigate(`/campaign/${campaign.id}`);
  };



  // Función para manejar el botón de cargar más
  const handleLoadMore = () => {
    if (!mailchimpLoading.campaigns && hasMore) {
      loadMoreCampaigns();
    }
  };

  // Función para reintentar la carga
  const handleRetry = () => {
    retryCampaignsFetch();
  };

  if (mailchimpLoading.campaigns && displayedCampaigns.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando campañas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[90%] xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="my-16">
          <h1 className="font-sofia-pro text-5xl text-gray-900 mb-8">
            Ultimas Historias
          </h1>
          <p className="text-gray-600">
            Todo el valor que no queremos que te pierdas
          </p>
        </div>

        {/* Error Message */}
        {mailchimpError.campaigns && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <p className="text-red-600">{mailchimpError.campaigns}</p>
              <button
                onClick={handleRetry}
                className="ml-4 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
              >
                Reintentar
              </button>
            </div>
          </div>
        )}

        {/* Información de paginación */}
        {campaigns.length > 0 && (
          <div className="mb-6 text-sm text-gray-600">
            Mostrando {displayedCampaigns.length} de {campaigns.length} campañas
          </div>
        )}

        {/* Grid de campañas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12">
          {displayedCampaigns.map((campaign) => (
            <BlogCard
              key={campaign.id}
              campaign={campaign}
              onClick={handleCampaignClick}
            />
          ))}
        </div>

        {/* Botón de cargar más */}
        {hasMore && displayedCampaigns.length > 0 && (
          <div className="text-center pt-8">
            <button
              onClick={handleLoadMore}
              disabled={mailchimpLoading.campaigns}
              className="mx-auto cursor-pointer border border-[#0E0E0E] text-[#0E0E0E] font-bold px-4 md:px-6 py-2 rounded text-xs md:text-sm hover:bg-[#0E0E0E] hover:text-white transition-colors flex items-center w-full md:w-auto justify-center md:justify-start disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mailchimpLoading.campaigns ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                  Cargando...
                </div>
              ) : (
                <>
                  <span className="truncate">Cargar más</span>
                  <span className="ml-2">→</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Mensaje si no hay campañas */}
        {!mailchimpLoading.campaigns && displayedCampaigns.length === 0 && !mailchimpError.campaigns && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay campañas disponibles en este momento.</p>
          </div>
        )}

         {/* Botón de acción */}
        <button
          className="cursor-pointer my-16 font-semibold text-[#0E0E0E] border-2 border-[#0E0E0E] px-8 py-3 rounded-md font-medium hover:bg-[#0E0E0E] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          aria-label="Ver todas las campañas del blog"
          onClick={() => window.location.href = `https://www.compracondoespana.com/project/blog`}
        >
          Ver Todas
        </button>
      </div>
    </div>
  );
};

export default Blog;