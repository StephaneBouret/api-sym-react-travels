import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Slider from '../components/Slider';
import "./SecurityPage.css";

const ForgetPasswordCheck = () => {
    toast.success("Un email de réinitialisation a été envoyé à votre adresse !", {
        position: "top-center"});

    return ( 
        <>
        <section className="pt-0 height-full-screen sign-page">
            <div className="height-full-screen d-flex">
                <div className="col">
                    <div className="logo logo-sign">
                        <h1><Link to={"/"}>Luxury Travel</Link></h1>
                    </div>
                    <div id="div-left-center" className="height-full-screen">
                        <h3 className='text-center font-42'>Réinitialisation du mot de passe</h3>
                        <p className="text-center mt-0 mb-0 font-16">
                            Un email vous a été envoyé pour vous expliquer comment réinitialiser votre mot de passe.
                        </p>
                        <p className="text-center mt-0 mb-0 font-16">
                            Astuce: pensez à vérifier votre courrier indésirable.
                        </p>
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
 
export default ForgetPasswordCheck;