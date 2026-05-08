import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import AboutMe from '../components/AboutMe';
import Technologies from '../components/Technologies';


function Home() {
    return (
        <div>
            <Header />
            <NavBar />
            <AboutMe />
            <Cards />
            <Skills />
            <Technologies />
            <Contact />
            <Footer />
        </div>
    )
}

export default Home;