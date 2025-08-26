import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMailchimp } from '../../contexts/MailchimpContext';

const CampaignPage = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { setCurrentCampaign, currentCampaignContent, loading } = useMailchimp();
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (campaignId) {
      // Cargar el contenido de la campaña
      setCurrentCampaign(campaignId);
    }
  }, [campaignId]);

  useEffect(() => {
    setContent(currentCampaignContent?.data);
  }, [currentCampaignContent]);

  if (loading.campaignContent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando contenido de la campaña...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl h-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Inicio
              </button>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Campaña</span>
              </div>
            </li>
          </ol>
        </nav>
        {content ? (
          <div>
            {/* Contenido HTML */}
            {content.html && (
              <div className="mb-8">
                <div className="campaign-content-container">
                  <iframe
                    srcDoc={`
                      <!DOCTYPE html>
                      <html>
                      <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <style>
                          body {
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                            line-height: 1.6;
                            color: #374151;
                            margin: 0;
                            padding: 20px;
                            background: white;
                            border: none !important;
                          }
                          img { max-width: 100%; height: auto; }
                          table { width: 100%; border-collapse: collapse; }
                          a { color: #3b82f6; text-decoration: none; }
                          a:hover { text-decoration: underline; }
                          h1, h2, h3, h4, h5, h6 { margin-top: 1.5em; margin-bottom: 0.5em; }
                          p { margin-bottom: 1em; }
                        </style>
                      </head>
                      <body>
                        ${content.html}
                      </body>
                      </html>
                    `}
                    className="w-full h-screen"
                    sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
                    title="Contenido de la campaña"
                  />
                </div>
              </div>
            )}

            {/* Contenido de texto plano como fallback */}
            {!content.html && content.plain_text && (
              <div className="mb-8">
                <div className="whitespace-pre-wrap text-gray-700">
                  {content.plain_text}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            No se pudo cargar el contenido de la campaña
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignPage;