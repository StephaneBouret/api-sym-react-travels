import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaCheck } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import FieldUser from "../components/forms/FieldUser";
import AuthContext from '../contexts/AuthContext';
import authApi from '../services/authApi';
import usersApi from '../services/usersApi';
import "./SecurityPage.css";

const ProfilePage = () => {
    const { id } = useParams();

    const { setIsAuthenticated } = useContext(AuthContext);

    const [display, setDisplay] = useState(true);
    const [editing, setEditing] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [originalEmail, setOriginalEmail] = useState({});
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const fetchUser = async (id) => {
        try {
            const { firstName, lastName, email } = await usersApi.find(id);
            setUser({firstName: firstName, lastName: lastName, email: email });
            setOriginalEmail(email);
        } catch (error) {
            toast.error("L'utilisateur n'a pas pu être chargé");
        }
    };

    useEffect(() => {
      fetchUser(id);
    }, [id]);

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setUser({ ...user, [name]: value });
    };

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setErrors({});
        setShow(false);
    }
    const handleEmailSubmit =  async event => {
        event.preventDefault();
        const apiErrors = {};

        try {
            if (!user.password) {
                apiErrors.password = "Vous devez renseigner votre mot de passe";
                setErrors(apiErrors);
                return;
            }
            const data = await usersApi.checkPassword(user.password);
            if (data === true) {
                setShow(false);
                setIsDisabled(false);
                setDisplay(false);
                setEditing(true);
            } else {
                apiErrors.password = "Votre mot de passe n'est pas le bon";
                setErrors(apiErrors);
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    const handleSubmit = async event => {
        event.preventDefault();
        const apiErrors = {};

        try {
            if (user.email !== originalEmail) {
                const findUser = await usersApi.checkEmail(user.email);
                if (editing) {
                    if (findUser) {
                        apiErrors.email = "Cette adresse email existe déjà !";
                        setErrors(apiErrors);
                        toast.error("Cette adresse email existe déjà !");
                    } else {
                        await usersApi.update(id, user);
                        await authApi.refreshJWT(user);
                        setIsAuthenticated(true);
                        toast.success("Votre profil a bien été modifié");
                    }
                } else {
                    toast.error("Vous devez mentionner votre mot de passe");
                }
            } else {
                await usersApi.patch(id, {
                    firstName: user.firstName,
                    lastName: user.lastName
                });
                toast.success("Votre profil a bien été modifié");
            }
            
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
                    <h1>Mon profil</h1>
                    <div className="div-profil-core content-box form-box">
                        <form onSubmit={handleSubmit}>
                            <div className="div-form-profil">
                                <div className="form-row">
                                    <div className='col col-md col-12'>
                                        <FieldUser
                                        name="firstName"
                                        label="Prénom"
                                        placeholder="Mon prénom"
                                        value={user.firstName}
                                        error={errors.firstName}
                                        onChange={handleChange}
                                        src={require('../../media/i-firstname-primary.svg')}
                                        />
                                    </div>
                                    <div className='col offset-md-1 col-md col-12'>
                                        <FieldUser
                                        name="lastName"
                                        label="Nom"
                                        placeholder="Mon nom de famille"
                                        value={user.lastName}
                                        error={errors.lastName}
                                        onChange={handleChange}
                                        src={require('../../media/i-lastname-primary.svg')}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className='col col-md col-12'>
                                        <FieldUser
                                        name="email"
                                        label="Email"
                                        placeholder="Mon adresse email"
                                        value={user.email}
                                        error={errors.email}
                                        onChange={handleChange}
                                        src={require('../../media/i-email-primary.svg')}
                                        disabled={isDisabled}
                                        show={show}
                                        div={
                                            <Link to="" onClick={handleShow} className={`profil-link ${display ? "d-block" : "d-none"}`}>Modifier</Link>
                                        }
                                        />
                                    </div>
                                    <div className='col offset-md-1 col-md col-12'>
                                        <FieldUser
                                        name="oldPword"
                                        label='Mot de passe'
                                        type="password"
                                        placeholder='*******'
                                        value=""
                                        disabled
                                        src={require('../../media/i-lock-primary-password.svg')}
                                        div={
                                            <Link to={"/profile/" + id + "/changepassword"} className="profil-link">Réinitialiser</Link>
                                        }
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
        <Modal show={show} onHide={handleClose}>
            <Modal.Header></Modal.Header>
            <section className="modal-section">
                <Modal.Body>
                    <div className="row row-title">
                        <div className="col">
                            <h4 className="modal-title title-email">Modifier votre email ?</h4>
                        </div>
                    </div>
                    <div className="row row-content">
                        <div className="col">
                            <p className="modal-p">
                            Attention, en modifiant votre adresse e-mail, vous modifierez également votre identifiant de connexion !
                            </p>
                            <form onSubmit={handleEmailSubmit} className="modal-form">
                                <div className="form-row">
                                    <div className='col col-md col-12'>
                                        <FieldUser
                                        name="password"
                                        type="password"
                                        label="Mot de passe"
                                        placeholder="Veuillez saisir votre mot de passe actuel"
                                        value={user.password}
                                        onChange={handleChange}
                                        error={errors.password}
                                        src={require('../../media/i-lock-primary-password.svg')}
                                        />  
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="form-row m-footer">
                    <div className="col">
                        <div className="btn-group float-end">
                            <Button variant="secondary" className="btn btn-modal border-0" onClick={handleClose}>
                            Annuler
                            </Button>
                            <Button variant="primary" className="btn btn-modal" onClick={handleEmailSubmit}>
                            Modifier
                            </Button>
                        </div>
                    </div>
                </Modal.Footer>
            </section>
        </Modal>
        </>
     );
}
 
export default ProfilePage;