const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

export const mailchimpService = {
  /**
   * Obtener todas las campañas de Mailchimp
   * @param {Object} params - Parámetros de filtrado
   * @param {string} params.status - Estado de la campaña ('sent', 'draft', 'scheduled', etc.)
   * @param {string} params.type - Tipo de campaña ('regular', 'plaintext', 'absplit', etc.)
   * @param {number} params.count - Número de campañas a obtener (máximo 1000)
   * @param {number} params.offset - Número de campañas a omitir
   * @returns {Promise<Object>} Respuesta de la API con las campañas
   */
  async getCampaigns(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Parámetros por defecto
      const defaultParams = {
        status: 'sent', // Solo campañas enviadas por defecto
        count: 6, // Obtener más campañas para el caché
        offset: 0,
        ...params
      };

      // Agregar parámetros a la URL
      Object.entries(defaultParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value);
        }
      });

      const response = await fetch(`${API_BASE_URL}/mailchimp/campaigns?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      // El backend devuelve {success: true, data: {campaigns: [...], total_items: ...}}
      return result;
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  },

  /**
   * Obtener una campaña específica por ID
   * @param {string} campaignId - ID de la campaña
   * @returns {Promise<Object>} Datos de la campaña
   */
  async getCampaignById(campaignId) {
    try {
      const response = await fetch(`${API_BASE_URL}/mailchimp/campaigns/${campaignId}`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching campaign:', error);
      throw error;
    }
  },



  /**
   * Obtener estadísticas de una campaña específica
   * @param {string} campaignId - ID de la campaña
   * @returns {Promise<Object>} Estadísticas de la campaña
   */
  async getCampaignStats(campaignId) {
    try {
      const response = await fetch(`${API_BASE_URL}/mailchimp/campaigns/${campaignId}/reports`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching campaign stats:', error);
      // Retornar estadísticas por defecto en caso de error
      return {
        success: true,
        data: {
          opens: 0,
          clicks: 0,
          open_rate: 0,
          click_rate: 0,
          emails_sent: 0
        }
      };
    }
  },

  /**
   * Transformar datos de campaña para el frontend
   * @param {Object} campaign - Datos de campaña de la API
   * @returns {Object} Datos transformados para el frontend
   */
  transformCampaign(campaign) {
    return {
      id: campaign.id,
      title: campaign.settings?.title || campaign.title || 'Sin título',
      subject: campaign.settings?.subject_line || campaign.subject_line || 'Sin asunto',
      preview: campaign.settings?.preview_text || campaign.preview_text || '',
      status: campaign.status,
      type: campaign.type,
      createTime: campaign.create_time ? new Date(campaign.create_time) : null,
      sendTime: campaign.send_time ? new Date(campaign.send_time) : null,
      emailsSent: campaign.emails_sent || 0,
      opens: campaign.report_summary?.opens || 0,
      clicks: campaign.report_summary?.clicks || 0,
      openRate: campaign.report_summary?.open_rate || 0,
      clickRate: campaign.report_summary?.click_rate || 0,
      webId: campaign.web_id,
      archiveUrl: campaign.archive_url,
      longArchiveUrl: campaign.long_archive_url,
      // Nuevos campos del controlador actualizado
      images: campaign.images || [],
      descriptions: campaign.descriptions || [],
      thumbnail: campaign.images && campaign.images.length > 0 ? campaign.images[0] : null,
      from_name: campaign.from_name,
      reply_to: campaign.reply_to
    };
  },
};

export default mailchimpService;