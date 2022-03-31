import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../../components/forms/Field';
import FormContentLoader from '../../components/loaders/FormContentLoader';
import destinationsAPI from '../../services/destinationsAPI';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import axios from 'axios';
import './AdminTravelPage.css';
import Select from '../../components/forms/Select';
import TextArea from '../../components/forms/TextArea';

const AdminTravelPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { id = "new" } = params;

    const [currentPage, setCurrentPage] = useState(1);
    const [destinations, setDestinations] = useState([]);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [travel, setTravel] = useState({
        title: "",
        description: "",
        type: "Croisières",
        days: "",
        nights: "",
        amount: "",
        filePath: null,
        destinations: "",
    });
    
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        type: "",
        days: "",
        nights: "",
        amount: ""
    });

    const fetchTravel = async (id) => {
        try {
          const { title, description, type, days, nights, amount, filePath, destinations } = await axios.get("https://127.0.0.1:8000/api/travel" + "/" + id).then((response) => response.data);
          setTravel({ title, description, type, days, nights, amount, filePath, destinations });
        } catch (error) {
          toast.error("Le voyage n'a pas pu être chargé");
          navigate("/admin/travel");
        }
    };

    const fetchDestinations = async () => {
        try {
            const data = await destinationsAPI.findAll();
            const sortDestinations = data.sort((a, b) => a.country < b.country ? -1 : 1);
            setDestinations(sortDestinations);
            setLoading(false);

            if (!travel.destinations) setTravel({ ...travel, destinations: data[0].id });
        }   catch (error) {
            toast.error("Impossible de charger les destinations");
            navigate("/admin/travel");
        }
    };

    useEffect(() => {
        fetchDestinations();
    }, []);

    useEffect(() => {
        if (id !== "new") {
          setEditing(true);
          fetchTravel(id);
        }
    }, [id]);

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setTravel({ ...travel, [name]: value });
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            setErrors({});
            if (editing) {
                await axios.put("https://127.0.0.1:8000/api/travel" + "/" + id, {...travel, destinations: `/api/destinations/${travel.destinations}`})
                toast.success("Le voyage a bien été modifié");
            } else {
                await axios.post("https://127.0.0.1:8000/api/travel", {...travel, destinations: `/api/destinations/${travel.destinations}`});
                toast.success("Le voyage a bien été enregistré");
                navigate("/admin/travel");
            }
            
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
            {(!editing && <BreadCrumbs title={"Voyages"} link={"/admin/travel"} linkto={"Administration"} subtitle={"Création"}/>) || (
                <BreadCrumbs title={"Voyages"} link={"/admin/travel"} linkto={"Administration"} subtitle={"Modification"}/>
            )}
            <div className="container">
                <div className="mt-3 mb-3 d-flex justify-content-between align-items-center flex-wrap">
                    {(!editing && <h1 className="travels_h1">Création d'un voyage</h1>) || (
                        <h1 className="travels_h1">Modification d'un voyage</h1>
                    )}
                </div>
                {loading && <FormContentLoader />}
                {!loading && (
                <form className="travel-form mb-3" onSubmit={handleSubmit}>
                    <div className="row">
                        <Field
                            name="title"
                            label="Titre"
                            placeholder="Titre du voyage"
                            value={travel.title}
                            onChange={handleChange}
                            type="text"
                            error={errors.title}
                        />
                    </div>
                    <div className="row">
                        <Select
                            name="type"
                            label="Type de voyage"
                            value={travel.type}
                            onChange={handleChange}
                            error={errors.type}
                            classCss="col-md-6"
                        >
                            <option value="Croisières">Croisières</option>
                            <option value="Hotels">Hotels</option>
                            <option value="Locations">Locations</option>
                        </Select>
                        <Field
                            name="amount"
                            label="Montant"
                            value={travel.amount}
                            onChange={handleChange}
                            type="number"
                            error={errors.amount}
                            classCss="col-md-6"
                        />
                    </div>
                    <div className="row">
                        <Field
                            name="days"
                            label="Nombre de jours"
                            value={travel.days}
                            onChange={handleChange}
                            type="number"
                            error={errors.days}
                            classCss="col-md-6"
                        />
                        <Field
                            name="nights"
                            label="Nombre de nuits"
                            value={travel.nights}
                            onChange={handleChange}
                            type="number"
                            error={errors.nights}
                            classCss="col-md-6"
                        />
                    </div>
                    <div className="row">
                        <Select
                        name="destinations"
                        label="Destination"
                        value={travel.destinations}
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
                    <TextArea
                        name="description"
                        label="Description du voyage"
                        value={travel.description}
                        onChange={handleChange}
                        error={errors.description}
                    />
                    <div className="form-group mt-3">
                        <button type="submit" className="btn btn-success">
                        Enregistrer
                        </button>
                        <Link to="/admin/travel" className="btn btn-link">
                        Retour à la liste
                        </Link>
                    </div>
                </form>
                )}
            </div>
        </main>
        </>
    );
}
 
export default AdminTravelPage;