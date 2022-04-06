import React from "react";
import { Link } from "react-router-dom";
import './DestinationsSimplifiedCard.css';

const DestinationsSimplifiedCard = ({ country, filePath, id }) => {
    return ( 
        <>
        <Link
        to={"/destinations/" + id}
        >
        <img src={filePath} className='img-fluid' />
        <h3>{country}</h3>
        </Link>
        </>
     );
}
 
export default DestinationsSimplifiedCard;