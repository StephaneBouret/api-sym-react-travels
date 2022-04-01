import React from "react";
import { Link } from "react-router-dom";
import './DestinationsCard.css';

const DestinationsCard = ({ id, city, country, filePath, travel }) => {
    return ( 
        <>
        <Link
        to={"/destinations/" + id}
        >
            <div className="destination-box">
                <div className="pic">
                    <img src={filePath} alt="" className='img-fluid' />
                </div>
                <div className="member-info">
                    <h4>{country}</h4>
                    <span>{city}</span>
                    <div className="travel-destination">
                        {travel.length} {travel.length > 1 ? "voyages" : "voyage"}
                    </div>
                </div>
            </div>
        </Link>
        </>
    );
}
 
export default DestinationsCard;