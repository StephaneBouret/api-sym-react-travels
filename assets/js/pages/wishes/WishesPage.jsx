import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import wishesBg from '../../../media/wish-bg.webp';
import WishesSimplifiedCard from '../../components/destinationsSimplifiedCard/WishesSimplifiedCard';
import ImageGrid from '../../components/loaders/ImageGrid';
import Pagination from '../../components/Pagination';
import ScrollButton from '../../components/scrollButton/ScrollButton';
import SearchBar from '../../components/searchbar/SearchBar';
import SmallBreadCrumbsWishes from '../../components/smallbreadcrumbs/SmallBreadCrumbsWishes';
import wishesAPI from '../../services/wishesAPI';
import "./WishesPage.css";

const WishesPage = () => {
    AOS.init({
        duration: 1000
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const titleRef = useRef(null);
    const [search, setSearch] = useState("");
    const [wishes, setWishes] = useState([]);
    // jump to section
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

    const fetchWishes = async () => {
        try {
            const data = await wishesAPI.findAll();
            const sortWishes = data.sort((a, b) => a.slug < b.slug ? -1 : 1);
            setWishes(sortWishes);
            setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger les envies");
        }
    };

    useEffect(() => {
        let cancel = false;
        if (cancel) return;
        fetchWishes();
        return () => {
            cancel = true;
        }
    }, []);

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

    // Page change management
    const handlePageChange = (page) => setCurrentPage(page);
    const itemsPerPage = 12;
    const paginatedWishes = Pagination.getData(
        filteredWishes,
        currentPage,
        itemsPerPage
    );

    // onclick scroll to div react
    const scrollToView = () => scrollToRef(titleRef);

    return ( 
        <>
        <section id="page-wishes" className="wishes position-relative">
            <img src={wishesBg} className="img-wishes img-fluid"/>
            <div className="title-wishes" data-aos="fade-up" data-aos-once="true">
                <h2>Vos envies</h2>
            </div>
            <Link to={{}} className="inspire-btn scrollButton" onClick={scrollToView}></Link>
        </section>
        <main>
        <SmallBreadCrumbsWishes link={"/"} linkName={"Accueil"} secondTitle={"Envie"} wishes={wishes}/>
            <section className="collection-wishes" ref={titleRef}>
                <div className="container">
                    <SearchBar handleSearch={handleSearch} search={search} />
                    {!loading && (
                    <div className="row mt-3 page-destinations">
                        {paginatedWishes.map((wish) => (
                            <div key={wish.id} className="col-12 col-lg-3 col-sm-6 card-destination text-center">
                            <WishesSimplifiedCard
                            id={wish.id}
                            fileUrl={wish.fileUrl}
                            name={wish.name}
                            />
                            </div>
                        ))}
                    </div>
                    )}
                    {loading && <ImageGrid />}
                    {itemsPerPage < filteredWishes.length && (
                    <Pagination 
                        currentPage={currentPage} 
                        itemsPerPage={itemsPerPage} 
                        length={filteredWishes.length} 
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
 
export default WishesPage;