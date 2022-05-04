import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaRegEnvelope, FaFacebookSquare, FaLinkedin, FaInstagram } from "react-icons/fa";
import continentsAPI from '../../services/continentsAPI';
import "./Footer.css";

const Footer = () => {
    const [continents, setContinents] = useState([]);

    const fetchContinents = async () => {
        try {
            const data = await continentsAPI.findAll();
            setContinents(data);
        } catch (error) {
            toast.error("Impossible de charger les continents");
        }
    };

    useEffect(() => {
      fetchContinents();
    }, []);  

    return ( 
        <>
        <footer>
            <div className="container">
                <div className="footer-bloc">
                    <div className="row">
                        <div className="footer-box footer-box-1 col-md-3 col-sm-6 col-12">
                            <div className="logo-footer">
                                <h1><Link to={"/"}>Luxury Travel</Link></h1>
                            </div>
                            <aside className="text-widget">
                                <div className="group1 contact-footer">
                                    <h6>Nous contacter</h6>
                                    <p>
                                        <a href="tel:0241010203"><FaPhoneAlt/>+ 33 (0)2 41 01 02 03</a>
                                        <a href="mailto:contact@luxury-travel.com"><FaRegEnvelope/>contact@luxury-travel.com</a>
                                    </p>
                                    <p>
                                        25 rue d'Alsace
                                        <br />
                                        49000 Angers
                                        <br />
                                        France
                                    </p>
                                </div>
                            </aside>
                        </div>
                        <div className="footer-box footer-box-2 col-md-3 col-sm-6 col-12">
                            <aside className="text-widget">
                                <Link to={"/destinations"}><h6>Destinations</h6></Link>
                                {continents.map((continent) => (
                                    <Link key={continent.id} to={"/destinations/" + continent.slug + "/continent"}>
                                        {continent.name}
                                    </Link>
                                ))}
                            </aside>
                        </div>
                        <div className="footer-box footer-box-3 col-md-3 col-sm-6 col-xs-12">
                            <aside className="text-widget">
                                <h6>à la une</h6>
                                <Link to={"/nouveautes"}>Nouveautés</Link>
                            </aside>
                        </div>
                        <div className="footer-box footer-box-4 col-md-3 col-sm-6 col-xs-12">
                            <aside className="text-widget">
                                <h6>l'agence</h6>
                                <Link to={"/about"}>Notre équipe</Link>
                                <Link to={"/nos-partenaires"}>Nos partenaires</Link>
                            </aside>
                            <aside className="text-widget">
                                <div className="group2">
                                    <h6>Nous suivre</h6>
                                    <ul className="social-footer">
                                        <li>
                                        <Link to={{}} target="_blank" rel="noopener"><FaFacebookSquare/></Link>
                                        </li>
                                        <li>
                                        <Link to={{}} target="_blank" rel="noopener"><FaLinkedin/></Link>
                                        </li>
                                        <li>
                                        <Link to={{}} target="_blank" rel="noopener"><FaInstagram/></Link>
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <div className="container">
                    <div className="footer-nav">
                        <div className="copyright_w">
                            <ul className="menu-copyright">
                                <li>
                                    <Link to={{}}>Conditions de Vente</Link>
                                </li>
                                <li>
                                    <Link to={{}}>Assurances</Link>
                                </li>
                                <li>
                                    <Link to={{}}>Mentions légales</Link>
                                </li>
                                <li>
                                    <Link to={{}}>Plan du site</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </>
     );
}
 
export default Footer;