import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import TableLoader from "../../components/loaders/TableLoader";
import Pagination from "../../components/Pagination";
import SearchBar from '../../components/searchbar/SearchBar';
import TableAdminDestinations from '../../components/tableAdminDestinations/TableAdminDestinations';
import destinationsAPI from '../../services/destinationsAPI';
import "./AdminDestinationsPage.css";

const AdminDestinationsPage = () => {
    AOS.init({
        duration: 1000
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [destinations, setDestinations] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchDestinations = async () => {
        try {
            const data = await destinationsAPI.findAll();
            setDestinations(data);
            setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger les destinations");
        }
    }

    useEffect(() => {
        fetchDestinations();
    }, []);

    // Page change management
    const handlePageChange = (page) => setCurrentPage(page);
    const itemsPerPage = 10;

    // delete management
    const handleDelete = async (id) => {
        const originalDestinations = [...destinations];
        setDestinations(
            destinations.filter((destination) => destination.id !== id)
        );
        try {
            await destinationsAPI.delete(id);
            toast.success("La destination a bien été supprimée");
        } catch (error) {
            setDestinations(originalDestinations);
            toast.error("La suppression de la destination n'a pas pu fonctionner");
        }
    }

    // Gestion de la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    const filteredDestinations = destinations.filter(
        (destination) => 
            destination.title.toLowerCase().includes(search.toLowerCase()) ||
            destination.country.toLowerCase().includes(search.toLowerCase()) ||
            destination.continent.toLowerCase().includes(search.toLowerCase()) ||
            destination.city.toLowerCase().includes(search.toLowerCase())
    )

    const paginatedDestinations = Pagination.getData(
        filteredDestinations,
        currentPage,
        itemsPerPage
    )

    return ( 
        <>
        <main id='main'>
            <BreadCrumbs title={"Destinations"} link={"/"} linkto={"Accueil"} subtitle={"Administration"}/>
            <div className="container" data-aos="fade-up">
                <div className="mt-3 mb-3 d-flex justify-content-between align-items-center flex-wrap">
                    <h1 className="destinations_h1">Liste des destinations</h1>
                    <Link
                    to="/admin/destination/new"
                    className="btn login-btn destination_button"
                    >
                    Créer une destination
                    </Link>
                </div>
                <SearchBar handleSearch={handleSearch} search={search}/>
                {!loading && (
                    <TableAdminDestinations
                    paginatedDestinations={paginatedDestinations}
                    handleDelete={handleDelete}
                    />
                )}
                {loading && <TableLoader />}
                {itemsPerPage < filteredDestinations.length && (
                    <Pagination 
                    currentPage={currentPage} 
                    itemsPerPage={itemsPerPage} 
                    length={filteredDestinations.length} 
                    onPageChanged={handlePageChange} 
                    />
                )}
            </div>
        </main>
        </>
     );
}
 
export default AdminDestinationsPage;