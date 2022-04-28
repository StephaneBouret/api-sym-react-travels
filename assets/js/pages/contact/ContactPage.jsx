import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useRef, useState } from 'react';
import {
    GoogleReCaptcha, GoogleReCaptchaProvider
} from "react-google-recaptcha-v3";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../../components/forms/Field';
import FieldContact from '../../components/forms/FieldContact';
import Select from '../../components/forms/Select';
import TextArea from '../../components/forms/TextArea';
import InfosPageContact from '../../components/infosPageContact/InfosPageContact';
import ScrollButton from '../../components/scrollButton/ScrollButton';
import SmallBreadCrumbsContact from '../../components/smallbreadcrumbs/SmallBreadCrumbsContact';
import contactsAPI from '../../services/contactsAPI';
import destinationsAPI from '../../services/destinationsAPI';
import "./ContactPage.css";

const ContactPage = () => {
    AOS.init({
        duration: 1000
    });

    const navigate = useNavigate();

    const [destinations, setDestinations] = useState([]);
    const [isValidToken, setIsValidToken] = useState();
    const [query, setQuery] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        destinations: "",
        checkInDate: "",
        duration: 0,
        numberAdult: 0,
        numberChildren: 0,
        budget: 0,
        content: ""
    });
    const [errors, setErrors] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        duration: "",
        numberAdult: "",
        numberChildren: "",
        budget: "",
        content: ""
    });
    const titleRef = useRef(null);
    // jump to section
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

    const fetchDestinations = async () => {
        try {
            const data = await destinationsAPI.findAll();
            const sortDestinations = data.sort((a, b) => a.country < b.country ? -1 : 1);
            setDestinations(sortDestinations);

            if (!query.destinations) setQuery({ ...query, destinations: data[0].id });
        }   catch (error) {
            toast.error("Impossible de charger les destinations");
            navigate("/");
        }
    };

    useEffect(() => {
        let cancel = false;
        if (cancel) return;
        fetchDestinations();
        return () => {
            cancel = true;
        }
    }, []);

    // onclick scroll to div react
    const scrollToView = () => scrollToRef(titleRef);

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setQuery({ ...query, [name]: value });
    };

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            setErrors({});
            await contactsAPI.create(query);
            toast.success("Votre demande a bien été envoyée");
            navigate("/");
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
        <section id="page-contact" className="contact position-relative">
            <img src={require("../../../media/contact-bg.webp")} className="img-contact img-fluid"/>
            <div className="title-contact" data-aos="fade-up" data-aos-once="true">
                <h2>Demande de devis</h2>
            </div>
            <Link to={{}} className="inspire-btn scrollButton" onClick={scrollToView}></Link>
        </section>
        <main>
            <SmallBreadCrumbsContact link={"/"} linkName={"Accueil"} secondTitle={"Demande de devis"}/>
            <section className="collection-contact" ref={titleRef}>
                <div className="container">
                    <div className="row">
                        <InfosPageContact/>
                        <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
                            <form className="contact-form" onSubmit={handleSubmit}>
                            <GoogleReCaptcha onVerify={(token) => handleReCaptchaVerify(token)} />
                                <div className="row">
                                    <Field
                                    name="firstname"
                                    label="Prénom *"
                                    placeholder='Votre prénom'
                                    type="text"
                                    value={query.firstname}
                                    onChange={handleChange}
                                    classCss="col-md-6"
                                    error={errors.firstname}
                                    />
                                    <Field
                                    name="lastname"
                                    label="Nom *"
                                    placeholder='Votre nom'
                                    type="text"
                                    value={query.lastname}
                                    onChange={handleChange}
                                    classCss="col-md-6"
                                    error={errors.lastname}
                                    />
                                </div>
                                <div className="row">
                                    <Field
                                    name="phone"
                                    label="Téléphone *"
                                    placeholder="Votre téléphone"
                                    type='tel'
                                    value={query.phone}
                                    onChange={handleChange}
                                    classCss="col-md-6"
                                    error={errors.phone}
                                    />
                                    <Field
                                    name="email"
                                    label="Email *"
                                    placeholder="Votre email"
                                    type='email'
                                    value={query.email}
                                    onChange={handleChange}
                                    classCss="col-md-6"
                                    error={errors.email}
                                    />
                                </div>
                                <div className="row">
                                    <Select
                                    name="destinations"
                                    label="Destination *"
                                    value={query.destinations}
                                    onChange={handleChange}
                                    classCss="col-md-6"
                                    >
                                    {destinations.map(destination => (
                                        <option key={destination.id} value={destination.id}>
                                            {destination.country}
                                        </option>
                                    ))}
                                    </Select>
                                </div>
                                <div className="row">
                                    <Field
                                    name="checkInDate"
                                    label="Date de départ"
                                    type="date"
                                    value={query.checkInDate}
                                    onChange={handleChange}
                                    classCss="col-md-6"
                                    />
                                    <FieldContact
                                    name="duration"
                                    label="Durée (nuits)"
                                    type="number"
                                    placeholder='nuit(s)'
                                    value={query.duration}
                                    onChange={handleChange}
                                    classCss="col-md-6"
                                    error={errors.duration}
                                    min={0}
                                    />
                                </div>
                                <div className="row">
                                    <FieldContact
                                    name="numberAdult"
                                    label="Nombre d'adulte"
                                    type="number"
                                    value={query.numberAdult}
                                    onChange={handleChange}
                                    error={errors.numberAdult}
                                    classCss="col-md-6"
                                    min={0}
                                    />
                                    <FieldContact
                                    name="numberChildren"
                                    label="Nombre d'enfant"
                                    type="number"
                                    value={query.numberChildren}
                                    onChange={handleChange}
                                    error={errors.numberChildren}
                                    classCss="col-md-6"
                                    min={0}
                                    />
                                </div>
                                <div className="row">
                                    <FieldContact
                                    name="budget"
                                    label="Budget / pers. €"
                                    type="number"
                                    placeholder='€'
                                    value={query.budget}
                                    onChange={handleChange}
                                    classCss="col-md-6"
                                    error={errors.budget}
                                    min={0}
                                    />
                                </div>
                                <div className="row">
                                    <TextArea
                                    name="content"
                                    label="Message *"
                                    value={query.content}
                                    onChange={handleChange}
                                    error={errors.content}
                                    />
                                    <p className="text-end"> * Champs obligatoires</p>
                                </div>
                                <div className="form-group mt-3">
                                    <button type="submit" className="btn btn-success">
                                    Envoyer votre demande
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <ScrollButton/>
        </main>
        </>
        </GoogleReCaptchaProvider>
     );
}
 
export default ContactPage;