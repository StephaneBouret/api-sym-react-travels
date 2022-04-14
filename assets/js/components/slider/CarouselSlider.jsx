import React, { useState } from 'react';
import Carousel from "react-bootstrap/Carousel";
import './CarouselSlider.css';
import Img1 from "../../../media/carousel/constance-lemuria-3.jpg";
import Img2 from "../../../media/carousel/constance-lemuria-4.jpg";
import Img3 from "../../../media/carousel/constance-lemuria-5.jpg";
import Img4 from "../../../media/carousel/constance-lemuria-6.jpg";
import Img5 from "../../../media/carousel/constance-lemuria-7.jpg";

const CarouselSlider = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    }
    
    return ( 
        <>
        <Carousel activeIndex={index} onSelect={handleSelect} interval={null} className="slider-page">
            <Carousel.Item>
            <img
            className="d-block w-100 slider-travel"
            src={Img1}
            alt="First slide"
            />
            </Carousel.Item>
            <Carousel.Item>
            <img
            className="d-block w-100 slider-travel"
            src={Img2}
            alt="First slide"
            />
            </Carousel.Item>
            <Carousel.Item>
            <img
            className="d-block w-100 slider-travel"
            src={Img3}
            alt="First slide"
            />
            </Carousel.Item>
            <Carousel.Item>
            <img
            className="d-block w-100 slider-travel"
            src={Img4}
            alt="First slide"
            />
            </Carousel.Item>
            <Carousel.Item>
            <img
            className="d-block w-100 slider-travel"
            src={Img5}
            alt="First slide"
            />
            </Carousel.Item>
        </Carousel>
        </>
     );
}
 
export default CarouselSlider;