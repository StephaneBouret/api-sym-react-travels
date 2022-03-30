import React from "react";
import { Link } from "react-router-dom";
import './TableAdminDestinations.css';

const TableAdminDestinations = ({ paginatedDestinations, handleDelete }) => {
    const truncate = (str, n) => {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	};

    return ( 
        <>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Id.</th>
                    <th>Titre</th>
                    <th>Description</th>
                    <th className="text-center">Pays</th>
                    <th className="text-center">Ville</th>
                    <th className="text-center">Continent</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {paginatedDestinations.map((destination) => (
                    <tr key={destination.id}>
                        <td data-label="id" className="align-middle">{destination.id}</td>
                        <td data-label="Titre" className="align-middle">
                            <Link to={"/admin/destination/" + destination.id}>{destination.title}</Link>
                        </td>
                        <td data-label="Description" className="align-middle">{truncate(destination.description, 100)}</td>
                        <td data-label="Pays" className="align-middle text-center">{destination.country}</td>
                        <td data-label="Ville" className="align-middle text-center">{destination.city}</td>
                        <td data-label="Continent" className="align-middle text-center">{destination.continent}</td>
                        <td className="align-middle text-center">
                            <button
                            onClick={() => handleDelete(destination.id)}
                            className="btn btn-sm btn-danger"
                            disabled={destination.travel.length > 0}
                            >
                                Supprimer
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
     );
}
 
export default TableAdminDestinations;