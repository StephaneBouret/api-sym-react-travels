import React from "react";
import { Link } from "react-router-dom";
import "./TableAdminImages.css";

const TableAdminImages = ({ paginatedTravels }) => {
    // TODO : Sort table
    return ( 
        <>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Id.</th>
                    <th>Titre</th>
                    <th>Pays</th>
                    <th />
                </tr>
            </thead> 
            <tbody>
                {paginatedTravels.map((travel) => (
                <tr key={travel.id}>
                    <td data-label="id" className="align-middle">{travel.id}</td>
                    <td data-label="Titre" className="align-middle">
                        {travel.title}
                    </td>
                    <td data-label="Pays" className="align-middle">{travel.destinations.country}</td>
                    <td className="align-middle text-center">
                        <button
                        className="btn btn-sm btn-success btn-carousel"
                        >
                            <Link to={"/admin/images/" + travel.id}>Carousel</Link>
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>           
        </table>
        </>
     );
}
 
export default TableAdminImages;