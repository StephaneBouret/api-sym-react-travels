import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ContainerOuter from '../../components/containerouter/ContainerOuter';
import ImageGrid from '../../components/loaders/ImageGrid';
import Pagination from '../../components/Pagination';
import ScrollButton from '../../components/scrollButton/ScrollButton';
import SearchBar from '../../components/searchbar/SearchBar';
import SmallBreadCrumbsTravel from '../../components/smallbreadcrumbs/SmallBreadCrumbsTravel';
import TravelsCard from '../../components/travelsCard/TravelsCard';
import travelsAPI from '../../services/travelsAPI';
import './TravelsPage.css';

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
    const titleRef = useRef(null);
    const [travels, setTravels] = useState([]);

    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

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

    // Permet de rester sur la barre des continents au click
    useEffect(() => {
        if (findContinent) {
            scrollToRef(titleRef);
        } else {
            window.scrollTo(0, 0);
        }
    }, [findContinent])
    

    const filterSelectedTravel = travels
            .filter((travel) => travel.destinations.continent.includes(findContinent))
            .filter((travel) => travel.destinations.country.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        if (!findContinent) {
            setArrayToFilter(travels);
        }
        setArrayToFilter(filterSelectedTravel);
    }, [findContinent, search, travels]);

    // Page change management
    const handlePageChange = (page) => setCurrentPage(page);
    const itemsPerPage = 6;
    const paginatedTravels = Pagination.getData(
        arrayToFilter,
        currentPage,
        itemsPerPage
    );

    // onclick scroll to div react
    const scrollToView = () => scrollToRef(titleRef);

    return ( 
        <>
            <section id="page-destination" className="destinations position-relative">
                <img src={require("../../../media/travels.webp")} className="img-destinations img-fluid"/>
                <div className="title-destinations" data-aos="fade-up" data-aos-once="true">
                    <h2>Nos voyages</h2>
                </div>
                <Link to={{}} className="inspire-btn scrollButton" onClick={scrollToView}></Link>
            </section>
            <main ref={titleRef}>
                <SmallBreadCrumbsTravel link={"/"} linkName={"Accueil"} secondTitle={"Voyages"} travels={travels}/>
                <section className="collection-destinations">
                    <ContainerOuter
                    handleClickContinent={handleClickContinent}
                    currentId={currentId}
                    />
                </section>
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
                                fileUrl={travel.fileUrl}
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
            <ScrollButton/>
            </main>
        </>
     );
}
 
export default TravelsPage;