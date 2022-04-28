import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Slider = () => {
    return ( 
        <Carousel className="slick-slide slick-slider--full-height">
            <Carousel.Item>
                <img 
                    className="d-block w-100 slider-login"
                    src={require('../../media/slider-4.webp')} 
                    alt="First slide" 
                />
                <Carousel.Caption>
                    <div className="slide-text">
                        <h2>Voyages extraordinaires</h2>
                        <h3>Spécialiste du voyage de luxe sur mesure, Luxury Travel crée des itinéraires d'exception</h3>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img 
                    className="d-block w-100 slider-login"
                    src={require('../../media/slider-5.webp')} 
                    alt="First slide" 
                />
                <Carousel.Caption>
                    <div className="slide-text">
                        <h2>Devenez acteur de votre voyage</h2>
                        <h3>Acheter un voyage auprès de Luxury Travel, c'est participer à une logique de protection de l'environnement et des personnes</h3>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img 
                    className="d-block w-100 slider-login"
                    src={require('../../media/slider-6.webp')} 
                    alt="First slide" 
                />
                <Carousel.Caption>
                    <div className="slide-text">
                        <h2>Agence indépendante</h2>
                        <h3>Nous travaillons exclusivement sur mesure et sélectionnons des adresses qui correspondent à notre vision du luxe responsable</h3>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
     );
}
 
export default Slider;
