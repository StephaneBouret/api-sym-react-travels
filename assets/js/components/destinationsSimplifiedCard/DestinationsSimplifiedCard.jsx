import React from "react";
import { Link } from "react-router-dom";
import './DestinationsSimplifiedCard.css';
import undefined from '../../../media/undefined.jpg';

const DestinationsSimplifiedCard = ({ country, filePath, id }) => {
    return ( 
        <>
        <Link
        to={"/destinations/" + id}
        >
        <img src={filePath ? filePath : undefined} className='img-fluid' />
        <h3>{country}</h3>
        </Link>
        </>
     );
}
 
export default DestinationsSimplifiedCard;