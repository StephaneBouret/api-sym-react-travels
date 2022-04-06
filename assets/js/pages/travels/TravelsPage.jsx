import React, { useState, useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/searchbar/SearchBar';
import ScrollButton from '../../components/scrollButton/ScrollButton';
import ImageGrid from '../../components/loaders/ImageGrid';
import travelsAPI from '../../services/travelsAPI';
import ContainerOuter from '../../components/containerouter/ContainerOuter';
import TravelsCard from '../../components/travelsCard/TravelsCard';
import './TravelsPage.css';
import { array } from 'prop-types';

const TravelsPage = () => {
    AOS.init({
        duration: 1000
    });

    const [arrayToFilter, setArrayToFilter] = useState([]);
    const [currentId, setCurrentId] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [findContinent, setFindContinent] = useState("");
    const [travels, setTravels] = useState([]);

    const fetchTravels = async () => {
        try {
          const data = await travelsAPI.findAll();
          setTravels(data);
          setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger les voyages");
        }
    };

    useEffect(() => {
        fetchTravels();
    }, []);

    // Gestion de la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };
    
    const handleClickContinent = (val, idx) => (e) => {
        setFindContinent(val);
        setCurrentId(idx);
    };

    const filterSelectedTravel = travels
                                        .filter((travel) => travel.destinations.continent.includes(findContinent))
                                        .filter((travel) => travel.destinations.country.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        if (!findContinent) {
            setArrayToFilter(travels);
        }
        setArrayToFilter(filterSelectedTravel);
    }, [findContinent, search, travels])
    

    // Page change management
    const handlePageChange = (page) => setCurrentPage(page);
    const itemsPerPage = 6;
    const paginatedTravels = Pagination.getData(
        arrayToFilter,
        currentPage,
        itemsPerPage
    );

    return ( 
        <>
        <main id='main'>
            <div data-aos="fade-up">
                <section id="travels" className="travels">
                    <div className="container">
                        <div className="section-title">
                            <h2>Nos voyages</h2>
                        </div>
                    </div>
                </section>
                <ContainerOuter
                handleClickContinent={handleClickContinent}
                currentId={currentId}
                />
                <section className="paginated-travels">
                    <div className="container">
                        <p className="mb-0">Rechercher par pays</p>
                        <SearchBar handleSearch={handleSearch} search={search} />
                        <div className="row mt-5">
                            {paginatedTravels.map((travel) => (
                                <div
                                key={travel.id}
                                className="col-lg-4 col-md-6 mb-3"
                                >
                                <TravelsCard
                                filePath={travel.filePath}
                                country={travel.destinations.country}
                                id={travel.id}
                                title={travel.title}
                                description={travel.description}
                                days={travel.days}
                                nights={travel.nights}
                                amount={travel.amount}
                                />
                                </div>
                            ))}
                        </div>
                        {loading && <ImageGrid />}
                        {itemsPerPage < arrayToFilter.length && (
                        <Pagination 
                            currentPage={currentPage} 
                            itemsPerPage={itemsPerPage} 
                            length={arrayToFilter.length} 
                            onPageChanged={handlePageChange} 
                            />
                        )}
                    </div>
                </section>
            </div>
            <ScrollButton/>
        </main>
        </>
     );
}
 
export default TravelsPage;