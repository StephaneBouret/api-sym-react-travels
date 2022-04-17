import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import TableLoader from "../../components/loaders/TableLoader";
import Pagination from "../../components/Pagination";
import SearchBar from '../../components/searchbar/SearchBar';
import TableAdminImages from '../../components/tableAdminImages/TableAdminImages';
import imagesAPI from '../../services/imagesAPI';
import "./AdminImagesPage.css";

const AdminImagesPage = () => {
    AOS.init({
        duration: 1000
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    console.log(images);

    const fetchImages = async () => {
        try {
            const data = await imagesAPI.findAll();
            setImages(data);
            setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger les voyages");
        }
    }

    useEffect(() => {
        fetchImages();
    }, []);

    // delete management
    const handleDelete = async (id) => {
        const originalImages = [...images];
        setImages(
            images.filter((image) => image.id !== id)
        );
        try {
            await imagesAPI.delete(id);
            toast.success("L'image du voyage a bien été supprimée");
        } catch (error) {
            setImages(originalImages);
            toast.error("La suppression du voyage n'a pas pu fonctionner");
        }
    }

    // Gestion de la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    const filteredImages = images.filter(
        (image) => 
            image.travels.title.toLowerCase().includes(search.toLowerCase()) ||
            image.travels.destinations.country.toLowerCase().includes(search.toLowerCase())
    )

     // Gestion du changement de page
     const handlePageChange = (page) => setCurrentPage(page);
     const itemsPerPage = 10;
     const paginatedImages = Pagination.getData(
         filteredImages,
         currentPage,
         itemsPerPage
     );

    return ( 
        <>
        <main id='main'>
        <BreadCrumbs title={"Carousel"} link={"/"} linkto={"Accueil"} subtitle={"Administration"} />
            <div className="container" data-aos="fade-up">
                <div className="mt-3 mb-3 d-flex justify-content-between align-items-center flex-wrap">
                    <h1 className="images_h1">Liste des images par voyages</h1>
                    <Link
                    to="/admin/images/new"
                    className="btn login-btn image_button"
                    >
                    Créer un carousel
                    </Link>
                </div>
                <SearchBar handleSearch={handleSearch} search={search}/>
                {!loading && (
                    <TableAdminImages
                    paginatedImages={paginatedImages}
                    handleDelete={handleDelete}
                    />
                )}
                {loading && <TableLoader />}
                {itemsPerPage < filteredImages.length && (
                    <Pagination 
                    currentPage={currentPage} 
                    itemsPerPage={itemsPerPage} 
                    length={filteredImages.length} 
                    onPageChanged={handlePageChange} 
                    />
                )}
            </div>
        </main>
        </>
    );
}
 
export default AdminImagesPage;