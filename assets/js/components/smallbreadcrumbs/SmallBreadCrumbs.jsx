import React from 'react';
import { Link } from 'react-router-dom';
import './SmallBreadCrumbs.css';

const SmallBreadCrumbs = ({link, linkName, secondTitle, destinations}) => {
    return ( 
        <>
        <section className="small-breadcrumbs">
            <div className="container">
                <div className="d-flex justify-content-start align-items-center flex-wrap">
                    <ol>
                        <li><Link to={link}>{linkName}</Link></li>
                        <li>{secondTitle}</li>
                    </ol>
                    <span>({destinations.length} pays)</span>
                </div>
            </div>
        </section>
        </>
     );
}
 
export default SmallBreadCrumbs;