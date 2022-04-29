import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import FieldLogin from '../components/forms/FieldLogin';
import usePasswordToggle from '../components/PasswordToggle';
import Slider from '../components/Slider';
import AuthContext from '../contexts/AuthContext';
import authApi from '../services/authApi';
import './SecurityPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    // Toggle du mot de passe
    const [PasswordInputType, ToggleIcon] = usePasswordToggle();

    // Gestion des champs
    const handleChange = ({currentTarget}) => {
        const { value, name } = currentTarget;
        setCredentials({...credentials, [name]: value});
    };

    // Gestion du submit
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await authApi.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            toast.success("Vous êtes désormais connecté !");
            navigate("/");
        } catch (error) {
            setError(
                "Aucun compte ne possède cette adresse email ou alors les informations ne correspondent pas !"
            );
            toast.error("Une erreur est survenue");
        }
    }

    return ( 
        <>
        <section className="pt-0 height-full-screen sign-page">
            <div className="height-full-screen d-flex">
                <div className="col">
                    <div className="height-full-screen">
                        <div className="logo logo-sign">
                            <h1><Link to={"/"}>Luxury Travel</Link></h1>
                        </div>
                        <div id="div-left-center" className="height-full-screen">
                            <h3>Connexion à l'application</h3>

                            <form onSubmit={handleSubmit} className="shadow-none login-form">
                                <FieldLogin
                                label="Adresse email"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                placeholder="Adresse email de connexion"
                                error={error}
                                src={require('../../media/i-email-primary.svg')}
                                />
                                <br />
                                <FieldLogin
                                name="password"
                                label="Mot de passe"
                                onChange={handleChange}
                                value={credentials.password}
                                type={PasswordInputType}
                                div={ToggleIcon}
                                error=""
                                src={require('../../media/i-lock-primary-password.svg')}
                                />
                                <div className="form-group mt-4 d-flex flex-wrap justify-content-between button-login">
                                    <button type="submit" className="btn btn-primary">
                                        Je me connecte
                                    </button>
                                    <Link to={"/forgetpassword"} className='btn btn-link'>
                                        J'ai oublié mon mot de passe
                                    </Link>
                                </div>
                            </form>
                            <p className="color-gray-dark font-15 bold link-bottom">Pas encore de compte&nbsp;?<Link to={"/register"}> Inscrivez-vous&nbsp;!</Link></p>
                        </div>
                    </div>
                </div>
                <div className="col col-7 d-none d-md-block p-0">
                    <Slider/>
                </div>
            </div>
        </section>
        </>
     );
}
 
export default LoginPage;