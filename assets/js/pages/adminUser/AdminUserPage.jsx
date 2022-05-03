import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormContentLoader from '../../components/loaders/FormContentLoader';
import ScrollButton from '../../components/scrollButton/ScrollButton';
import Select from '../../components/forms/Select';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import Field from '../../components/forms/Field';
import usersApi from '../../services/usersApi';
import JwtDecode from "jwt-decode";
import jwtDecode from 'jwt-decode';

const AdminUserPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { id  } = params;
    const token = window.localStorage.getItem("authToken");
    const { email } = jwtDecode(token);

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        roles: []
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        roles: ""
    });

    const fetchUser = async (id) => {
        try {
            const { firstName, lastName, roles, email } = await usersApi.find(id);
            setUser({ firstName, lastName, roles: [roles[0]], email });
            setLoading(false);
        } catch (error) {
            toast.error("L'utilisateur' n'a pas pu être chargé");
            navigate("/admin/users");
        }
    };

    useEffect(() => {
        fetchUser(id);
    }, [id]);

    useEffect(() => {
        return () => {};
    }, []);

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setUser({ ...user, [name]: value });
    };

    const handleChangeSelect = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setUser({ ...user, [name]: [value]})
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            setErrors({});
            await usersApi.patch(id, user);
            navigate("/admin/users");
            toast.success("L'utilisateur a bien été modifié");
        } catch ({ response }) {
            const { violations } = response.data;
            if (violations) {
                const apiErrors = {};
                violations.forEach(({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                    setErrors(apiErrors);
                    toast.error("Des erreurs dans votre formulaire");
                })
            }
        }
    }
    
    return ( 
        <>
        <main id='main'>
        <BreadCrumbs title={"Utilisateurs"} link={"/admin/users"} linkto={"Administration"} subtitle={"Modification"}/>
        <div className="container">
            <div className="mt-3 mb-3 d-flex justify-content-between align-items-center flex-wrap">
                <h1 className="travels_h1">Modification d'un utilisateur</h1>
            </div>
            {loading && <FormContentLoader />}
            {!loading && (
                <form className="travel-form mb-3" onSubmit={handleSubmit}>
                    <div className="row">
                        <Field
                        name="firstName"
                        label="Prénom"
                        placeholder="Prénom de l'utilisateur"
                        type="text"
                        value={user.firstName}
                        onChange={handleChange}
                        error={errors.firstName}
                        classCss="col-md-6"
                        />
                        <Field
                        name="lastName"
                        label="Nom"
                        placeholder="Nom de l'utilisateur"
                        type="text"
                        value={user.lastName}
                        onChange={handleChange}
                        error={errors.lastName}
                        classCss="col-md-6"
                        />
                    </div>
                    <div className="row">
                    <Select
                        name="roles"
                        label="Rôles"
                        value={user.roles[0] === "ROLE_USER" ? "ROLE_USER" : "ROLE_ADMIN"}
                        error={errors.roles}
                        onChange={handleChangeSelect}
                        classCss="col-md-6"
                    >
                        <option value="ROLE_USER">Utilisateur</option>
                        <option value="ROLE_ADMIN">Administrateur</option>
                    </Select>
                    <Field
                    name="email"
                    label="Email"
                    placeholder="Email de l'utilisateur"
                    value={user.email}
                    error={errors.email}
                    disabled={email === user.email ? "disabled" : ""}
                    onChange={handleChange}
                    classCss="col-md-6"
                    />
                    </div>
                    <div className="form-group mt-3">
                        <button type="submit" className="btn btn-success">
                        Enregistrer
                        </button>
                        <Link to="/admin/users" className="btn btn-link">
                        Retour à la liste
                        </Link>
                    </div>
                    <ScrollButton/>
                </form>
            )}
        </div>
        </main>
        </>
    );
}
 
export default AdminUserPage;