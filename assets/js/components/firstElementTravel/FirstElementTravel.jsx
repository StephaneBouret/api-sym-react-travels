import React from 'react';
import './FirstElementTravel.css';

const FirstElementTravel = ({ titleRef, travel }) => {
    return ( 
        <>
            <section id="firstElement" className="firstELement" ref={titleRef}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="section-title">
                            <h2>{travel.title}</h2>
                            <p>{travel.description}</p>
                        </div>
                    </div>
                    <div className="row style">
                        <div className="col-lg-3 col-md-12 text-center mb-25">
                            <h3>Style</h3>
                            <p>{travel.style}</p>
                        </div>
                        <div className="col-lg-3 col-md-12 text-center mb-25">
                            <h3>Capacité</h3>
                            <p>{travel.capacity}</p>
                        </div>
                        <div className="col-lg-3 col-md-12 text-center mb-25">
                            <h3>Durée et prix</h3>
                            <p>
                                Durée : {travel.days} {travel.days > 1 ? "jours" : "jour"} / {travel.nights} {travel.nights > 1 ? "nuits" : "nuit"}<br />
                                À partir de : {travel.amount.toLocaleString()} €
                            </p>
                        </div>
                        <div className="col-lg-3 col-md-12 text-center">
                            <h3>Les plus</h3>
                            <p>{travel.theMost}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
 
export default FirstElementTravel;