import React from "react";
import { Link } from "react-router-dom";
import './DestinationsSimplifiedCard.css';
import undefined from '../../../media/undefined.jpg';

const WishesSimplifiedCard = ({ name, fileUrl, id }) => {
    return ( 
        <>
        <Link
        to={"/vos-envies/" + id}
        >
        <img src={fileUrl ? fileUrl : undefined} className='img-fluid' />
        <h3>{name}</h3>
        </Link>
        </>
     );
}
 
export default WishesSimplifiedCard;