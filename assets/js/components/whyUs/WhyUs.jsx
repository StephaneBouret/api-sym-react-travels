import React from 'react';
import "./WhyUs.css";

const WhyUs = () => {
    return ( 
        <>
        <section id="why-us" className="why-us">
            <div className="container">
                <div className="section-title">
                    <h2>Pourquoi choisir <span>notre agence</span></h2>
                    <p>Faites-nous confiance pour l'organisation de vos vacances. Nous sommes à même de vous élaborer tous types de voyages sur mesure, organisés ou à la carte.</p>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="box">
                            <span>01</span>
                            <h4>Disposer</h4>
                            <p>Disposer d'une équipe d'agents de voyages certifiés et expérimentés depuis plus de plus de 15 ans dans l'organisation de voyages sur mesure</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="box">
                            <span>02</span>
                            <h4>Profiter</h4>
                            <p>Profiter d'une sélection d'itinéraires et de séjours de qualité</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="box">
                            <span>03</span>
                            <h4>Bénéficier</h4>
                            <p>Bénéficier des tarifs compétitifs et d'une totale transparence</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
     );
}
 
export default WhyUs;