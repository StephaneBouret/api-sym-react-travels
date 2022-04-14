import React from 'react';
import { FaRegEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './SingleDestinationBreadCrumbs.css';

const SingleTravelBreadCrumbs = ({ linkFirst, destination, mailto, travel }) => {
    return ( 
        <>
        <section className="single-breadcrumbs">
            <div className="container">
                <div className="col-md-12 wrap-breadcrumb">
                    <div className="block-breadcrumbs">
                        <ol>
                        <li><Link to={linkFirst}>Accueil</Link></li>
                            <li className="separator"> &gt; </li>
                            <li><Link to={"/destinations"}>Destinations</Link></li>
                            <li className="separator"> &gt; </li>
                            <li className="name-continent"><Link to={"/destinations/" + destination.slug + "/continent"} className="text-uppercase">{destination.continent}</Link></li>
                            <li className="separator"> &gt; </li>
                            <li className="name-continent"><Link to={"/destinations/" + destination.id}>{destination.country}</Link></li>
                            <li className="separator"> &gt; </li>
                            <li className="name-continent">{travel.title}</li>
                        </ol>
                    </div>
                    <div className="fa-contact">
                        <Link
                        to={{}}
                        onClick={(e) => {
                            window.location.href = mailto;
                            e.preventDefault();
                        }}
                        >
                        Nous Contacter
                        <FaRegEnvelope className='envelope' />
                        </Link>
                    </div>
                </div>

            </div>
        </section>
        </>
    );
}
 
export default SingleTravelBreadCrumbs;