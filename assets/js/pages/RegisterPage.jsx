import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Slider from '../components/Slider';
import PasswordStrengthIndicator from '../components/passwordStrengthIndicator/PasswordStrengthIndicator'
import usePasswordToggle from '../components/PasswordToggle';
import FieldLogin from '../components/forms/FieldLogin';
import usersApi from '../services/usersApi';
import './SecurityPage.css';

const RegisterPage = () => {
    const navigate = useNavigate();
    const isNumberRegx = /\d+/;
    const specialCharacterRegx = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const lowCarRegx = /[a-z]+/;
    const highCarRegx = /[A-Z]+/;
    
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });
    // Toggle du mot de passe
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

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setUser({ ...user, [name]: value });
    };

    // Gestion du mot de passe fort
    const onChangePassword = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setUser({ ...user, [name]: value });
        const passwordStrength = value;
        setPasswordValidity({
            minChar: passwordStrength.length >= 8 ? true : false,
            number: isNumberRegx.test(passwordStrength) ? true : false,
            specialChar: specialCharacterRegx.test(passwordStrength) ? true : false,
            lowCar: lowCarRegx.test(passwordStrength) ? true : false,
            highCar: highCarRegx.test(passwordStrength) ? true : false
        });
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
            await usersApi.register(user);
            setErrors({});
            toast.success(
                "Vous êtes désormais inscrit, vous pouvez vous connecter !"
            );
            navigate("/login");
        } catch (error) {
            const { violations } = error.response.data;
            if (violations) {
                violations.forEach(violation => {
                  apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
            }
            toast.error("Des erreurs dans votre formulaire !");
        }
    };

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
                            <h3>Inscription</h3>
                            <form onSubmit={handleSubmit} className="shadow-none login-form">
                            <FieldLogin
                                name="firstName"
                                label="Prénom"
                                placeholder="Votre prénom"
                                value={user.firstName}
                                error={errors.firstName}
                                onChange={handleChange}
                                src={require('../../media/i-firstname-primary.svg')}
                            />
                            <br />
                            <FieldLogin
                                name="lastName"
                                label="Nom de famille"
                                placeholder="Votre nom de famille"
                                value={user.lastName}
                                error={errors.lastName}
                                onChange={handleChange}
                                src={require('../../media/i-lastname-primary.svg')}
                            />
                            <br />
                            <FieldLogin
                                name="email"
                                label="Adresse email"
                                placeholder="Votre adresse email"
                                type='email'
                                value={user.email}
                                error={errors.email}
                                onChange={handleChange}
                                src={require('../../media/i-email-primary.svg')}
                            />
                            <br />
                            <FieldLogin
                                name="password"
                                label="Mot de passe"
                                type={PasswordInputType}
                                placeholder="Votre mot de passe"
                                value={user.password}
                                error={errors.password}
                                div={ToggleIcon}
                                onChange={onChangePassword}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                                src={require('../../media/i-lock-primary-password.svg')}
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
                                type={PasswordInputType}
                                placeholder="Confirmez votre mot de passe"
                                div={ToggleIcon}
                                value={user.passwordConfirm}
                                error={errors.passwordConfirm}
                                onChange={handleChange}
                                src={require('../../media/i-lock-primary-password.svg')}
                            />
                            <div className="form-group mt-3">
                                <button type="submit" className="btn btn-primary">
                                            S'inscrire
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
     );
}
 
export default RegisterPage;
