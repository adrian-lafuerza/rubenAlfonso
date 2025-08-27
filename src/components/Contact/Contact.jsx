import HouseIcon from '../../assets/images/house.svg'
import StarIcon from '../../assets/images/star-icon.svg'

const Contact = () => {
  return (
    <section className="py-16 px-4 bg-gray-100" id="contact">
      <div className="font-sofia-pro max-w-6xl mx-auto text-center">
        {/* Título principal */}
        <h2 className="text-3xl md:text-5xl text-gray-900 mb-4">
          El Camino Hacia Tu Nueva Propiedad
        </h2>
        <h3 className="text-3xl md:text-5xl text-gray-900 mb-8">
          Empieza Aquí
        </h3>

        {/* Subtítulo descriptivo */}
        <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
          Nuestro proceso es simple, transparente y enfocado en resultados.
        </p>

        {/* Pasos del proceso */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 lg:gap-8 mb-16 max-w-3xl mx-auto">
          {/* Paso 1 */}
          <div style={{ boxShadow: '0 10px 60px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(0, 0, 0, 0.07)' }} className="bg-black text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 overflow-hidden flex flex-col lg:flex-row">
            <div className="bg-white p-4 flex items-center justify-center lg:w-auto w-full">
              <div className='bg-black p-3 rounded-lg'>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
            </div>
            <div className="flex-1 p-6">
              <h4 className="text-lg font-bold mb-2 text-start">Paso 1 – Llamada inicial estratégica</h4>
              <p className="text-gray-300 text-sm text-start leading-relaxed">
                Te escuchamos y entendemos tu objetivo: vivir, invertir o ambas cosas.
              </p>
            </div>
          </div>

          {/* Paso 2 */}
          <div style={{ boxShadow: '0 10px 60px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(0, 0, 0, 0.07)' }} className="bg-black text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 overflow-hidden flex flex-col lg:flex-row">
            <div className="bg-white p-4 flex items-center justify-center lg:w-auto w-full">
              <div className='bg-black p-3 rounded-lg'>
                <img className='w-6 h-6' src={HouseIcon} />
              </div>
            </div>
            <div className="flex-1 p-6">
              <h4 className="text-lg font-bold mb-2 text-start">Paso 2 – Te presentamos opciones reales</h4>
              <p className="text-gray-300 text-sm leading-relaxed text-start">
                Filtradas por tu perfil, tu presupuesto y el retorno que esperas.
              </p>
            </div>
          </div>

          {/* Paso 3 */}
          <div style={{ boxShadow: '0 10px 60px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(0, 0, 0, 0.07)' }} className="bg-black text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 overflow-hidden flex flex-col lg:flex-row">
            <div className="bg-white p-4 flex items-center justify-center lg:w-auto w-full">
              <div className='bg-black p-3 rounded-lg'>
                <img className='w-6 h-6' src={StarIcon} />
              </div>
            </div>
            <div className="flex-1 p-6">
              <h4 className="text-lg font-bold mb-2 text-start">Paso 3 – Negociamos y cerramos contigo</h4>
              <p className="text-gray-300 text-sm leading-relaxed text-start">
                Nos encargamos de todo: legal, financiero, fiscal y emocional. Tú solo firmas.
              </p>
            </div>
          </div>
        </div>

        {/* Botón de acción */}
        <button
          className="cursor-pointer font-semibold text-[#0E0E0E] border-2 border-[#0E0E0E] px-8 py-3 rounded-md font-medium hover:bg-[#0E0E0E] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          aria-label="Información sobre comprar en Miami"
          onClick={() => window.location.href = `https://comprando-con-esp-ohta.vercel.app/project`}
        >
          Ver Proyectos
        </button>
      </div>
    </section>
  );
};

export default Contact;