import React from "react";
import { Link } from "react-router-dom";
import './TableAdminWishes.css';

const TableAdminWishes = ({ paginatedWhishes, handleDelete }) => {
    return ( 
        <>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Id.</th>
                    <th>Nom</th>
                    <th>Slug</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {paginatedWhishes.map((whish) => (
                    <tr key={whish.id}>
                        <td data-label="id" className="align-middle">{whish.id}</td>
                        <td data-label="Nom" className="align-middle">
                            <Link to={"/admin/wishes/" + whish.id}>{whish.name}</Link>
                        </td>
                        <td data-label="Slug" className="align-middle">
                            {whish.slug}
                        </td>
                        <td className="align-middle text-end">
                            <button
                            onClick={() => handleDelete(whish.id)}
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
 
export default TableAdminWishes;