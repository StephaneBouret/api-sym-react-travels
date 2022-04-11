import React, { useEffect, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import slugify from 'react-slugify';
import { toast } from 'react-toastify';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import Field from '../../components/forms/Field';
import FileField from '../../components/forms/FileField';
import continentsAPI from '../../services/continentsAPI';

const AdminContinentPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { id = "new" } = params;
    const [continents, setContinents] = useState({
        name: "",
        slug: "",
        filePath: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        file: ""
    });
    const [editing, setEditing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [selectedFile, setSelectedFile] = useState();

    const fetchContinent = async (id) => {
        try {
          const { name, filePath, slug } = await continentsAPI.find(id);
          setContinents({ name, filePath, slug });
        } catch (error) {
          toast.error("Le continent n'a pas pu être chargé");
          navigate("/admin/continents");
        }
    };

    useEffect(() => {
        if (id !== "new") {
          setEditing(true);
          fetchContinent(id);
        }
    }, [id]);

    useEffect(() => {
        let cancel = false;
        if (cancel) return;
        setContinents({...continents, slug: slugify(continents.name)})
        return () => {
            cancel = true;
        }
    }, [continents.name])
    

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setContinents({ ...continents, [name]: value });
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            setErrors({});
            if (editing) {
                await continentsAPI.update(id, continents)
                toast.success("Le continent a bien été modifié");
            } else {
                await continentsAPI.create(continents);
                toast.success("Le continent a bien été créé");
                navigate("/admin/continents");
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

    // Gestion de l'image
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
            await continentsAPI.updateImage(id, formData);
            toast.success("L'image est bien téléchargée");
            navigate("/admin/continents");
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
        {(!editing && <BreadCrumbs title={"Continents"} link={"/admin/continents"} linkto={"Administration"} subtitle={"Création"}/>) || (
                <BreadCrumbs title={"Continents"} link={"/admin/continents"} linkto={"Administration"} subtitle={"Modification"}/>
        )}
        <div className="container">
            <div className="mt-3 mb-3 d-flex justify-content-between align-items-center flex-wrap">
                {(!editing && <h1 className="travels_h1">Création d'un continent</h1>) || (
                    <h1 className="travels_h1">Modification d'un continent</h1>
                )}
            </div>
            <form className="travel-form mb-3" onSubmit={handleSubmit}>
                <div className="row">
                    <Field
                        name="name"
                        label="Continent"
                        placeholder="Nom du continent"
                        value={continents.name}
                        onChange={handleChange}
                        type="text"
                        error={errors.name}
                        classCss="col-md-6"
                    />
                    <div className="form-group mt-3">
                        <button type="submit" className="btn btn-success">
                        Enregistrer
                        </button>
                        <Link to="/admin/continents" className="btn btn-link">
                        Retour à la liste
                        </Link>
                    </div>
                </div>
            </form>
            {editing && (
                <form className="travel-form mb-3" onSubmit={handleSubmission}>
                    <div className="form-group">
                        {(continents.filePath && 
                            <div className="edit-img mb-3">
                                <img 
                                src={continents.filePath}
                                onClick={() => setIsOpen(true)}
                                />
                                {isOpen && (
                                    <Lightbox
                                    mainSrc={continents.filePath}
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
        </div>
        </main>
        </>
     );
}
 
export default AdminContinentPage;