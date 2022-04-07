import React from 'react';
import { Link } from 'react-router-dom';
import './ContainerContinent.css';

const ContainerContinent = ({ paginatedContinents }) => {
    return ( 
        <>
        {paginatedContinents.map((continent) => (
            <div key={continent.id} className="col-12 col-lg-3 col-md-6 col-sm-6 mb-3">
                <div className="text-center">
                    <Link to={"/destinations/" + continent.slug + "/continent"}>
                        <img src={continent.filePath} className='img-fluid' />
                        <h3>{continent.name}</h3>
                    </Link>
                </div>
            </div>
        ))}
        </>
     );
}
 
export default ContainerContinent;