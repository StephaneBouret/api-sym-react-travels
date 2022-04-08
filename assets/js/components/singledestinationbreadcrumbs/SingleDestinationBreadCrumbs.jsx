import React from 'react';
import { FaRegEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './SingleDestinationBreadCrumbs.css';

const SingleDestinationBreadCrumbs = ({ linkFirst, continent, country, mailto, travel }) => {
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
                            <li className="name-continent"><Link to={"/destinations/" + continent + "/continent"} className="text-uppercase">{continent}</Link></li>
                            <li className="separator"> &gt; </li>
                            <li className="title-country">{country}</li>
                        </ol>
                        <span>({travel.length} {travel.length > 1 ? "voyages" : "voyage"})</span>
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
 
export default SingleDestinationBreadCrumbs;