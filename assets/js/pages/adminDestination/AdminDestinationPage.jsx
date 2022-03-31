import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import Field from '../../components/forms/Field';
import TextArea from '../../components/forms/TextArea';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/searchbar/SearchBar';
import TableAdminCountries from '../../components/tableAdminCountries/TableAdminCountries';
import countriesAPI from '../../services/countriesAPI';
import destinationsAPI from '../../services/destinationsAPI';
import './AdminDestinationPage.css';

const AdminDestinationPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { id = "new" } = params;

    const [countries, setCountries] = useState([]);
    const [currentIdCountry, setCurrentIdCountry] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [destinations, setDestinations] = useState({
        title: "",
        description: "",
        country: "",
        city: "",
        continent: "",
        population: "",
        currency: "",
        filePath: ""
    })
    const [errors, setErrors] = useState({
        title: "", description: "", country: "", city: "", continent: "", population: "", currency: "",
    });
    const [editing, setEditing] = useState(false);
    const [search, setSearch] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const fetchCountries = async () => {
        try {
            const data = await countriesAPI.findAll();
            setCountries(data);
        } catch (error) {
            toast.error("Impossible de charger les pays");
        }
    }

    const fetchCountry = async (currentIdCountry) => {
        try {
            const { name, continent, capital, population, currency, iso } = await countriesAPI.find(currentIdCountry);
            setDestinations({...destinations, country: name, continent: continent, city: capital, population: population, currency: (currency + " (" + iso + ")")});
        } catch (error) {
            toast.error("Impossible de charger le pays");
        }
    }

    const fetchDestination = async (id) => {
        try {
            const { title, description, country, city, continent, population, currency, filePath } = await destinationsAPI.find(id);
            setDestinations({ title, description, country, city, continent, population, currency, filePath })
        } catch (error) {
            toast.error("La destination n'a pas pu être chargée");
            navigate("/admin/destinations");
        }
    }
    
    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            setIsVisible(true);
            fetchDestination(id);
        }
    }, [id]);

    useEffect(() => {
        if (currentIdCountry) {
            fetchCountry(currentIdCountry);
            setIsVisible(true);
        }
    }, [currentIdCountry]);

    // Gestion de la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    const filteredCountries = countries.filter(
        (country) => 
            country.name.toLowerCase().includes(search.toLowerCase()) ||
            country.continent.toLowerCase().includes(search.toLowerCase()) ||
            country.capital.toLowerCase().includes(search.toLowerCase())
    );

    // Page change management
    const handlePageChange = (page) => setCurrentPage(page);
    const itemsPerPage = 10;
    const paginatedCountries = Pagination.getData(
        filteredCountries,
        currentPage,
        itemsPerPage
    )

    const handleClick = (cid) => {
        setCurrentIdCountry(cid);
    }

    // Gestion des changements des inputs dans le formulaire
    function handleChange({ currentTarget }) {
        const { name, value } = currentTarget;
        setDestinations({ ...destinations, [name]: value });
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            setErrors({});

            if (editing) {
                await destinationsAPI.update(id, destinations);
                toast.success("La destination a bien été modifiée");
            } else {
                await destinationsAPI.create(destinations);
                toast.success("La destination a bien été créée");
                navigate("/admin/destinations");
            }
        } catch ({ response }) {
            const { violations } = response.data;
            if (violations) {
                const apiErrors = {};
                violations.forEach(({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                    // console.log(apiErrors);
                    setErrors(apiErrors);
                    toast.error("Des erreurs dans votre formulaire !");
                })
            }
        }
    }

    return ( 
        <>
        <main id='main'>
            {(!editing && <BreadCrumbs title={"Destinations"} link={"/admin/destinations"} linkto={"Administration"} subtitle={"Création"}/>) || (
                <BreadCrumbs title={"Destinations"} link={"/admin/destinations"} linkto={"Administration"} subtitle={"Modification"}/>
            )}
            <div className="container">
                <div className="mt-3 mb-3 d-flex justify-content-between align-items-center flex-wrap">
                    {(!editing && <h1 className="destinations_h1">Création d'une destination</h1>) || (
                        <h1 className="destinations_h1">Modification d'une destination</h1>
                    )}
                </div>
                {!editing && !isVisible &&(
                    <div>
                        <SearchBar handleSearch={handleSearch} search={search} />
                        <TableAdminCountries
                        paginatedCountries={paginatedCountries}
                        handleClick={handleClick}
                        />
                        {itemsPerPage < filteredCountries.length && (
                            <Pagination 
                            currentPage={currentPage} 
                            itemsPerPage={itemsPerPage} 
                            length={filteredCountries.length} 
                            onPageChanged={handlePageChange} 
                            />
                        )}
                    </div>
                )}
                {isVisible && (
                <form className="destination-form mb-3" onSubmit={handleSubmit}>
                    <div className="row">
                        <Field
                            name="title"
                            label="Titre"
                            placeholder="Titre de la destination"
                            value={destinations.title}
                            onChange={handleChange}
                            type="text"
                            error={errors.title}
                        />
                    </div>
                    <div className="row">
                        <Field
                            name="country"
                            label="Pays"
                            placeholder="Pays de la destination"
                            value={destinations.country}
                            onChange={handleChange}
                            type="text"
                            error={errors.continent}
                            classCss="col-md-6"
                        />
                        <Field
                            name="continent"
                            label="Continent"
                            placeholder="Continent de la destination"
                            value={destinations.continent}
                            onChange={handleChange}
                            type="text"
                            error={errors.country}
                            classCss="col-md-6"
                        />
                    </div>
                    <div className="row">
                        <Field
                            name="city"
                            label="Ville"
                            placeholder="Capitale de la destination"
                            value={destinations.city}
                            onChange={handleChange}
                            type="text"
                            error={errors.city}
                            classCss="col-md-6"
                        />
                        <Field
                            name={"population"}
                            label="Population"
                            placeholder="Population de la destination"
                            type='number'
                            value={destinations.population}
                            onChange={handleChange}
                            error={errors.population}
                            classCss="col-md-6"
                        />
                    </div>
                    <div className="row">
                        <Field
                            name="currency"
                            label="Devise"
                            placeholder="Devise de la destination"
                            value={destinations.currency}
                            onChange={handleChange}
                            error={errors.currency}
                            classCss="col-md-6"
                        />
                    </div>
                    <TextArea
                    name="description"
                    label="Description"
                    value={destinations.description}
                    onChange={handleChange}
                    error={errors.description}
                    />
                    <div className="form-group mt-3">
                        <button type="submit" className="btn btn-success">
                        Enregistrer
                        </button>
                        <Link to="/admin/destinations" className="btn btn-link">
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
 
export default AdminDestinationPage;