import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import CarouselImageUpload from "../../components/imageUpload/CarouselImageUpload";
import FormContentLoader from '../../components/loaders/FormContentLoader';
import imagesAPI from '../../services/imagesAPI';
import travelsAPI from '../../services/travelsAPI';
import "./AdminImagePage.css";

const AdminImagePage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { id } = params;

    const [errors, setErrors] = useState({
        file: ""
    });
    const [images, setImages] = useState([]);
    const [inputId, setInputId] = useState("");
    const [isSelected, setIsSelected] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState();
    const [travel, setTravel] = useState({
        title: "",
        destinations: "",
        images: []
    });

    const fetchTravel = async (id) => {
        try {
          const { title, destinations, images } = await travelsAPI.find(id);
          setTravel({ title, destinations, images });
          setLoading(false);
        } catch (error) {
          toast.error("Le voyage n'a pas pu être chargé");
          navigate("/admin/images");
        }
    };

    const fetchImages = async () => {
        try {
            const data = await imagesAPI.findAll();
            setImages(data);
            setLoading(false);
        } catch (error) {
            toast.error("Les carousels n'ont pas pu être chargés");
            navigate("/admin/images");
        }
    }

    useEffect(() => {
        let cancel = false;
        if (cancel) return;
        fetchTravel(id);
        return () => {
            cancel = true;
        }
    }, [id]);

    useEffect(() => {
      fetchImages();
    }, []);

    const refreshPage = () => {
        window.location.reload(false);
    }   

    const handleCreateCarousel = async event => {
        event.preventDefault();
        try {
            await imagesAPI.createCarousel(images, id);
            refreshPage();
        } catch (error) {
            toast.error("Le carousel n'a pas pu être créé");
        }
    }

    const clickDelete = async (event) => {
        event.preventDefault();
        const id = event.target.value;
        try {
            await imagesAPI.deleteCarousel(id);
            refreshPage();
            toast.success("L'image du carousel a bien été supprimée");
        } catch (error) {
            toast.error("La suppression de l'image n'a pas pu fonctionner");
        }
    }

    // Manage image
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        const inputId = event.target.id;
        setInputId(inputId);
		setIsSelected(true);
    }

    const handleClick = async (event) => {
        event.preventDefault();
        const id = event.target.value;

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            setErrors({});
            await imagesAPI.updateImage(id, formData);
            refreshPage();
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
                <form className="image-form mb-3" onSubmit={handleCreateCarousel}>
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
                        <button type="submit" className="btn btn-success">
                            Insérer une image
                        </button>
                    </div>
                </form>
                <CarouselImageUpload
                travel={travel}
                changeHandler={changeHandler}
                errors={errors}
                handleClick={handleClick}
                inputId={inputId}
                clickDelete={clickDelete}
                isSelected={isSelected}
                selectedFile={selectedFile}
                />
            </div>
        </main>
        </>
    );
}
 
export default AdminImagePage;