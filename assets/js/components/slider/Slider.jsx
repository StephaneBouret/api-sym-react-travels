import React from 'react';
import Carousel from "react-bootstrap/Carousel";
import "./animate.css";
import "./Slider.css";

const Slider = () => {
    return ( 
        <Carousel className="slick-slide slick-slider--full-height">
            <Carousel.Item>
                <img 
                className="d-block w-100 slider-login"
                src={require('../../../media/slider-1.jpg')} 
                alt="First slide" 
                />
                <Carousel.Caption>
                    <div className="slide-text">
                        <h2 className="animate__animated animate__fadeInDown"><span>Luxury</span> Travel</h2>
                        <p className="animate__animated animate__fadeInUp">Spécialiste des voyages de luxe et des voyages sur mesure</p>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img 
                className="d-block w-100 slider-login"
                src={require('../../../media/slider-2.jpg')} 
                alt="Second slide" 
                />
                <Carousel.Caption>
                    <div className="slide-text">
                        <h2 className="animate__animated animate__fadeInDown"><span>Luxury</span> Travel</h2>
                        <p className="animate__animated animate__fadeInUp">L'ouverture des pays se poursuit ! Où et quand partir ?</p>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img 
                className="d-block w-100 slider-login"
                src={require('../../../media/slider-3.jpg')} 
                alt="Third slide" 
                />
                <Carousel.Caption>
                    <div className="slide-text">
                        <h2 className="animate__animated animate__fadeInDown"><span>Luxury</span> Travel</h2>
                        <p className="animate__animated animate__fadeInUp">Un voyage, une rencontre</p>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
     );
}
 
export default Slider;