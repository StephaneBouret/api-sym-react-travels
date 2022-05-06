import React from 'react';
import { Link } from 'react-router-dom';
import './SmallBreadCrumbs.css';

const SmallBreadCrumbsWishes = ({link, linkName, secondTitle, wishes}) => {
    return ( 
        <>
        <section className="small-breadcrumbs">
            <div className="container">
                <div className="d-flex justify-content-start align-items-center flex-wrap">
                    <ol>
                        <li><Link to={link}>{linkName}</Link></li>
                        <li>{secondTitle}</li>
                    </ol>
                    {wishes && (
                        <span>({wishes.length} résultats)</span>
                    )}
                </div>
            </div>
        </section>
        </>
     );
}
 
export default SmallBreadCrumbsWishes;