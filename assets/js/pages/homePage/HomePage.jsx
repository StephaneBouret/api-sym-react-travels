import AOS from 'aos';
import 'aos/dist/aos.css';
import React from 'react';
import Slider from '../../components/slider/Slider';
import WhyUs from '../../components/whyUs/WhyUs';
import ScrollButton from '../../components/scrollButton/ScrollButton';
import SpecialsPage from '../../components/specials/SpecialsPage';
import "./HomePage.css";

const HomePage = () => {
    AOS.init({
        duration: 1000
    });

    return ( 
        <>
        <section id="hero">
            <div className="hero-container">
                <Slider/>
            </div>
        </section>
        <main>
            <WhyUs/>
            <ScrollButton/>
            <SpecialsPage/>
        </main>
        </>
    );
}
 
export default HomePage;