import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import FirstElementTravel from '../../components/firstElementTravel/FirstElementTravel';
import ImageGrid from '../../components/loaders/ImageGrid';
import Maps from '../../components/Maps';
import ScrollButton from '../../components/scrollButton/ScrollButton';
import SecondElementTravel from '../../components/secondElementTravel/SecondElementTravel';
import SingleTravelBreadCrumbs from '../../components/singledestinationbreadcrumbs/SingleTravelBreadCrumbs';
import CarouselSlider from '../../components/slider/CarouselSlider';
import SocialShare from '../../components/socialshare/SocialShare';
import destinationsAPI from '../../services/destinationsAPI';
import travelsAPI from '../../services/travelsAPI';
import './DetailTravel.css';

const DetailTravel = () => {
    const { id } = useParams();
    const [travel, setTravel] = useState({
        title: "",
        description: "",
        type: "",
        days: "",
        nights: "",
        amount: "",
        fileUrl: "",
        destinations: "",
        theMost: "",
        capacity: "",
        style: "",
        hobbies: "",
        arroundTrip: "",
        situation: "",
        images: [],
        lat: 0,
        lng: 0
    });
    const [destination, setDestination] = useState([]);
    const [loading, setLoading] = useState(true);
    const titleRef = useRef(null);

    // jump to section
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
    
    const fetchTravel = async (id) => {
        try {
            const { title, description, type, days, nights, amount, fileUrl, destinations, theMost, capacity, style, hobbies, arroundTrip, situation, images, lat, lng } = await travelsAPI.find(id);
            setTravel({ title, description, type, days, nights, amount, fileUrl, destinations: destinations.id, theMost, capacity, style, hobbies, arroundTrip, situation, images, lat, lng });
        } catch (error) {
            toast.error("Le voyage n'a pas pu être chargé");
        }
    }

    const fetchDestinationByTravel = async (id) => {
        try {
            const data = await destinationsAPI.find(id);
            setDestination(data);
            setLoading(false);
        } catch (error) {
            toast.error("Le voyage n'a pas pu être chargé");
        }
    }

    useEffect(() => {
      fetchTravel(id);
    }, [id]);
    
    useEffect(() => {
      fetchDestinationByTravel(travel.destinations);
    }, [travel]);
    
    
    // onclick scroll to div react
    const scrollToView = () => scrollToRef(titleRef);

    return ( 
        <>
        {loading && <ImageGrid />}
        <section id="page-travel" className="single-travel position-relative">
            <img src={travel.fileUrl} className="img-single-travel img-fluid" />
            <div className="title-single-travel">
                <h2>{travel.title}</h2>
            </div>
            <Link to={{}} className="inspire-btn scrollButton" onClick={scrollToView}></Link>
        </section>
        <main className="main-single-travel">
            <SingleTravelBreadCrumbs
            linkFirst={"/"}
            destination={destination}
            travel={travel}
            mailto={"mailto:contact@luxury-travel.com"}
            />
            <FirstElementTravel
            titleRef={titleRef}
            travel={travel}
            />
            {travel.images.length > 0 && (
            <section id="carouselElement" className="carouselElement">
                <div className="container">
                    <CarouselSlider
                    travel={travel}
                    />
                </div>
            </section>
            )}
            <SecondElementTravel
            travel={travel}
            />
            <Maps
            travel={travel}
            />
            <SocialShare
            id={id}
            />
            <ScrollButton/>
        </main>
        </>
    );
}
 
export default DetailTravel;