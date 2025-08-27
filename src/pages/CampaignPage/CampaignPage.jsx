import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMailchimp } from '../../contexts/MailchimpContext';
import RubenPhoto from '../../assets/images/ruben-photo.png';
import {
  slideInFromTop,
  slideInFromBottom,
  slideInFromLeft,
  slideInFromRight,
  fadeInVariants,
  scaleInVariants,
  containerVariants,
  childVariants,
  hoverVariants
} from '../../utils/motionVariants';

const CampaignPage = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { setCurrentCampaign, currentCampaign, loading } = useMailchimp();

  useEffect(() => {
    if (campaignId) {
      setCurrentCampaign(campaignId);
    }
  }, [campaignId, setCurrentCampaign]);

  // Scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [campaignId]);

  if (loading.campaigns || !currentCampaign) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando campaña...</p>
        </div>
      </div>
    );
  }

  // Obtener datos de la campaña
  const campaignTitle = currentCampaign.settings?.subject_line || currentCampaign.subject_line || 'Sin título';
  const campaignPreview = currentCampaign.settings?.preview_text || currentCampaign.preview_text || '';
  const campaignImages = currentCampaign.images || [];
  const campaignDescriptions = currentCampaign.descriptions || [];
  const sendTime = currentCampaign.send_time ? new Date(currentCampaign.send_time).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : null;
  const fromName = currentCampaign.settings?.from_name || currentCampaign.from_name || 'Ruben Alfonso';
  
  // Imagen principal (primera imagen disponible)
  const mainImage = campaignImages.length > 0 ? campaignImages[0] : null;

  return (
    <motion.div 
      className="min-h-screen bg-white mb-18"
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      {/* Header con botón de compartir */}
      <motion.div 
        className="bg-white border-b border-gray-200"
        initial="hidden"
        animate="visible"
        variants={slideInFromTop}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.button
              onClick={() => navigate('/')}
              className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors"
              variants={hoverVariants}
              whileHover="hover"
              whileTap="tap"
            >
              ← Volver
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Contenido principal */}
      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Título principal */}
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center"
          variants={slideInFromBottom}
        >
          {campaignTitle}
        </motion.h1>

        {/* Información del autor y fecha */}
        <motion.div 
          className="flex items-center justify-center mb-8 text-sm text-gray-600"
          variants={childVariants}
        >
          <div className="flex items-center">
            <motion.img 
              src={RubenPhoto}
              alt="Ruben Alfonso" 
              className="w-18 h-18 rounded-full mr-3 object-cover border border-gray-700"
              variants={scaleInVariants}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />

            <span className="text-lg">Ruben Alfonso</span>
          </div>
          {sendTime && (
            <>
              <span className="mx-2">•</span>
              <span>{sendTime}</span>
            </>
          )}
        </motion.div>

        {/* Imagen principal */}
        {mainImage && (
          <motion.div 
            className="mb-8"
            variants={slideInFromLeft}
          >
            <motion.img
              src={currentCampaign.images.length > 1 ? currentCampaign.images[2].url : currentCampaign.images[1].url}
              alt={mainImage.alt || campaignTitle}
              className="w-full h-auto rounded-lg shadow-lg"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </motion.div>
        )}

        {/* Contenido del artículo */}
        <motion.div 
          className="prose prose-lg max-w-none"
          variants={childVariants}
        >
          {/* Preview text como introducción */}
          {campaignPreview && (
            <motion.div 
              className="text-xl text-gray-700 mb-8 leading-relaxed font-light"
              variants={slideInFromRight}
            >
              {campaignPreview}
            </motion.div>
          )}

          {/* Descripciones de la campaña */}
          {campaignDescriptions.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {campaignDescriptions
                .filter((description) => {
                  const text = typeof description === 'string' ? description : description.text || '';
                  return !text.toLowerCase().includes('view email in browser') && 
                         !text.toLowerCase().includes('update your preferences');
                })
                .map((description, index) => (
                  <motion.div 
                    key={index} 
                    className="mb-6"
                    variants={childVariants}
                    custom={index}
                  >
                    <p className="text-gray-800 leading-relaxed text-lg">
                      {typeof description === 'string' ? description : description.text || ''}
                    </p>
                  </motion.div>
                ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-gray-700 leading-relaxed text-lg"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.p className="mb-6" variants={childVariants}>
                En los últimos años, Miami ha dejado de ser solo un destino turístico para
                convertirse en una meca de capitales internacionales. Desde empresarios
                latinoamericanos buscando estabilidad, hasta fondos europeos diversificando
                portafolios, todos convergen en algo: Miami ofrece una combinación única de
                seguridad jurídica, beneficios fiscales, infraestructura moderna y calidad de vida.
              </motion.p>
              <motion.p className="mb-6" variants={childVariants}>
                Esta transformación no es casualidad. La ciudad ha implementado políticas
                estratégicas que la posicionan como un hub financiero global, atrayendo
                inversiones que superan los miles de millones de dólares anuales.
              </motion.p>
              <motion.p className="mb-6" variants={childVariants}>
                Para los inversionistas inmobiliarios, esto representa una oportunidad
                excepcional. El mercado residencial de lujo continúa en expansión,
                impulsado por la demanda internacional y la escasez de inventario en
                ubicaciones premium.
              </motion.p>
            </motion.div>
          )}

          {/* Galería de imágenes adicionales */}
          {campaignImages.length > 1 && (
            <motion.div 
              className="mt-12"
              variants={slideInFromBottom}
            >
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {campaignImages.slice(1, 5).map((image, index) => (
                  <motion.div 
                    key={index} 
                    className=""
                    variants={childVariants}
                    custom={index}
                  >
                    <motion.img
                      src={image.url}
                      alt={image.alt || `Imagen ${index + 2}`}
                      className="w-full h-64 object-cover rounded-lg shadow-md"
                      whileHover={{ 
                        scale: 1.05, 
                        y: -10,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                      }}
                      transition={{ duration: 0.3 }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CampaignPage;