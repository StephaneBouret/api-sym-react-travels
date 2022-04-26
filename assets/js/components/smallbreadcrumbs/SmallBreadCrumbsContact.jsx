import React from 'react';
import { Link } from 'react-router-dom';
import './SmallBreadCrumbs.css';

const SmallBreadCrumbsContact = ({link, linkName, secondTitle }) => {
    return ( 
        <>
        <section className="small-breadcrumbs">
            <div className="container">
                <div className="d-flex justify-content-start align-items-center flex-wrap">
                    <ol>
                        <li><Link to={link}>{linkName}</Link></li>
                        <li>{secondTitle}</li>
                    </ol>
                </div>
            </div>
        </section>
        </>
     );
}
 
export default SmallBreadCrumbsContact;