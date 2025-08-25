import Footer from "./components/Footer/Footer"
import { Navbar } from "./components/Navbar/Navbar"
import Hero from "./components/Hero/Hero"
import About from "./components/About/About"
import Properties from "./components/Properties/Properties"
import Stories from "./components/Stories/Stories"
import Contact from "./components/Contact/Contact"
import Destinations from "./components/Destinations/Destinations"
import { StoriesProvider } from "./contexts/StoriesContext"

function App() {

  return (
    <StoriesProvider>
      <Navbar />
      <Hero />
      <About />
      <Stories />
      <Contact />
      <Properties />
      <Destinations />
      <Footer />
    </StoriesProvider>
  )
}

export default App
