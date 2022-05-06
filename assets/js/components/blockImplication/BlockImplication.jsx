import React from 'react';
import { Link } from 'react-router-dom';

const BlockImplication = ({ paginatedTravels }) => {
    return ( 
        <>
            {paginatedTravels.map((t) => (
                <div key={t.id} className="row implication">
                    <div className="col-md-4 col-sm-12 col-xs-12 bg-white">
                        <Link to={"/travel/" + t.id}>
                            <img src={t.fileUrl} className="img-fluid img-responsive" />
                        </Link>
                    </div>
                    <div className="col-md-8 col-sm-12 col-xs-12 bg-white part-text row">
                        <div className="col-md-12 bg-gris">
                            <h3>
                                <Link to={"/travel/" + t.id}>
                                    {t.title}
                                </Link>
                            </h3>
                            <p className="clearfix">
                                <span>{t.destinations.country}</span>
                            </p>
                        </div>
                        <div className="col-md-12 hotel-bloc clearfix">
                            <p className="text-justify">
                                <span className="w-100 float-start">
                                    <b className="desc-title">Style : </b>{t.style}
                                </span>
                                <span className="w-100 float-start">
                                    <b className="desc-title">Prix : </b>À partir de : {t.amount.toLocaleString()} €
                                </span>
                                <span className="w-100 float-start">
                                    <b className="desc-title">Capacité : </b>{t.capacity}
                                </span>
                                <span className="w-100 float-start">
                                    <b className="desc-title">Les plus : </b>{t.theMost}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            ))}     
        </>
     );
}
 
export default BlockImplication;