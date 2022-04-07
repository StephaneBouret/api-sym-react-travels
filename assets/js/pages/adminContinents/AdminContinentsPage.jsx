import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import TableLoader from "../../components/loaders/TableLoader";
import TableAdminContinents from '../../components/tableAdminContinents/TableAdminContinents';
import continentsAPI from '../../services/continentsAPI';

const AdminContinentsPage = () => {
    AOS.init({
        duration: 1000
    });

    const [continents, setContinents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchContinents = async () => {
        try {
            const data = await continentsAPI.findAll();
            setContinents(data);
            setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger les continents");
        }
    }

    useEffect(() => {
        fetchContinents();
    }, []);

    // delete management
    const handleDelete = async (id) => {
        const originalContinents = [...continents];
        setContinents(
            continents.filter((continent) => continent.id !== id)
        );
        try {
            await continentsAPI.delete(id);
            toast.success("Le continent a bien été supprimé");
        } catch (error) {
            setContinents(originalContinents);
            toast.error("La suppression du continent n'a pas pu fonctionner");
        }
    }

    const paginatedContinents = continents;

    return ( 
        <>
        <main id='main'>
        <BreadCrumbs title={"Continents"} link={"/"} linkto={"Accueil"} subtitle={"Administration"}/>
        <div className="container" data-aos="fade-up">
            <div className="mt-3 mb-3 d-flex justify-content-between align-items-center flex-wrap">
                <h1 className="destinations_h1">Liste des continents</h1>
                <Link
                to="/admin/continent/new"
                className="btn login-btn destination_button"
                >
                Créer un continent
                </Link>
            </div>
            {!loading && (
                <TableAdminContinents
                paginatedContinents={paginatedContinents}
                handleDelete={handleDelete}
                />
            )}
            {loading && <TableLoader />}
        </div>
        </main>
        </>
     );
}
 
export default AdminContinentsPage;