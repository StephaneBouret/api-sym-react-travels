import React from 'react';
import { Link } from 'react-router-dom';
import './ContainerContinent.css';

const ContainerContinent = () => {
    return ( 
        <>
        <div className="col-12 col-lg-3 col-md-6 col-sm-6">
            <div className="text-center">
                <Link to={{}}>
                <img src={require("../../../media/continent/afrique.jpg")} className='img-fluid' />
                <h3>Afrique</h3>
                </Link>
            </div>
        </div>
        <div className="col-12 col-lg-3 col-md-6 col-sm-6">
            <div className="text-center">
                <Link to={{}}>
                <img src={require("../../../media/continent/amerique-nord.jpeg")} className='img-fluid' />
                <h3>Amérique du Nord</h3>
                </Link>
            </div>
        </div>
        <div className="col-12 col-lg-3 col-md-6 col-sm-6">
            <div className="text-center">
                <Link to={{}}>
                <img src={require("../../../media/continent/amerique-sud.jpg")} className='img-fluid' />
                <h3>Amérique du Sud</h3>
                </Link>
            </div>
        </div>
        <div className="col-12 col-lg-3 col-md-6 col-sm-6">
            <div className="text-center">
                <Link to={{}}>
                <img src={require("../../../media/continent/asie.jpg")} className='img-fluid' />
                <h3>Asie</h3>
                </Link>
            </div>
        </div>
        <div className="col-12 col-lg-3 col-md-6 col-sm-6">
            <div className="text-center">
                <Link to={{}}>
                <img src={require("../../../media/continent/europe.jpg")} className='img-fluid' />
                <h3>Europe</h3>
                </Link>
            </div>
        </div>
        <div className="col-12 col-lg-3 col-md-6 col-sm-6">
            <div className="text-center">
                <Link to={{}}>
                <img src={require("../../../media/continent/oceanie.jpg")} className='img-fluid' />
                <h3>Océanie</h3>
                </Link>
            </div>
        </div>
        </>
     );
}
 
export default ContainerContinent;