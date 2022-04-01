import React, { useState, useEffect } from 'react';
import './DestinationsPage.css';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/searchbar/SearchBar';
import ScrollButton from '../../components/scrollButton/ScrollButton';
import ImageGrid from '../../components/loaders/ImageGrid';
import { toast } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';
import destinationsAPI from '../../services/destinationsAPI';
import DestinationsCard from '../../components/destinationsCard/DestinationsCard';

const DestinationsPage = () => {
    AOS.init({
        duration: 1000
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

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

    // Gestion de la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    const filteredDestinations = destinations.filter(
        (destination) => 
            destination.title.toLowerCase().includes(search.toLowerCase()) ||
            destination.country.toLowerCase().includes(search.toLowerCase()) ||
            destination.city.toLowerCase().includes(search.toLowerCase())
    )

    // Page change management
    const handlePageChange = (page) => setCurrentPage(page);
    const itemsPerPage = 10;
    const paginatedDestinations = Pagination.getData(
        filteredDestinations,
        currentPage,
        itemsPerPage
    )

    return ( 
        <>
        <main id='main'>
            <section id="destinations" className="destinations">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                        <h2>Nos destinations</h2>
                    </div>
                    <SearchBar handleSearch={handleSearch} search={search} />
                    {!loading && (
                    <div className="row mt-5">
                        {paginatedDestinations.map((destination) => (
                            <div
                            key={destination.id}
                            className="col-lg-4 col-md-6 mb-3"
                            >
                                <DestinationsCard
                                id={destination.id}
                                country={destination.country}
                                city={destination.city}
                                filePath={destination.filePath}
                                travel={destination.travel}
                                />
                            </div>
                        ))}
                    </div>
                    )}
                    {loading && <ImageGrid />}
                    {itemsPerPage < filteredDestinations.length && (
                    <Pagination 
                        currentPage={currentPage} 
                        itemsPerPage={itemsPerPage} 
                        length={filteredDestinations.length} 
                        onPageChanged={handlePageChange} 
                    />
                    )}
                </div>
            </section>
            <ScrollButton/>
        </main>
        </>
    );
}
 
export default DestinationsPage;