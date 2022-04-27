import React from 'react';
import { Link } from 'react-router-dom';
import './SmallBreadCrumbs.css';

const SmallBreadCrumbsNewFeatures = ({link, linkName, secondTitle, travels}) => {
    return ( 
        <>
        <section className="small-breadcrumbs">
            <div className="container">
                <div className="d-flex justify-content-start align-items-center flex-wrap">
                    <ol>
                        <li><Link to={link}>{linkName}</Link></li>
                        <li>{secondTitle}</li>
                    </ol>
                    {travels && (
                        <span>({travels.length} adresses)</span>
                    )}
                </div>
            </div>
        </section>
        </>
     );
}
 
export default SmallBreadCrumbsNewFeatures;