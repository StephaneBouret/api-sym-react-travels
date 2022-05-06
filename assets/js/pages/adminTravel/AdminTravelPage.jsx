import axios from "axios";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import React, { useEffect, useState } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import EditorWysiwyg from '../../components/editorWysiwyg/EditorWysiwyg';
import Field from '../../components/forms/Field';
import LimitedTextArea from "../../components/forms/LimitedTextArea";
import LimitedWordTextarea from '../../components/forms/LimitedWordTextarea';
import Select from '../../components/forms/Select';
import TextArea from '../../components/forms/TextArea';
import ImageUpload from "../../components/imageUpload/ImageUpload";
import FormContentLoader from '../../components/loaders/FormContentLoader';
import ScrollButton from '../../components/scrollButton/ScrollButton';
import destinationsAPI from '../../services/destinationsAPI';
import travelsAPI from '../../services/travelsAPI';
import './AdminTravelPage.css';

const AdminTravelPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { id = "new" } = params;

    const [destinations, setDestinations] = useState([]);
    const [description, setDescription] = useState({
        htmlValue: "<p></p>\n",
        editorState: EditorState.createEmpty()
    });
    const [editing, setEditing] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState();
    const [travel, setTravel] = useState({
        title: "",
        description: "",
        type: "Croisières",
        days: "",
        nights: "",
        amount: "",
        fileUrl: null,
        destinations: "",
        theMost: "",
        capacity: "",
        style: "",
        hobbies: "",
        arroundTrip: "",
        situation: "",
        lat: "",
        lng: ""
    });
    const [textAreaCount, setTextAreaCount] = useState(0);
    const [limit, setLimit] = useState(25);
    const [limitCar, setLimitCar] = useState(650);
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        type: "",
        days: "",
        nights: "",
        amount: "",
        file: "",
        theMost: "",
        capacity: "",
        style: "",
        hobbies: "",
        arroundTrip: "",
        situation: "",
        lat: "",
        lng: ""
    });
    const [wishes, setWishes] = useState([]);

    const fetchTravel = async (id) => {
        try {
          const { title, description, type, days, nights, amount, fileUrl, destinations, theMost, capacity, style, hobbies, arroundTrip, situation, lat, lng } = await travelsAPI.find(id);
          setTravel({ title, description, type, days, nights, amount, fileUrl, destinations: destinations.id, theMost, capacity, style, hobbies, arroundTrip, situation, lat, lng });
          setTextAreaCount((theMost.split(' ').filter(Boolean)).length);
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

            // if (!travel.destinations) setTravel({ ...travel, destinations: data[0].id });
        }   catch (error) {
            toast.error("Impossible de charger les destinations");
            navigate("/admin/travel");
        }
    };

    useEffect(() => {
        fetchDestinations();
    }, []);

    useEffect(() => {
        let cancel = false;
        if (cancel) return;
        if (id !== "new") {
          setEditing(true);
          fetchTravel(id);
        }
        return () => {
            cancel = true;
        }
    }, [id]);

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setTravel({ ...travel, [name]: value });
    };

    // Gestion de la limite de mots dans le textArea "Les Plus"
    const setFormattedContent = ({ currentTarget }) => {
        const { value } = currentTarget;
        const words = value.split(' ').filter(Boolean);
        const content = words.slice(0, limit).join(' ');
        if (words.length > limit) {
            setTravel({...travel, theMost: content});
            setTextAreaCount(limit);
        } else {
            setTravel({ ...travel, theMost: value});
            setTextAreaCount(words.length);
        }
    };    

    // Gestion du nombre de caractères max dans le textArea "Autour du voyage"
    const setFormattedContentTrip = ({ currentTarget }) => {
        const { value } = currentTarget;
        const text = value.slice(0, limitCar);
        setTravel({...travel, arroundTrip: text});
    };

    // Gestion du nombre de caractères max dans le textArea "Situation du voyage"
    const setFormattedContentSituation = ({ currentTarget }) => {
        const { value } = currentTarget;
        const text = value.slice(0, limitCar);
        setTravel({...travel, situation: text});
    };

    // Editor Wysiwyg
    const onEditorStateChange = editorValue => {
        const editorStateInHtml = draftToHtml(
          convertToRaw(editorValue.getCurrentContent())
        );
    
        setDescription({
          htmlValue: editorStateInHtml,
          editorState: editorValue
        });
        setTravel({...travel, hobbies: description.htmlValue});
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            setErrors({});
            if (editing) {
                await travelsAPI.update(id, travel);
                toast.success("Le voyage a bien été modifié");
            } else {
                await travelsAPI.create(travel);
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

    // Manage image
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
		setIsSelected(true);
    }

    const handleSubmission = async event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            setErrors({});
            await travelsAPI.updateImage(id, formData);
            toast.success("L'image est bien téléchargée");
            navigate("/admin/travel");
        } catch ({ response }) {
            const { violations } = response.data;
            if (violations) {
                const apiErrors = {};
                violations.forEach(({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                    setErrors(apiErrors);
                })
            }
            toast.error("L'image n'a pas pu être téléchargée");
        }
    };

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
                        row="10"
                        error={errors.description}
                    />
                    <LimitedWordTextarea
                    name={"theMost"}
                    label="Les plus"
                    onChange={setFormattedContent}
                    value={travel.theMost}
                    error={errors.theMost}
                    limit={limit}
                    textAreaCount={textAreaCount}
                    />
                    <div className="row">
                        <TextArea
                        name={"style"}
                        label="Style"
                        value={travel.style}
                        onChange={handleChange}
                        error={errors.style}
                        row="3"
                        classCss="col-md-6"
                        />
                        <Field
                        name={"capacity"}
                        label="Capacité"
                        placeholder="Capacité de l'hôtel ou de la location"
                        value={travel.capacity}
                        onChange={handleChange}
                        type="text"
                        error={errors.capacity}
                        classCss="col-md-6"
                        />
                    </div>
                    <div className="row">
                        <Field
                            name="lat"
                            label="Lattitude"
                            value={travel.lat}
                            onChange={handleChange}
                            type="number"
                            error={errors.lat}
                            classCss="col-md-6"
                        />
                        <Field
                            name="lng"
                            label="Longitude"
                            value={travel.lng}
                            onChange={handleChange}
                            type="number"
                            error={errors.lng}
                            classCss="col-md-6"
                        />
                    </div>
                    <div className="row">
                        <EditorWysiwyg
                        description={description}
                        onEditorStateChange={onEditorStateChange}
                        travel={travel}
                        />
                    </div>
                    <div className="row">
                        <LimitedTextArea
                        name={"arroudTrip"}
                        label="Autour du voyage"
                        limitCar={limitCar}
                        value={travel.arroundTrip}
                        onChange={setFormattedContentTrip}
                        classCss="col-md-6"
                        error={errors.arroundTrip}
                        />
                        <LimitedTextArea
                        name={"situation"}
                        label="Situation du voyage"
                        limitCar={limitCar}
                        value={travel.situation}
                        onChange={setFormattedContentSituation}
                        classCss="col-md-6"
                        error={errors.situation}
                        />
                    </div>
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
                {editing && (
                    <ImageUpload
                    handleSubmission={handleSubmission}
                    changeHandler={changeHandler}
                    selectedFile={selectedFile}
                    isSelected={isSelected}
                    errors={errors}
                    travel={travel}
                    />
                )}
            </div>
            <ScrollButton/>
        </main>
        </>
    );
}
 
export default AdminTravelPage;