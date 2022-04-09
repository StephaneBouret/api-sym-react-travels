import React from 'react';
import { Link } from 'react-router-dom';
import './SmallBreadCrumbs.css';

const SmallBreadCrumbsTravel = ({link, linkName, secondTitle, travels}) => {
    return ( 
        <>
        <section className="small-breadcrumbs">
            <div className="container">
                <div className="d-flex justify-content-start align-items-center flex-wrap">
                    <ol>
                        <li><Link to={link}>{linkName}</Link></li>
                        <li>{secondTitle}</li>
                    </ol>
                    <span>({travels.length} {travels.length > 1 ? "voyages" : "voyage"})</span>
                </div>
            </div>
        </section>
        </>
     );
}
 
export default SmallBreadCrumbsTravel;