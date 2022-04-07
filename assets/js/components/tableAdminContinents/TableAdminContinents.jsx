import React from "react";
import { Link } from "react-router-dom";
import './TableAdminContinents.css';

const TableAdminContinents = ({ paginatedContinents, handleDelete}) => {
    return ( 
        <>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Id.</th>
                    <th>Nom</th>
                    <th />
                </tr>
            </thead>  
            <tbody>
                {paginatedContinents.map((continent) => (
                    <tr key={continent.id}>
                        <td data-label="id" className="align-middle">{continent.id}</td>
                        <td data-label="Nom" className="align-middle">
                            <Link to={"/admin/continent/" + continent.id}>{continent.name}</Link>
                        </td>
                        <td className="align-middle text-end">
                            <button
                            onClick={() => handleDelete(continent.id)}
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
 
export default TableAdminContinents;