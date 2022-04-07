import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ContainerContinent from '../../components/containercontinent/ContainerContinent';
import DestinationsSimplifiedCard from '../../components/destinationsSimplifiedCard/DestinationsSimplifiedCard';
import ImageGrid from '../../components/loaders/ImageGrid';
import Pagination from '../../components/Pagination';
import ScrollButton from '../../components/scrollButton/ScrollButton';
import SearchBar from '../../components/searchbar/SearchBar';
import SmallBreadCrumbs from '../../components/smallbreadcrumbs/SmallBreadCrumbs';
import destinationsAPI from '../../services/destinationsAPI';
import continentsAPI from '../../services/continentsAPI';
import './DestinationsPage.css';

const DestinationsPage = () => {
    AOS.init({
        duration: 1000
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [continents, setContinents] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const titleRef = useRef(null);
    const [search, setSearch] = useState("");
    // jump to section
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

    console.log(continents);

    const fetchDestinations = async () => {
        try {
            const data = await destinationsAPI.findAll();
            const sortDestinations = data.sort((a, b) => a.country < b.country ? -1 : 1);
            setDestinations(sortDestinations);
            setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger les destinations");
        }
    }

    const fetchContinents = async () => {
        try {
            const data = await continentsAPI.findAll();
            setContinents(data);
        } catch (error) {
            toast.error("Impossible de charger les continents");
        }
    }

    useEffect(() => {
        fetchDestinations();
        fetchContinents();
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
    const itemsPerPage = 12;
    const paginatedDestinations = Pagination.getData(
        filteredDestinations,
        currentPage,
        itemsPerPage
    )

    const paginatedContinents = continents;

    // onclick scroll to div react
    const scrollToView = () => scrollToRef(titleRef);

    return ( 
        <>
        <section id="destinations" className="destinations position-relative">
            <img src={require("../../../media/cheval-blanc-randheli.webp")} className="img-destinations img-fluid"/>
            <div className="title-destinations" data-aos="fade-up" data-aos-once="true">
                <h2>Destinations</h2>
            </div>
            <Link to={{}} className="inspire-btn scrollButton" onClick={scrollToView}></Link>
        </section>
        <main>
            <SmallBreadCrumbs link={"/"} linkName={"Accueil"} secondTitle={"Destinations"} destinations={destinations}/>
            <section className="collection-destinations" ref={titleRef}>
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
            <section className="continents">
                <div className="container" data-aos="fade-up" data-aos-once="true">
                    <div className="section-title">
                        <h2>Par continents</h2>
                    </div>
                    <div className="row page-continents">
                        <ContainerContinent
                        paginatedContinents={paginatedContinents}
                        />
                    </div>
                </div>
            </section>
            <ScrollButton/>
        </main>
        </>
    );
}
 
export default DestinationsPage;