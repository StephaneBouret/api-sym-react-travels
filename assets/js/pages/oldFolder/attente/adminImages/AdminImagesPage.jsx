import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import TableLoader from "../../components/loaders/TableLoader";
import Pagination from "../../components/Pagination";
import SearchBar from '../../components/searchbar/SearchBar';
import TableAdminImages from '../../components/tableAdminImages/TableAdminImages';
import travelsAPI from '../../services/travelsAPI';
import "./AdminImagesPage.css";

const AdminImagesPage = () => {
    AOS.init({
        duration: 1000
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [travels, setTravels] = useState([]);

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

    // Gestion de la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    const filteredTravels = travels.filter(
        (travel) => 
            travel.title.toLowerCase().includes(search.toLowerCase()) ||
            travel.destinations.country.toLowerCase().includes(search.toLowerCase())
    )

    // Gestion du changement de page
     const handlePageChange = (page) => setCurrentPage(page);
     const itemsPerPage = 10;
     const paginatedTravels = Pagination.getData(
         filteredTravels,
         currentPage,
         itemsPerPage
     );

    return ( 
        <>
        <main id='main'>
        <BreadCrumbs title={"Carousel"} link={"/"} linkto={"Accueil"} subtitle={"Administration"} />
            <div className="container" data-aos="fade-up">
                <div className="mt-3 mb-3 d-flex justify-content-between align-items-center flex-wrap">
                    <h1 className="images_h1">Liste des voyages (Carousel)</h1>
                </div>
                <SearchBar handleSearch={handleSearch} search={search}/>
                {!loading && (
                    <TableAdminImages
                    paginatedTravels={paginatedTravels}
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
 
export default AdminImagesPage;