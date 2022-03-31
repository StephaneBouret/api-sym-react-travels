import React from "react";
import { Link } from "react-router-dom";
import './TableAdminTravels.css';

const TableAdminTravels = ({ paginatedTravels, handleDelete }) => {
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
                    <th className="text-center">Type</th>
                    <th className="text-center">Prix</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {paginatedTravels.map((travel) => (
                    <tr key={travel.id}>
                        <td data-label="id" className="align-middle">{travel.id}</td>
                        <td data-label="Titre" className="align-middle">
                            <Link to={"/admin/travel/" + travel.id}>{travel.title}</Link>
                        </td>
                        <td data-label="Description" className="align-middle">{truncate(travel.description, 50)}</td>
                        <td data-label="Pays" className="align-middle text-center">{travel.destinations.country}</td>
                        <td data-label="Type" className="align-middle text-center">{travel.type}</td>
                        <td data-label="Prix" className="align-middle text-center">{travel.amount.toLocaleString()} €</td>
                        <td className="align-middle text-center">
                            <button
                            onClick={() => handleDelete(travel.id)}
                            className="btn btn-sm btn-danger"
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
 
export default TableAdminTravels;