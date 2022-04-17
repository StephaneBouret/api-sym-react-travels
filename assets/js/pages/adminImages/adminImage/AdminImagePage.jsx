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
import Field from '../../components/forms/Field';
import FileField from '../../components/forms/FileField';

const AdminImagePage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { id } = params;

    const [errors, setErrors] = useState({
        file: ""
    });
    const [isSelected, setIsSelected] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState();
    const [travel, setTravel] = useState({
        title: "",
        destinations: "",
        images: [],
        fileUrl: ""
    });
    const [visible, setVisible] = useState(false);
    console.log(travel);

    const fetchTravel = async (id) => {
        try {
          const { title, destinations, images } = await travelsAPI.find(id);
          setTravel({ title, destinations, fileUrl: images.fileUrl, images });
          setLoading(false);
        } catch (error) {
          toast.error("Le voyage n'a pas pu être chargé");
          navigate("/admin/images");
        }
    };

    useEffect(() => {
        let cancel = false;
        if (cancel) return;
        fetchTravel(id);
        return () => {
            cancel = true;
        }
    }, [id]);

    const onCreateCarousel = () => {
        setVisible(true);
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
            <BreadCrumbs title={"Carousel"} link={"/admin/images"} linkto={"Administration"} subtitle={"Création"}/>
            <div className="container">
                <div className="mt-3 mb-3 d-flex justify-content-between align-items-center flex-wrap">
                    <h1 className="images_h1">Modification du carousel du voyage</h1>
                </div>
                {loading && <FormContentLoader />}
                <form className="image-form mb-3" onSubmit={handleSubmission}>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <div className="inline-block">Titre du voyage</div>
                            <div className="text-carousel">
                                {travel.title}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <div className="inline-block">Titre du voyage</div>
                            <div className="text-carousel">
                                {travel.destinations.country}
                            </div>
                        </div>
                    </div>
                    <div className="form-group mt-3">
                        <button className="btn btn-carousel" onClick={onCreateCarousel}>
                            Créer le carousel
                        </button>
                    </div>
                    {visible && (
                    <div className="row">
                        <div className="form-group col-md-6">
                            <FileField
                            name={"file"}
                            onChange={changeHandler}
                            error={errors.file}
                            />
                            <div className="tags-img mt-2">
                            {isSelected ? (
                            <>
                                <p>Type : {selectedFile.type}</p>
                                <p>Taille en octets : {selectedFile.size}</p>
                            </>
                            ) : (
                                <p>Merci de sélectionner un fichier</p>
                            )}
                            </div>
                        </div>
                    </div>
                    )}
                    <div className="form-group mt-3">
                        <button type="submit" className="btn btn-success">
                        Enregistrer
                        </button>
                        <Link to="/admin/images" className="btn btn-link">
                        Retour à la liste
                        </Link>
                    </div>
                </form>
            </div>
        </main>
        </>
    );
}
 
export default AdminImagePage;