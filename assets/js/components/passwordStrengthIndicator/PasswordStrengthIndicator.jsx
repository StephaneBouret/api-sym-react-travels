import React from "react";
import './PasswordStrengthIndicator.css';

const PasswordStrengthIndicator = ({
    validity: { minChar, number, specialChar, lowCar, highCar },
    strength
}) => {
    const progress = strength * 20;

    return (
        <div className="pswd_info">
            <div className="text-center">
                <span className="arrow-password"></span>
            </div>
            <div className="advice-password">
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-password bg-success"
                                    role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" style={ { width: `${progress}%` } }></div>
                </div>
                <hr />
                <p className="mb-0 font-14">Votre mot de passe doit contenir au moins :</p>
                <ul className="mb-0 font-14">
                    <PasswordStrengthIndicatorItem
                        isValid={lowCar}
                        text="Un caractère en minuscule"
                    />
                    <PasswordStrengthIndicatorItem
                        isValid={highCar}
                        text="Un caractère en majuscule"
                    />
                    <PasswordStrengthIndicatorItem
                        isValid={specialChar}
                        text="Un caractère spécial (!,&nbsp;?, $, @, ...)"
                    />
                    <PasswordStrengthIndicatorItem
                        isValid={number}
                        text="Un chiffre"
                    />
                    <PasswordStrengthIndicatorItem 
                        isValid={minChar}
                        text="Au moins 8 caractères"
                    />
                </ul>
            </div>
        </div>
    );
};

const PasswordStrengthIndicatorItem = ({ isValid, text }) => {
    const highlightClass = isValid
        ? "valid"
        : "invalid";
    return <li>
        <span className={`me-2 ${highlightClass} sprite-align`}></span>{text}
    </li>;
};

export default PasswordStrengthIndicator;