import React from 'react';
import { Link } from 'react-router-dom';
import "./BreadCrumbs.css";

const BreadCrumbs = ({ title, linkto, subtitle, link }) => {
    return (
        <>
        <section className="breadcrumbs">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <h2>{title}</h2>
                    <ol>
                        <li><Link to={link}>{linkto}</Link></li>
                        <li>{subtitle}</li>
                    </ol>
                </div>
            </div>
        </section>
        </>
     );
}
 
export default BreadCrumbs;