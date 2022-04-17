import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import Select from '../../components/forms/Select';
import FormContentLoader from '../../components/loaders/FormContentLoader';
import imagesAPI from '../../services/imagesAPI';
import travelsAPI from '../../services/travelsAPI';
import "./AdminImagePage.css";
import axios from 'axios';
import ImageUpload from '../../components/imageUpload/ImageUpload';
import SelectImage from '../../components/forms/SelectImage';

const AdminImagePage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { id = "new" } = params;

    const [editing, setEditing] = useState(false);
    const [errors, setErrors] = useState({
        file: ""
    });
    const [images, setImages] = useState({
        fileUrl: null,
        travels: ""
    });
    const [isSelected, setIsSelected] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState();
    const [travels, setTravels] = useState([]);

    const fetchTravels = async () => {
        try {
            const data = await travelsAPI.findAll();
            const sortTravels = data.sort((a, b) => a.destinations.country < b.destinations.country ? -1 : 1);
            setTravels(sortTravels);
            setLoading(false);

            // if (!images.travels) setImages({...images, travels: data[0].id});
        } catch (error) {
            toast.error("Impossible de charger les voyages");
            navigate("/admin/images");
        }
    };

    const fetchImage = async (id) => {
        try {
            const { fileUrl, travels } = await imagesAPI.find(id);
            setImages({ fileUrl, travels: travels.id });
        } catch (error) {
            toast.error("Le carousel n'a pas pu être chargé");
            navigate("/admin/images");
        }
    }

    useEffect(() => {
        fetchTravels();
    }, []);

    useEffect(() => {
        let cancel = false;
        if (cancel) return;
        if (id !== "new") {
          setEditing(true);
          fetchImage(id);
        }
        return () => {
            cancel = true;
        }
    }, [id]);

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setImages({ ...images, [name]: value });
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            setErrors({});

            await imagesAPI.create(images)
            toast.success("Le carousel a bien été enregistré");
            navigate("/admin/images");
            
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
            await imagesAPI.updateImage(id, formData);
            toast.success("L'image est bien téléchargée");
            navigate("/admin/images");
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
    }

    return ( 
        <>
        <main id='main'>
            {(!editing && <BreadCrumbs title={"Carousel"} link={"/admin/images"} linkto={"Administration"} subtitle={"Création"}/>) || (
                    <BreadCrumbs title={"Carousel"} link={"/admin/images"} linkto={"Administration"} subtitle={"Modification"}/>
            )}
            <div className="container">
                <div className="mt-3 mb-3 d-flex justify-content-between align-items-center flex-wrap">
                    {(!editing && <h1 className="images_h1">Création d'un carousel</h1>) || (
                        <h1 className="images_h1">Modification d'un carousel</h1>
                    )}
                </div>
                {loading && <FormContentLoader />}
                <form className="image-form mb-3" onSubmit={handleSubmit}>
                    <div className="row">
                        <SelectImage
                        name="travels"
                        label="Voyage"
                        value={images.travels}
                        onChange={handleChange}
                        classCss="col-md-6"
                        disabled={editing ? true : false}
                        >
                            {travels.map(travel => (
                                <option key={travel.id} value={travel.id}>
                                    {travel.title} - {travel.destinations.country}
                                </option>
                            ))}
                        </SelectImage>
                    </div>
                    {!editing && (
                    <div className="form-group mt-3">
                        <button type="submit" className="btn btn-success">
                        Enregistrer
                        </button>
                        <Link to="/admin/images" className="btn btn-link">
                        Retour à la liste
                        </Link>
                    </div>
                    )}
                </form>
                {editing && (
                    <ImageUpload
                    changeHandler={changeHandler}
                    handleSubmission={handleSubmission}
                    selectedFile={selectedFile}
                    isSelected={isSelected}
                    errors={errors}
                    travel={images}
                    />
                )}
            </div>
        </main>
        </>
    );
}
 
export default AdminImagePage;