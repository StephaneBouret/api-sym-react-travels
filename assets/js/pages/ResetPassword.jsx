import React, { useEffect, useState } from 'react';
import {
    GoogleReCaptcha, GoogleReCaptchaProvider
} from "react-google-recaptcha-v3";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import FieldLogin from '../components/forms/FieldLogin';
import PasswordStrengthIndicator from '../components/passwordStrengthIndicator/PasswordStrengthIndicator';
import usePasswordToggle from '../components/PasswordToggle';
import Slider from '../components/Slider';
import tokenAPI from '../services/tokenAPI';
import usersApi from '../services/usersApi';
import './SecurityPage.css';

const ResetPassword = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { token = "" } = params;

    const [user, setUser] = useState({
        password: "",
        passwordConfirm: ""
    });
    const [errors, setErrors] = useState({
        password: "",
        passwordConfirm: ""
    });
    const [isValidToken, setIsValidToken] = useState();

    const isNumberRegx = /\d+/;
    const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const lowCarRegx = /[a-z]+/;
    const highCarRegx = /[A-Z]+/;

    const [editing, setEditing] = useState(false);
    const [id, setId] = useState(0);

    const [PasswordInputType, ToggleIcon] = usePasswordToggle();
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [passwordValidity, setPasswordValidity] = useState({
        minChar: null,
        number: null,
        specialChar: null,
        lowCar: null,
        highCar: null
    });
    // Gestion de la barre de progression
    const strength = Object.values(passwordValidity).reduce((a, item) => a + item, 0);

    // Récupération du token en fonction de l'url
    const fetchToken = async token => {
        try {
            const data = await tokenAPI.check(token);
            const { id } = data;
            setId(id);
            if (data === false) {
                setEditing(false);
                toast.error("Votre demande de mot de passe a expiré ou est erronée. Merci de la renouveller.");
                navigate("/forgetpassword");
            }
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        if (token !=="") {
            setEditing(true);
            fetchToken(token);
        }
    }, [token]); 

    useEffect(() => {
        return () => {};
    }, []);

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setUser({ ...user, [name]: value });
        const passwordStrength = value;
        setPasswordValidity({
            minChar: passwordStrength.length >= 8 ? true : false,
            number: isNumberRegx.test(passwordStrength) ? true : false,
            specialChar: specialCharacterRegx.test(passwordStrength) ? true : false,
            lowCar: lowCarRegx.test(passwordStrength) ? true : false,
            highCar: highCarRegx.test(passwordStrength) ? true : false
        })
    };

    // Gestion de la soumission
    const handleSubmit = async event => {
        event.preventDefault();

        const apiErrors = {};
        if (user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm =
                "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original";
            setErrors(apiErrors);
            toast.error("Des erreurs dans votre formulaire !");
            return;
        }
        try {
            setErrors({});

            if (editing) {
                await usersApi.update(id, user);
                toast.success("Votre mot de passe a bien été mis à jour !");
                navigate("/login");
            }
            
        } catch (error) {
            const { violations } = error.response.data;
            if (violations) {
                const apiErrors = {};
                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message
                });
                setErrors(apiErrors);
                toast.error("Des erreurs dans votre formulaire !");
            }
        }
    };

    const handleReCaptchaVerify = async (token) => {
        if (!token) {
          return;
        }
    
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
                            <h3>Réinitialiser mon mot de passe</h3>
                            <form onSubmit={handleSubmit} className="shadow-none login-form">
                            <GoogleReCaptcha onVerify={(token) => handleReCaptchaVerify(token)} />
                                <FieldLogin
                                name="password"
                                label="Mot de passe"
                                placeholder="Votre nouveau mot de passe"
                                type={PasswordInputType}
                                div={ToggleIcon}
                                value={user.password}
                                error={errors.password}
                                onChange={handleChange}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                                src={require("../../media/icon-password.svg")}
                                />
                                {passwordFocused && (
                                    <PasswordStrengthIndicator
                                        validity={passwordValidity}
                                        strength={strength}
                                    />
                                )}
                                <br />
                                <FieldLogin
                                name="passwordConfirm"
                                label="Confirmation de mot de passe"
                                type="password"
                                placeholder="Confirmez votre nouveau mot de passe"
                                value={user.passwordConfirm}
                                error={errors.passwordConfirm}
                                onChange={handleChange}
                                src={require("../../media/icon-password.svg")}
                                />
                                <div className="form-group mt-4">
                                    <button type="submit" className="btn btn-primary">
                                        Réinitialiser votre mot de passe
                                    </button>
                                </div> 
                            </form>
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
 
export default ResetPassword;