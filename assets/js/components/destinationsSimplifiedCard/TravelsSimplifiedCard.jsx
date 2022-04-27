import React from "react";
import { Link } from "react-router-dom";
import './DestinationsSimplifiedCard.css';
import undefined from '../../../media/undefined.jpg';

const TravelsSimplifiedCard = ({ title, fileUrl, id }) => {
    return ( 
        <>
        <Link
        to={"/travel/" + id}
        >
        <img src={fileUrl ? fileUrl : undefined} className='img-fluid' />
        <h3>{title}</h3>
        </Link>
        </>
     );
}
 
export default TravelsSimplifiedCard;