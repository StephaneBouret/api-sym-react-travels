import React from "react";
import './TableAdminCountries.css';

const TableAdminCountries = ({ paginatedCountries, handleClick }) => {
    return ( 
        <>
        <table className="table table-hover">
            <thead>
                <tr className="d-flex">
                    <th className="col-2">Drapeau</th>
                    <th className="col-3">Nom</th>
                    <th className="text-center col-2">Continent</th>
                    <th className="text-center col-3">Capitale</th>
                    <th className="col-2"/>
                </tr>
            </thead>
            <tbody>
                {paginatedCountries.map((country) => (
                    <tr key={country.id} className="d-flex">
                        <td data-label="Drapeau" className="align-middle flag-country col-2">
                            <img src={country.flagSvg} alt={country.name} />
                        </td>
                        <td data-label="Nom" className="align-middle col-3">{country.name}</td>
                        <td data-label="Continent" className="align-middle col-2">{country.continent}</td>
                        <td data-label="Capitale" className="align-middle text-center col-3">{country.capital}</td>
                        <td className="align-middle text-center col-2">
                        <button
                            id={country.id}
                            onClick={() => handleClick(country.id)}
                            className="btn btn-sm btn-info"
                            >
                                Ajouter
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
     );
}
 
export default TableAdminCountries;