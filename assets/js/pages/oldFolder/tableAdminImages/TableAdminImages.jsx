import React from "react";
import { Link } from "react-router-dom";
import "./TableAdminImages.css";

const TableAdminImages = ({ paginatedImages, handleDelete }) => {
    // TODO : Sort table
    return ( 
        <>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Id.</th>
                    <th>Titre</th>
                    <th>Pays</th>
                    <th>Image</th>
                    <th />
                </tr>
            </thead> 
            <tbody>
                {paginatedImages.map((image) => (
                <tr key={image.id}>
                    <td data-label="id" className="align-middle">{image.id}</td>
                    <td data-label="Titre" className="align-middle">
                        <Link to={"/admin/images/" + image.id}>{image.travels.title}</Link>
                    </td>
                    <td data-label="Pays" className="align-middle">{image.travels.destinations.country}</td>
                    <td data-label="Image" className="align-middle img-image col-2">
                        <img src={image.fileUrl} />
                    </td>
                    <td className="align-middle text-center">
                        <button
                        onClick={() => handleDelete(image.id)}
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
 
export default TableAdminImages;