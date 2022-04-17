import React, { useState } from 'react';
import Carousel from "react-bootstrap/Carousel";
import './CarouselSlider.css';

const CarouselSlider = ({travel}) => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    }
    
    return ( 
        <>
        <Carousel activeIndex={index} onSelect={handleSelect} interval={null} className="slider-page">
            {travel.images.map((image) => (
                <Carousel.Item key={image.id}>
                <img
                className="d-block w-100 slider-travel"
                src={image.fileUrl}
                />
                </Carousel.Item>
            ))}
        </Carousel>
        </>
     );
}
 
export default CarouselSlider;