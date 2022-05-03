import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import TableLoader from "../../components/loaders/TableLoader";
import Pagination from "../../components/Pagination";
import ScrollButton from '../../components/scrollButton/ScrollButton';
import SearchBar from '../../components/searchbar/SearchBar';
import TableAdminUsers from '../../components/tableAdminUsers/TableAdminUsers';
import usersApi from '../../services/usersApi';

const AdminUsersPage = () => {
    AOS.init({
        duration: 1000
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    const STATUS_LABELS = {
        ROLE_USER: "Utilisateur",
        ROLE_ADMIN: "Administrateur"
    };

    const fetchUsers = async () => {
        try {
            const data = await usersApi.findAll();
            setUsers(data);
            setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger les utilisateurs");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        return () => {};
    }, []);

    // Page change management
    const handlePageChange = (page) => setCurrentPage(page);
    const itemsPerPage = 10;

    // delete management
    const handleDelete = async (id) => {
        const originalUsers = [...users];
        setUsers(
            users.filter((user) => user.id !== id)
        );
        try {
            await usersApi.delete(id);
            toast.success("L'utilisateur a bien été supprimé");
        } catch (error) {
            setUsers(originalUsers);
            toast.error("La suppression de l'utilisateur n'a pas pu fonctionner");
        }
    };

    // Gestion de la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    const filteredUsers = users.filter(
        (user) =>
            user.firstName.toLowerCase().includes(search.toLowerCase()) ||
            user.lastName.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            STATUS_LABELS[user.roles[0]].toLowerCase().includes(search.toLowerCase())
    );

    const paginatedUsers = Pagination.getData(
        filteredUsers,
        currentPage,
        itemsPerPage
    );
    
    return ( 
        <>
        <main id='main'>
        <BreadCrumbs title={"Utilisateurs"} link={"/"} linkto={"Accueil"} subtitle={"Administration"}/>
            <div className="container" data-aos="fade-up">
                <div className="mt-3 mb-3 d-flex justify-content-between align-items-center flex-wrap">
                    <h1 className="destinations_h1">Liste des utilisateurs</h1>
                </div>
                <SearchBar handleSearch={handleSearch} search={search}/>
                {!loading && (
                    <TableAdminUsers
                    paginatedUsers={paginatedUsers}
                    handleDelete={handleDelete}
                    />
                )}
                {loading && <TableLoader />}
                {itemsPerPage < filteredUsers.length && (
                    <Pagination 
                    currentPage={currentPage} 
                    itemsPerPage={itemsPerPage} 
                    length={filteredUsers.length} 
                    onPageChanged={handlePageChange} 
                    />
                )}
                <ScrollButton/>
            </div>
        </main>
        </>
    );
}
 
export default AdminUsersPage;