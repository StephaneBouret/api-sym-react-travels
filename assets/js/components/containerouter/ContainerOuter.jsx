import React from 'react';
import { Link } from 'react-router-dom';
import './ContainerOuter.css';

const ContainerOuter = ({ handleClickContinent, idx, currentId }) => {
    return ( 
        <>
            <section className="countainer-outer">
                <ul className="nav nav-pills tm-tabs-links">
                    <li className={`tm-tab-link-li ${currentId === 1 ? "active" : ""}`}>
                        <Link to={{}} className="tm-tab-link" onClick={handleClickContinent("Amérique du Nord", idx=1)}>
                            <img src={require('../../../media/northAmerica.png')} className="img-fluid" />
                            Amérique du Nord
                        </Link>
                    </li>
                    <li className={`tm-tab-link-li ${currentId === 2 ? "active" : ""}`}>
                        <Link to={{}} className="tm-tab-link" onClick={handleClickContinent("Amérique du Sud", idx=2)}>
                            <img src={require('../../../media/southAmerica.png')} className="img-fluid" />
                            Amérique du Sud
                        </Link>
                    </li>
                    <li className={`tm-tab-link-li ${currentId === 3 ? "active" : ""}`}>
                        <Link to={{}} className="tm-tab-link" onClick={handleClickContinent("Europe", idx=3)}>
                            <img src={require('../../../media/europe.png')} className="img-fluid" />
                            Europe
                        </Link>
                    </li>
                    <li className={`tm-tab-link-li ${currentId === 4 ? "active" : ""}`}>
                        <Link to={{}} className="tm-tab-link" onClick={handleClickContinent("Afrique", idx=4)}>
                            <img src={require('../../../media/africa.png')} className="img-fluid" />
                            Afrique
                        </Link>
                    </li>
                    <li className={`tm-tab-link-li ${currentId === 5 ? "active" : ""}`}>
                        <Link to={{}} className="tm-tab-link" onClick={handleClickContinent("Asie", idx=5)}>
                            <img src={require('../../../media/asia.png')} className="img-fluid" />
                            Asie
                        </Link>
                    </li>
                    <li className={`tm-tab-link-li ${currentId === 6 ? "active" : ""}`}>
                        <Link to={{}} className="tm-tab-link" onClick={handleClickContinent("Océanie", idx=6)}>
                            <img src={require('../../../media/oceania.png')} className="img-fluid" />
                            Océanie
                        </Link>
                    </li>
                </ul>
            </section>
        </>
     );
}
 
export default ContainerOuter;