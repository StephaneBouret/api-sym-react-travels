import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import TableLoader from "../../components/loaders/TableLoader";
import Pagination from "../../components/Pagination";
import SearchBar from '../../components/searchbar/SearchBar';
import TableAdminTravels from '../../components/tableAdminTravels/TableAdminTravels';
import travelsAPI from '../../services/travelsAPI';
import './AdminTravelsPage.css';

const AdminTravelsPage = () => {
    AOS.init({
        duration: 1000
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [travels, setTravels] = useState([]);
    const [search, setSearch] = useState("");

    const fetchTravels = async () => {
        try {
            const data = await travelsAPI.findAll();
            setTravels(data);
            setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger les voyages");
        }
    }

    useEffect(() => {
        fetchTravels();
    }, []);

    // delete management
    const handleDelete = async (id) => {
        const originalTravels = [...travels];
        setTravels(
            travels.filter((travel) => travel.id !== id)
        );
        try {
            await travelsAPI.delete(id);
            toast.success("Le voyage a bien été supprimé");
        } catch (error) {
            setTravels(originalTravels);
            toast.error("La suppression du voyage n'a pas pu fonctionner");
        }
    }

    // Gestion de la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    const filteredTravels = travels.filter(
        (travel) => 
            travel.title.toLowerCase().includes(search.toLowerCase()) ||
            travel.type.toLowerCase().includes(search.toLowerCase()) ||
            travel.destinations.country.toLowerCase().includes(search.toLowerCase())
    )

    // Gestion du changement de page
    const handlePageChange = (page) => setCurrentPage(page);
    const itemsPerPage = 10;
    const paginatedTravels = Pagination.getData(
        filteredTravels,
        currentPage,
        itemsPerPage
    )

    return ( 
        <>
        <main id='main'>
        <BreadCrumbs title={"Voyages"} link={"/"} linkto={"Accueil"} subtitle={"Administration"} />
            <div className="container" data-aos="fade-up">
                <div className="mt-3 mb-3 d-flex justify-content-between align-items-center flex-wrap">
                    <h1 className="travels_h1">Liste des voyages</h1>
                    <Link
                    to="/admin/travel/new"
                    className="btn login-btn travel_button"
                    >
                    Créer un voyage
                    </Link>
                </div>
                <SearchBar handleSearch={handleSearch} search={search}/>
                {!loading && (
                    <TableAdminTravels
                    paginatedTravels={paginatedTravels}
                    handleDelete={handleDelete}
                    />
                )}
                {loading && <TableLoader />}
                {itemsPerPage < filteredTravels.length && (
                    <Pagination 
                    currentPage={currentPage} 
                    itemsPerPage={itemsPerPage} 
                    length={filteredTravels.length} 
                    onPageChanged={handlePageChange} 
                    />
                )}
            </div>
        </main>
        </>
     );
}
 
export default AdminTravelsPage;