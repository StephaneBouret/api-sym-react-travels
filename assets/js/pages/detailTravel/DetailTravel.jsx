import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import ImageGrid from '../../components/loaders/ImageGrid';
import ScrollButton from '../../components/scrollButton/ScrollButton';
import travelsAPI from '../../services/travelsAPI';
import destinationsAPI from '../../services/destinationsAPI';
import './DetailTravel.css';
import SingleTravelBreadCrumbs from '../../components/singledestinationbreadcrumbs/SingleTravelBreadCrumbs';
import FirstElementTravel from '../../components/firstElementTravel/FirstElementTravel';
import Img1 from '../../../media/constance-lemuria-2.webp';
import SecondElementTravel from '../../components/secondElementTravel/SecondElementTravel';
import CarouselSlider from '../../components/slider/CarouselSlider';

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
        situation: ""
    });
    const [destination, setDestination] = useState([]);
    const [loading, setLoading] = useState(true);
    const titleRef = useRef(null);
    // console.log(travel);

    // jump to section
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
    
    const fetchTravel = async (id) => {
        try {
            const { title, description, type, days, nights, amount, fileUrl, destinations, theMost, capacity, style, hobbies, arroundTrip, situation } = await travelsAPI.find(id);
            setTravel({ title, description, type, days, nights, amount, fileUrl, destinations: destinations.id, theMost, capacity, style, hobbies, arroundTrip, situation });
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
            <section id="carouselElement" className="carouselElement">
                <div className="container">
                    <CarouselSlider/>
                </div>
            </section>
            <SecondElementTravel
            Img1={Img1}
            travel={travel}
            />
            <ScrollButton/>
        </main>
        </>
    );
}
 
export default DetailTravel;