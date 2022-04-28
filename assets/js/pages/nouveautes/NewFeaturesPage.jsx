import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TravelsSimplifiedCard from '../../components/destinationsSimplifiedCard/TravelsSimplifiedCard';
import ImageGrid from '../../components/loaders/ImageGrid';
import ScrollButton from '../../components/scrollButton/ScrollButton';
import SmallBreadCrumbsNewFeatures from '../../components/smallbreadcrumbs/SmallBreadCrumbsNewFeatures';
import travelsAPI from '../../services/travelsAPI';

const NewFeaturesPage = () => {
    const [loading, setLoading] = useState(true);
    const size = 10;
    const [travels, setTravels] = useState([]);
    const titleRef = useRef(null);

    // jump to section
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

    const fetchTravels = async () => {
        try {
          const data = await travelsAPI.findAll();
          const sortTravelByIdDesc = data.sort((a, b) => b.id < a.id ? -1 : 1).slice(0, size);
          setTravels(sortTravelByIdDesc);
          setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger les voyages");
        }
    };

    useEffect(() => {
        fetchTravels();
    }, []);

    const paginatedDestinations = travels;

    // onclick scroll to div react
    const scrollToView = () => scrollToRef(titleRef);
    
    return ( 
        <>
        {loading && <ImageGrid />}
        <section id="page-destination" className="destinations position-relative">
            <img src={require("../../../media/news-bg.webp")} className="img-destinations img-fluid"/>
            <div className="title-destinations">
                <h2>Nouveautés</h2>
            </div>
            <Link to={{}} className="inspire-btn scrollButton" onClick={scrollToView}></Link>
        </section>
        <main>
            <SmallBreadCrumbsNewFeatures link={"/"} linkName={"Accueil"} secondTitle={"Nouveautés"} travels={travels}/>
            <section className="collection-destinations" ref={titleRef}>
                <div className="container">
                {!loading && (
                    <div className="row mt-3 page-destinations">
                        {paginatedDestinations.map((destination) => (
                            <div key={destination.id} className="col-12 col-lg-3 col-sm-6 card-destination text-center">
                            <TravelsSimplifiedCard
                            id={destination.id}
                            fileUrl={destination.fileUrl}
                            title={destination.title}
                            />
                            </div>
                        ))}
                    </div>
                )}
                </div>
            </section>
            <ScrollButton/>
        </main>
        </>
    );
}
 
export default NewFeaturesPage;