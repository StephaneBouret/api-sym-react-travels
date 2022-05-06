import React, { useEffect, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import slugify from 'react-slugify';
import { toast } from 'react-toastify';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import Field from '../../components/forms/Field';
import FileField from '../../components/forms/FileField';
import ScrollButton from '../../components/scrollButton/ScrollButton';
import travelsAPI from '../../services/travelsAPI';
import wishesAPI from '../../services/wishesAPI';

const AdminWishPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { id = "new" } = params;

    const [travels, setTravels] = useState([]);
    const [wish, setWish] = useState({
        name: "",
        slug: "",
        fileUrl: "",
        travels: []
    });
    const [errors, setErrors] = useState({
        name: "",
        file: ""
    });

    const [editing, setEditing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [selectedFile, setSelectedFile] = useState();

    const fetchWish = async (id) => {
        try {
          const { name, fileUrl, slug, travels } = await wishesAPI.find(id);
          setWish({ name, fileUrl, slug, travels });
        } catch (error) {
          toast.error("L'envie n'a pas pu être chargé");
          navigate("/admin/wishes");
        }
    };

    const fetchTravels = async () => {
        try {
            const data = await travelsAPI.findAll();
            setTravels(data);
        } catch (error) {
            toast.error("Les voyages n'ont pas pu être chargés");
            navigate("/admin/wishes");
        }
    };

    useEffect(() => {
        if (id !== "new") {
          setEditing(true);
          fetchWish(id);
          fetchTravels();
        }
    }, [id]);

    useEffect(() => {
        let cancel = false;
        if (cancel) return;
        setWish({...wish, slug: slugify(wish.name)})
        return () => {
            cancel = true;
        }
    }, [wish.name]);

    const travelsByWish = wish.travels;
    let options = travels.map((travel) => {
        return {
            value: travel.id,
            label: travel.id + " - " + travel.title + " - " + travel.destinations.country
        }
    });

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setWish({ ...wish, [name]: value });
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            setErrors({});
            if (editing) {
                await wishesAPI.update(id, wish);
                toast.success("L'envie a bien été modifiée");
            } else {
                await wishesAPI.create(wish);
                toast.success("L'envie a bien été créée");
                navigate("/admin/wishes");
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
    };

    // Gestion de l'image
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
		setIsSelected(true);
    };

    const handleSubmission = async event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            setErrors({});
            await wishesAPI.updateImage(id, formData);
            toast.success("L'image est bien téléchargée");
            navigate("/admin/wishes");
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

    const handleChangeSelect = (event) => {
        let sel = event.map((e, index) => {
            return (`/api/travel/${e.value}`);
        });
        setWish({travels: sel});
    };

    const handleSubmitSelect = async event => {
        event.preventDefault();

        try {
            await wishesAPI.updateWishes(id, wish);
            toast.success("Les modifications ont bien été prises en compte");
            navigate("/admin/wishes");
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <>
        <main id='main'>
        {(!editing && <BreadCrumbs title={"Envies"} link={"/admin/wishes"} linkto={"Administration"} subtitle={"Création"}/>) || (
                <BreadCrumbs title={"Envies"} link={"/admin/wishes"} linkto={"Administration"} subtitle={"Modification"}/>
        )}
        <div className="container">
            <div className="mt-3 mb-3 d-flex justify-content-between align-items-center flex-wrap">
                {(!editing && <h1 className="travels_h1">Création d'une envie</h1>) || (
                    <h1 className="travels_h1">Modification d'une envie</h1>
                )}
            </div>
            <form className="travel-form mb-3" onSubmit={handleSubmit}>
                <div className="row">
                    <Field
                        name="name"
                        label="Nom"
                        placeholder="Nom de l'envie"
                        value={wish.name}
                        onChange={handleChange}
                        type="text"
                        error={errors.name}
                        classCss="col-md-6"
                    />
                    <div className="form-group mt-3">
                        <button type="submit" className="btn btn-success">
                        Enregistrer
                        </button>
                        <Link to="/admin/wishes" className="btn btn-link">
                        Retour à la liste
                        </Link>
                    </div>
                </div>
            </form>
            {editing && (
                <form className="travel-form mb-3" onSubmit={handleSubmission}>
                    <div className="form-group">
                        {(wish.fileUrl && 
                            <div className="edit-img mb-3">
                                <img 
                                src={wish.fileUrl}
                                onClick={() => setIsOpen(true)}
                                />
                                {isOpen && (
                                    <Lightbox
                                    mainSrc={wish.fileUrl}
                                    onCloseRequest={() => setIsOpen(false)}
                                    />
                                )}
                            </div>
                        ) || (<h5>Aucune image</h5>)}
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
                        <div className="form-group mt-3">
                            <button type="submit" className="btn btn-success">
                                Enregistrer
                            </button>
                        </div>
                    </div>
                </form>
            )}
            <form className="travel-form mb-3" onSubmit={handleSubmitSelect}>
                <div className="row">
                    <div className="col-md-6">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Id.</th>
                                    <th>Titre du voyage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {travelsByWish.map((travel) => (
                                    <tr key={travel.id}>
                                        <td data-label="Id." className="align-middle">{travel.id}</td>
                                        <td data-label="Titre" className="align-middle">{travel.title}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-6">
                        <Select
                        isMulti
                        options={options}
                        onChange={handleChangeSelect}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <button type="submit" className="btn btn-success">
                        Enregistrer
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <ScrollButton/>
        </main>
        </>
     );
}
 
export default AdminWishPage;