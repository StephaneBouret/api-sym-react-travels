import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import continentsAPI from '../../services/continentsAPI';
import destinationsAPI from '../../services/destinationsAPI';
import './ContinentPage.css';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SmallBreadCrumbs from '../../components/smallbreadcrumbs/SmallBreadCrumbs';
import SearchBar from '../../components/searchbar/SearchBar';
import Pagination from '../../components/Pagination';
import ImageGrid from '../../components/loaders/ImageGrid';
import ScrollButton from '../../components/scrollButton/ScrollButton';
import DestinationsSimplifiedCard from '../../components/destinationsSimplifiedCard/DestinationsSimplifiedCard';

const ContinentPage = () => {
    const params = useParams();
    const { slug } = params;
    const [currentPage, setCurrentPage] = useState(1);
    const [continent, setContinent] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const titleRef = useRef(null);

    // jump to section
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

    const fetchDestinationsByContinent = async (slug) => {
        try {
            const data = await destinationsAPI.getDestinationsByContinent(slug);
            const sortDestinations = data.sort((a, b) => a.country < b.country ? -1 : 1);
            setDestinations(sortDestinations);
            setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger les destinations");
        }
    }

    const fetchContinentBySlug = async (slug) => {
        try {
            const data = await continentsAPI.getContinentBySlug(slug);
            setContinent(data[0]);
        } catch (error) {
            toast.error("Impossible de charger le continent");
        }
    }

    useEffect(() => {
        fetchDestinationsByContinent(slug);
        fetchContinentBySlug(slug);
    }, [slug]);

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
    );

        // Page change management
        const handlePageChange = (page) => setCurrentPage(page);
        const itemsPerPage = 12;
        const paginatedDestinations = Pagination.getData(
            filteredDestinations,
            currentPage,
            itemsPerPage
        )
    
    // onclick scroll to div react
    const scrollToView = () => scrollToRef(titleRef);

    return ( 
        <>
        <section id="page-continent" className="continent position-relative">
            <img src={continent.filePath} className="img-continent img-fluid" />
            <div className="title-continent">
                <h2>{continent.name}</h2>
                <Link to={{}} className="inspire-btn scrollButton" onClick={scrollToView}></Link>
            </div>
        </section>
        <main>
        <SmallBreadCrumbs link={"/"} linkName={"Accueil"} secondTitle={"Destinations"} destinations={destinations}/>
        <section className="collection-continent" ref={titleRef}>
            <div className="container">
            <SearchBar handleSearch={handleSearch} search={search} />
            {!loading && (
                <div className="row mt-3 page-destinations">
                {paginatedDestinations.map((destination) => (
                    <div key={destination.id} className="col-12 col-lg-3 col-sm-6 card-destination text-center">
                    <DestinationsSimplifiedCard
                    id={destination.id}
                    filePath={destination.filePath}
                    country={destination.country}
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
        </main>
        </>
     );
}
 
export default ContinentPage;