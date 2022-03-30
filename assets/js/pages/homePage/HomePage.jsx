import AOS from 'aos';
import 'aos/dist/aos.css';
import React from 'react';
import Slider from '../../components/slider/Slider';
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
        </>
    );
}
 
export default HomePage;