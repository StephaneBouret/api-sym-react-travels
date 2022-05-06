import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import wishesAPI from '../../services/wishesAPI';
import './WishPage.css';
import ImageGrid from '../../components/loaders/ImageGrid';
import SmallBreadCrumbsWish from '../../components/smallbreadcrumbswish/SmallBreadCrumbsWish';
import ScrollButton from '../../components/scrollButton/ScrollButton';
import Pagination from '../../components/Pagination';
import BlockImplication from '../../components/blockImplication/BlockImplication';

const WishPage = () => {

    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [wish, setWish] = useState({
        name: "",
        fileUrl: "",
        travels: []
    });
    const titleRef = useRef(null);
    // jump to section
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
    // onclick scroll to div react
    const scrollToView = () => scrollToRef(titleRef);

    const fetchWish = async (id) => {
        try {
            const { name, fileUrl, travels } = await wishesAPI.find(id);
            setWish({ name, fileUrl, travels });
            setLoading(false);
        } catch (error) {
            toast.error("L'envie n'a pas pu être chargée");
        }
    };

    useEffect(() => {
        fetchWish(id);
    }, [id]);

    const travel = wish.travels;
    // Suppression des doublons sur la collection destinations des travels
    const selectedDestinations = travel.map(t => t.destinations.country);
    const uniqueSet = [...new Set(selectedDestinations)];
    const sortTravels = uniqueSet.sort((a, b) => a < b ? -1 : 1);

    // Gestion de la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    const filteredTravels = travel.filter(
        (t) => 
            t.destinations.country.toLowerCase().includes(search.toLowerCase())
    );

    // Page change management
    const handlePageChange = (page) => setCurrentPage(page);
    const itemsPerPage = 12;
    const paginatedTravels = Pagination.getData(
        filteredTravels,
        currentPage,
        itemsPerPage
    )

    return ( 
        <>
        {loading && <ImageGrid />}
        <section id="page-wish" className="wish position-relative">
            <img src={wish.fileUrl} className="img-wish img-fluid" />
            <div className="title-wish">
                <h2>{wish.name}</h2>
            </div>
            <Link to={{}} className="inspire-btn scrollButton" onClick={scrollToView}></Link>
        </section>
        <main>
            <SmallBreadCrumbsWish
            linkFirst={"/"}
            name={wish.name}
            travel={travel}
            />
            <section className="collection-wish" ref={titleRef}>
                <div className="container">
                    <div className="col-12 p-0">
                        <div className="row search-item">
                            <div className="input-group mb-3 col-md-3 col-sm-3 col-xs-6">
                                <label htmlFor="country">Pays</label>
                                <select name="country" className="travel-select"
                                onChange={handleSearch}
                                >
                                    <option value="">Tous</option>
                                    {sortTravels.map((u, index) => (
                                    <option key={index} value={u}>
                                        {u}
                                    </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="block-implication mt-3">
                    <BlockImplication
                    paginatedTravels={paginatedTravels}
                    />
                    {itemsPerPage < filteredTravels.length && (
                    <Pagination 
                        currentPage={currentPage} 
                        itemsPerPage={itemsPerPage} 
                        length={filteredTravels.length} 
                        onPageChanged={handlePageChange} 
                    />
                    )}
                    </div>
                </div>
                <ScrollButton/>
            </section>
        </main>
        </>
    );
}
 
export default WishPage;