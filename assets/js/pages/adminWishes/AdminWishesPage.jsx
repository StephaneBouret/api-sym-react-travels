import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import TableLoader from "../../components/loaders/TableLoader";
import Pagination from "../../components/Pagination";
import ScrollButton from '../../components/scrollButton/ScrollButton';
import SearchBar from '../../components/searchbar/SearchBar';
import TableAdminWishes from '../../components/tableAdminWishes/TableAdminWishes';
import wishesAPI from '../../services/wishesAPI';

const AdminWishesPage = () => {
    AOS.init({
        duration: 1000
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [wishes, setWishes] = useState([]);

    const fetchWishes = async () => {
        try {
            const data = await wishesAPI.findAll();
            setWishes(data);
            setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger les envies");
        }
    };

    useEffect(() => {
        fetchWishes();
    }, []);

    useEffect(() => {
        return () => {};
    }, []);

    // Page change management
    const handlePageChange = (page) => setCurrentPage(page);
    const itemsPerPage = 10;

    // delete management
    const handleDelete = async (id) => {
        const originalWishes = [...wishes];
        setWishes(
            wishes.filter((whish) => whish.id !== id)
        );
        try {
            await wishesAPI.delete(id);
            toast.success("L'envie a bien été supprimée");
        } catch (error) {
            setWishes(originalWishes);
            toast.error("La suppression de l'envie n'a pas pu fonctionner");
        }
    };

    // Gestion de la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    const filteredWishes = wishes.filter(
        (wish) =>
            wish.name.toLowerCase().includes(search.toLowerCase()) ||
            wish.slug.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedWishes = Pagination.getData(
        filteredWishes,
        currentPage,
        itemsPerPage
    );

    return ( 
        <>
        <main id='main'>
        <BreadCrumbs title={"Envies"} link={"/"} linkto={"Accueil"} subtitle={"Administration"}/>
            <div className="container" data-aos="fade-up">
                <div className="mt-3 mb-3 d-flex justify-content-between align-items-center flex-wrap">
                    <h1 className="destinations_h1">Liste des envies</h1>
                    <Link
                    to="/admin/wishes/new"
                    className="btn login-btn destination_button"
                    >
                    Créer une envie
                    </Link>
                </div>
                <SearchBar handleSearch={handleSearch} search={search}/>
                {!loading && (
                    <TableAdminWishes
                    paginatedWhishes={paginatedWishes}
                    handleDelete={handleDelete}
                    />
                )}
                {loading && <TableLoader />}
                {itemsPerPage < filteredWishes.length && (
                    <Pagination 
                    currentPage={currentPage} 
                    itemsPerPage={itemsPerPage} 
                    length={filteredWishes.length} 
                    onPageChanged={handlePageChange} 
                    />
                )}
            </div>
            <ScrollButton/>
        </main>
        </>
    );
}
 
export default AdminWishesPage;