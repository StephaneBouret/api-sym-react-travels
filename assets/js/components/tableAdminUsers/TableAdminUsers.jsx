import React from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from "react-router-dom";
import './TableAdminUsers.css';

const TableAdminUsers = ({ paginatedUsers, handleDelete }) => {
    const STATUS_CLASSES = {
        ROLE_USER: "primary",
        ROLE_ADMIN: "warning"
    };

    const STATUS_LABELS = {
        ROLE_USER: "Utilisateur",
        ROLE_ADMIN: "Administrateur"
    };

    const alertSubmit = id => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Êtes-vous sûr(e) ?</h1>
                        <p>Voulez-vous supprimer cet utilisateur ?</p>
                        <button onClick={onClose}>Non</button>
                        <button
                        onClick={() => {
                            handleDelete(id)
                            onClose();
                        }}
                        >
                            Oui, Suppression !
                        </button>
                    </div>
                );
            }
        })
    };

    return ( 
        <>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Id.</th>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Rôle</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {paginatedUsers.map((user) => (
                    <tr key={user.id}>
                        <td data-label="id" className="align-middle">
                            <Link to={"/admin/users/" + user.id}>{user.id}</Link>
                        </td>
                        <td data-label="Prénom" className="align-middle">{user.firstName}</td>
                        <td data-label="Nom" className="align-middle">{user.lastName}</td>
                        <td data-label="Email" className="align-middle text-center">{user.email}</td>
                        <td data-label="Rôle" className="align-middle text-center">
                            <span
                                className={"badge bg-" + STATUS_CLASSES[user.roles[0]]}
                            >
                                {STATUS_LABELS[user.roles[0]]}
                            </span>
                        </td>
                        <td className="align-middle text-center">
                            <button
                            onClick={() => alertSubmit(user.id)}
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
 
export default TableAdminUsers;