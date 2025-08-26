import { Routes, Route } from 'react-router-dom';
import Footer from "./components/Footer/Footer"
import { Navbar } from "./components/Navbar/Navbar"
import Hero from "./components/Hero/Hero"
import About from "./components/About/About"
import Properties from "./components/Properties/Properties"
import Stories from "./components/Stories/Stories"
import Contact from "./components/Contact/Contact"
import Destinations from "./components/Destinations/Destinations"
import { StoriesProvider } from "./contexts/StoriesContext"
import Blog from "./components/Blog/Blog"
import CampaignPage from "./pages/CampaignPage/CampaignPage"

// Componente para la página principal
const HomePage = () => (
  <>
    <Hero />
    <About />
    <Stories />
    <Contact />
    <Properties />
    <Destinations />
    <Blog/>
  </>
);

function App() {
  return (
    <StoriesProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/campaign/:campaignId" element={<CampaignPage />} />
      </Routes>
      <Footer />
    </StoriesProvider>
  )
}

export default App
