import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { MdHolidayVillage, MdNightsStay } from "react-icons/md";
import { Link } from "react-router-dom";
import TextTruncate from 'react-text-truncate';
import './TravelsCard.css';

const TravelsCard = ({ amount, country, days, description, fileUrl, id, nights, title }) => {
    return ( 
        <>
        <Link
        to={"/travel/" + id}
        >
        <div className="card card-explore">
            <div className="card-explore__img">
                <img src={fileUrl} alt="" className='card-img-top' />
                <div className="text">
                    <h3>{country}</h3>
                </div>
            </div>
            <div className="card-body">
                <h3 className="card-explore__title">{title}</h3>
                <div className="resume">
                    <TextTruncate line={4} truncateText="…" text={description}/>
                </div>
                <div className="duration">
                    <p><strong>Durée</strong> :</p>
                    <div className="number-duration">
                        <ul>
                            <li className="me-2"><MdHolidayVillage/>{days} {days > 1 ? "jours" : "jour"}</li>
                            <li><MdNightsStay/>{nights} {nights > 1 ? "nuits" : "nuit"}</li>
                        </ul>
                    </div>
                </div>
                <div className="price">
                    <p><strong>À partir de</strong> :</p>
                    <div className="travel_price">
                        {amount.toLocaleString()} €
                    </div>
                </div>
                <div className="card-explore__link">
                    Réservez
                    <BsArrowRight/>
                </div>
            </div>
        </div>
        </Link>
        </>
    );
}
 
export default TravelsCard;