import React, { useState } from 'react';
import { FaCheck } from "react-icons/fa";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import FieldUser from "../components/forms/FieldUser";
import PasswordStrengthIndicator from '../components/passwordStrengthIndicator/PasswordStrengthIndicator';
import usePasswordToggle from '../components/PasswordToggle';
import usersApi from '../services/usersApi';
import "./SecurityPage.css";

const ChangePassword = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const isNumberRegx = /\d+/;
    const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const lowCarRegx = /[a-z]+/;
    const highCarRegx = /[A-Z]+/;

    const [user, setUser] = useState({
        password: "",
        passwordConfirm: ""
    });
    const [errors, setErrors] = useState({
        password: "",
        passwordConfirm: ""
    });

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
    function handleChange({ currentTarget }) {
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
    }

    // Gestion de la soumission du formulaire
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
            await usersApi.update(id, user);
            toast.success("Vos modifications ont bien été prises en compte !");
            navigate("/");
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
        <section id='section-profile'>
            <div id="div-profile" className="div-content">
                <div className="section-core">
                    <h1>Changement du mot de passe</h1>
                    <div className="div-profil-core content-box form-box">
                        <form onSubmit={handleSubmit}>
                            <div className="div-form-profil">
                                <div className="form-row">
                                    <div className='col col-md col-12'>
                                        <FieldUser
                                        name="password"
                                        type={PasswordInputType}
                                        label="Mot de passe"
                                        placeholder="Veuillez saisir votre nouveau mot de passe"
                                        value={user.password}
                                        onChange={handleChange}
                                        onFocus={() => setPasswordFocused(true)}
                                        onBlur={() => setPasswordFocused(false)}
                                        error={errors.password}
                                        div={ToggleIcon}
                                        src={require('../../media/i-lock-primary-password.svg')}/>
                                        {passwordFocused && (
                                        <PasswordStrengthIndicator
                                            validity={passwordValidity}
                                            strength={strength}
                                        />
                                        )}
                                    </div>
                                    <div className='col offset-md-1 col-md col-12'>
                                        <FieldUser
                                        name="passwordConfirm"
                                        label="Confirmation de mot de passe"
                                        placeholder="Confirmez votre mot de passe"
                                        type={PasswordInputType}
                                        value={user.passwordConfirm}
                                        error={errors.passwordConfirm}
                                        onChange={handleChange}
                                        div={ToggleIcon}
                                        src={require('../../media/i-lock-primary-password.svg')}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col">
                                    <button type='submit' className='shadow-none btn btn-primary btn-icon-left btn-big-bottom'>
                                        <FaCheck/>
                                        &nbsp; Sauvegarder les changements
                                        <Link to="/" className="btn btn-link">
                                            Retour
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}
 
export default ChangePassword;