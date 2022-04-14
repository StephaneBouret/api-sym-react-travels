import React, { useState, useEffect } from 'react';
import destinationsAPI from '../../services/destinationsAPI';
import { Link, useParams } from "react-router-dom";
import ImageGrid from '../../components/loaders/ImageGrid';
import { toast } from 'react-toastify';
import './DetailDestination.css';
import { SiYourtraveldottv } from "react-icons/si";
import NumberFormat from 'react-number-format';
import ScrollButton from '../../components/scrollButton/ScrollButton';

const DetailDestination = () => {
    const { id } = useParams();
    const [destination, setDestination] = useState({
        title: "",
        description: "",
        country: "",
        city: "",
        continent: "",
        population: "",
        currency: "",
        filePath: "",
        travel: ""
    });
    const [display, setDisplay] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchDestination = async (id) => {
        try {
            const { title, description, country, city, continent, population, currency, filePath, travel } = await destinationsAPI.find(id);
            setDestination({ title, description, country, city, continent, population, currency, filePath, travel });
            setLoading(false);
        } catch (error) {
            toast.error("La destination n'a pas pu être chargée");
        }
    };

    useEffect(() => {
        fetchDestination(id);
    }, [id]);

    const backgroundImage = {
        backgroundImage: `url(${destination.fileUrl})`,
    };

    return ( 
        <>
        <main id='main'>
            {loading && <ImageGrid />}
            <section className="detail-destination">
                <div className="inner-slide" style={backgroundImage}>
                    <div className="container">
                        <h2 className="title-slide">{destination.country}</h2>
                    </div>
                </div>
            </section>
            <section id="featured" className="featured">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="destination-box">
                                <SiYourtraveldottv/>
                                <div className="h1_wrapper">
                                    <h1>{destination.title}</h1>
                                </div>
                                <div className="editable-description">
                                    {!display && (
                                    <div className="short">
                                    {destination.description.split("\n", 5).map((i,key) => {
                                        return <p key={key}>{i}</p>;
                                    })}
                                    </div>                                      
                                    )}
                                    {display && (
                                    <div className="long">
                                    {destination.description.split("\n").map((i,key) => {
                                        return <p key={key}>{i}</p>;
                                    })}
                                    </div>
                                    )}
                                    {!display && (
                                    <div className="button-wrapper">
                                        <button className="btn" type="button" onClick={() => setDisplay(true)}>En savoir plus</button>
                                    </div>
                                    )}
                                </div>
                                <div className="country-infos">
                                    <span>Continent : <strong>{destination.continent}</strong></span>
                                    <span>Capitale : <strong>{destination.city}</strong></span>
                                    <span>Devise : <strong>{destination.currency}</strong></span>
                                    <span>Population : <strong><NumberFormat value={destination.population} thousandSeparator={true} displayType="text"/></strong></span>
                                </div>
                                <div className="mt-5" style={{display: destination.travel.length > 0 ? 'block' : 'none'}}>
                                    <Link
                                    to={"/destination/" + id + "/travel"}
                                    className="btn login-btn mb-3"
                                    >
                                    voir les voyages
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ScrollButton/>
        </main>
        </> 
    );
}
 
export default DetailDestination;