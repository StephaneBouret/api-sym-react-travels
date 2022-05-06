import React from 'react';
import { Link } from 'react-router-dom';
import './SmallBreadCrumbsWish.css';

const SmallBreadCrumbsWish = ({ linkFirst, name, travel }) => {
    return ( 
        <>
        <section className="single-breadcrumbs">
            <div className="container">
                <div className="col-md-12 wrap-breadcrumb">
                    <div className="block-breadcrumbs">
                        <ol>
                            <li><Link to={linkFirst}>Accueil</Link></li>
                            <li className="separator"> &gt; </li>
                            <li><Link to={"/vos-envies"}>Envies</Link></li>
                            <li className="separator"> &gt; </li>
                            <li className="title-country">{name}</li>
                        </ol>
                        <span>({travel.length} {travel.length > 1 ? "adresses" : "adresse"})</span>
                    </div>
                </div>
            </div>
        </section>
        </>
     );
}
 
export default SmallBreadCrumbsWish;