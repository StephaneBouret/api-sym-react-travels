import React, { useEffect, useRef, useState } from 'react';
import { BiLink, BiPlus } from "react-icons/bi";
import Lightbox from 'react-image-lightbox';
import Masonry from "react-masonry-component";
import { Link, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import ImageGrid from '../../components/loaders/ImageGrid';
import ScrollButton from '../../components/scrollButton/ScrollButton';
import destinationsAPI from '../../services/destinationsAPI';
import './TravelByDestination.css';

const TravelByDestination = () => {
    const { id } = useParams();

    const titleRef = useRef();
    const [destination, setDestination] = useState({});
    const [filtredTravel, setFiltredTravel] = useState(null);
    const [filterKey, setFilterKey] = useState('all');
    const [images, setImages] = useState([]);
    const [imagesIndex, setImagesIndex] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [travels, setTravels] = useState([]);
    const [travelType, setTravelType] = useState([]);

    const fetchDestination = async (id) => {
        try {
            const { country, fileUrl } = await destinationsAPI.find(id);
            setDestination({ country, fileUrl });
            setLoading(false);
            
        } catch (error) {
            toast.error("La destination n'a pas pu être chargée");
        }
    }

    const fetchTravelsByDestination = async (id) => {
        try {
            const data = await destinationsAPI.getTravelsbyDestination(id);
            setTravels(data);
            setFiltredTravel(data);
            const imagesTravels = data.map(obj => obj.fileUrl);
            setImages(imagesTravels);
            const typesTravels = data.map(obj => obj.type);
            setTravelType(typesTravels);
        } catch (error) {
            toast.error("Les voyages n'ont pas pu être chargés");
        }
    }

    useEffect(() => {
        fetchDestination(id);
        fetchTravelsByDestination(id);
    }, [id]);

    function filteredTravels(travelType) {
        let filtredTravel = travels.filter(travel => travel.type === travelType);
        return filtredTravel;
    }   
    
    const handleTravel = typeTravel => () => {
        titleRef.current.scrollIntoView({ behavior: "smooth" });
        setFilterKey(typeTravel);
        typeTravel !== "all"
            ? setFiltredTravel(filteredTravels(typeTravel))
            : setFiltredTravel(travels);
    }

    const masonryOptions = {
        transitionDuration: '0.8s'
    };
    
    return ( 
        <>
        <main>
            {loading && <ImageGrid />}
            <section id="travel-by-destination" className="travel-by-destination position-relative">
                <img src={destination.fileUrl} className="img-destinations img-fluid pos-img" />
                <div className="title-destinations">
                    <h2>{destination.country}</h2>
                </div>
            </section>
            <section className="portfolio-travels">
                <div className="container">
                    <div className="section-title">
                        <h2>Nos voyages</h2>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 d-flex justify-content-center">
                            <ul id='portfolio-flters'>
                                <li onClick={handleTravel("all")} className={filterKey === "all" ? "filter-active" : ""}>Tous</li>
                                {travelType === "Croisières" && (
                                    <li onClick={handleTravel("Croisières")} className={filterKey === "Croisières" ? "filter-active" : ""}>Croisières</li>
                                )}
                                {travelType.includes("Hotels") && (
                                    <li onClick={handleTravel("Hotels")} className={filterKey === "Hotels" ? "filter-active" : ""}>Hôtels</li>
                                )}
                                {travelType.includes("Locations") && (
                                    <li onClick={handleTravel("Locations")} className={filterKey === "Locations" ? "filter-active" : ""}>Locations</li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="row portfolio-container d-flex justify-content-between" ref={titleRef}>
                        <Masonry
                        elementType={'ul'}
                        className={'media'}
                        options={masonryOptions}
                        >
                            {filtredTravel && filtredTravel.map((type, index) => (
                                <li key={type.id} className={"col-lg-4 col-md-6 portfolio-item filter-item filter-" + type.type}>
                                    <div className="portfolio-wrap">
                                        <img src={type.fileUrl} className="img-fluid" />
                                        <div className="portfolio-info">
                                            <h4>{type.title}</h4>
                                            <p>{type.type}</p>
                                            <div className="portfolio-links">
                                                <Link
                                                to={"/travel/" + type.id}
                                                >
                                                <BiLink/>
                                                </Link>
                                                <Link
                                                to={{}}
                                                onClick={() => {
                                                    setIsOpen(true); 
                                                    setImagesIndex(index);
                                                }}
                                                >
                                                {isOpen && (
                                                    <Lightbox
                                                    mainSrc={images[imagesIndex]}
                                                    onCloseRequest={() => {
                                                        setIsOpen(false);
                                                    }}
                                                    />
                                                )}
                                                <BiPlus/>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </Masonry>
                    </div>
                </div>
            </section>
            <ScrollButton/>
        </main>
        </>
    );
}
 
export default TravelByDestination;