import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useState, useEffect, useRef } from 'react';
import Slider from '../../components/slider/Slider';
import WhyUs from '../../components/whyUs/WhyUs';
import ScrollButton from '../../components/scrollButton/ScrollButton';
import SpecialsPage from '../../components/specials/SpecialsPage';
import travelsAPI from '../../services/travelsAPI';
import VideosHomePage from '../../components/videos/VideosHomePage';
import "./HomePage.css";

const HomePage = () => {
    AOS.init({
        duration: 1000
    });

    const [travels, setTravels] = useState([]);
    const [display, setDisplay] = useState(false);
    const [search, setSearch] = useState("");
    const titleRef = useRef(null);

    const fetchTravels = async () => {
        try {
            const data = await travelsAPI.findAll();
            setTravels(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTravels();
    }, []);
    
    const filteredTravels = travels.filter(
        (travel) => 
            travel.title.toLowerCase().includes(search.toLowerCase()) ||
            travel.destinations.country.toLowerCase().includes(search.toLowerCase()) ||
            travel.destinations.city.toLowerCase().includes(search.toLowerCase()) ||
            travel.destinations.continent.toLowerCase().includes(search.toLocaleLowerCase())
    );

    // Gestion de la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setDisplay(true);
    }
    
    useEffect(() => {
      if (search === "") {
          setDisplay(false);
      }
    }, [search]);
    

    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
    // onclick scroll to div react
    const scrollToView = () => scrollToRef(titleRef);

    return ( 
        <>
        <VideosHomePage
        handleSearch={handleSearch}
        search={search}
        scrollToView={scrollToView}
        paginatedTravels={filteredTravels}
        display={display}
        />
        {/* <section id="hero">
            <div className="hero-container">
                <Slider/>
            </div>
        </section> */}
        <main ref={titleRef}>
            <WhyUs/>
            <ScrollButton/>
            <SpecialsPage/>
        </main>
        </>
    );
}
 
export default HomePage;