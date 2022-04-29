import React, { useState } from 'react';
import {
    GoogleReCaptcha, GoogleReCaptchaProvider
} from "react-google-recaptcha-v3";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FieldLogin from '../components/forms/FieldLogin';
import Slider from '../components/Slider';
import tokenAPI from '../services/tokenAPI';
import "./SecurityPage.css";

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: ""
    });
    const [errors, setErrors] = useState("");
    const [isValidToken, setIsValidToken] = useState();
    const disabled = credentials.username === "";

    // Gestion des champs
    const handleChange = ({currentTarget}) => {
        const { value, name } = currentTarget;
        setCredentials({...credentials, [name]: value});
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const email = credentials.username;

        try {
            const user = await tokenAPI.find(email);
            if (user !== null) {
                const id = user.id;
                await tokenAPI.create(id);
                navigate("/forgetpassword/done");
            } else {
                setErrors(true);
                toast.error("Cette adresse email est inconnue !");
            }
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const handleReCaptchaVerify = async (token) => {
        if (!token) {
          return;
        }
    
        // CORS issue in sandbox cannot make verify call
        // const recaptchaSecret = "6Lch-VodAAAAALO1MsCqE7CufSc8eVisxis9WMDO";
        // const url = `https://www.recaptcha.net/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${token}`;
        // make post request to validate token
        // if valid
        token && setIsValidToken(true);
    };

    return ( 
        <GoogleReCaptchaProvider reCaptchaKey='6Lch-VodAAAAAOqeUpcdkS1LICAVHMABREyK4sA6'>
        <>
        <section className="pt-0 height-full-screen sign-page">
            <div className="height-full-screen d-flex">
                <div className="col">
                    <div className="height-full-screen">
                        <div className="logo logo-sign">
                            <h1><Link to={"/"}>Luxury Travel</Link></h1>
                        </div>
                        <div id="div-left-center" className="height-full-screen">
                            <h3>Mot de passe oublié</h3>
                            <p className='color-dark'>
                                Entrez l'adresse email avec laquelle vous vous êtes inscrit(e).
                                <br/>
                                Nous allons vous envoyer un lien pour réinitialiser votre mot de passe.
                            </p>
                            <form onSubmit={handleSubmit} className="shadow-none login-form">
                            <GoogleReCaptcha onVerify={(token) => handleReCaptchaVerify(token)} />
                                <FieldLogin
                                    label="Adresse email"
                                    name="username"
                                    value={credentials.username}
                                    onChange={handleChange}
                                    placeholder="Adresse email de connexion"
                                    src={require('../../media/i-email-primary.svg')}
                                />
                                <div className="form-group mt-4">
                                    <button type="submit" className="btn btn-primary" disabled={disabled}>
                                        Changer mon mot de passe
                                    </button>
                                </div>
                            </form>
                            <p className="color-gray-dark font-15 bold link-bottom">J'ai déjà un compte !&nbsp;<Link to={"/login"}>&nbsp;Connectez-vous !</Link></p>
                        </div>
                    </div>
                </div>
                <div className="col col-7 d-none d-md-block p-0">
                    <Slider/>
                </div>
            </div>
        </section>
        </>
        </GoogleReCaptchaProvider>
     );
}
 
export default ForgetPassword;