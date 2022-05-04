import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import imgPartner4 from '../../../media/partners/le-collectionist.jpg';
import imgPartner5 from '../../../media/partners/moa.jpg';
import imgPartner3 from '../../../media/partners/pure-life-experience.png';
import imgPartner2 from '../../../media/partners/relais-chateaux.jpg';
import imgPartner1 from '../../../media/partners/traveller-made.jpg';
import ScrollButton from '../../components/scrollButton/ScrollButton';
import SmallBreadCrumbsContact from '../../components/smallbreadcrumbs/SmallBreadCrumbsContact';
import "./PartnersPage.css";

const PartnersPage = () => {
    AOS.init({
        duration: 1000
    });
    const titleRef = useRef(null);
    // jump to section
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
    // onclick scroll to div react
    const scrollToView = () => scrollToRef(titleRef);

    return ( 
        <>
        <section id="page-partners" className="partners position-relative">
            <img src={require("../../../media/partners-bg.webp")} className="img-partners img-fluid"/>
            <div className="title-partners" data-aos="fade-up" data-aos-once="true">
                <h2>Nos partenaires</h2>
            </div>
            <Link to={{}} className="inspire-btn scrollButton" onClick={scrollToView}></Link>
        </section>
        <main>
            <SmallBreadCrumbsContact link={"/"} linkName={"Accueil"} secondTitle={"Nos partenaires"}/>
            <section className="collection-partners" ref={titleRef}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="section-title">
                            <p>Notre réseau de partenaires nous permet de vous apporter une véritable valeur ajoutée dans l'élaboration et la finalisation de votre voyage. Nous sommes heureux de partager avec vous, ceux qui ont facilité et facilitent encore le bon déroulé de vos itinéraires, car sans eux, rien ne serait possible !</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="blockimplictions">
                <div className="container">
                    <div className="block-experiments">
                        <div className="row experiments mb-25">
                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 bg-white">
                                <img src={imgPartner1} className="img-fluid img-responsive " />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 bg-white">
                                <div className="col-md-12 text-experiments">
                                    <h2>Traveller Made</h2>
                                    <div className="content-text-experiments">
                                        <p className="text-partners">
                                            <a href="https://www.travellermade.com/" target="_blank" rel="noopener">Traveller Made</a> est un réseau privé d'agences de voyage et d'hôtels d'exception répartis à travers le monde. En France, une quinzaine d'agences de voyage de luxe ont été sélectionnées, dont LUXeTHIKA. L'appartenance au réseau nous permet de vous proposer des avantages exclusifs sur une sélection pointue de plus de 800 établissements&nbsp;sur les 5 continents.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row experiments mb-25">
                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 bg-white">
                                <div className="col-md-12 text-experiments description-left">
                                    <h2>Relais &amp; Châteaux</h2>
                                    <div className="content-text-experiments">
                                    <p className="text-justify">
                                    <a href="https://www.relaischateaux.com/fr/" target="_blank" rel="noopener">Relais &amp; Châteaux</a> ne se présente plus ! C'est une sélection de plus 550 «&nbsp;maisons&nbsp;» à travers le monde, reflétant l'excellence en matière d'art de vivre. En vous plongeant dans la culture de chacune de ses maisons, R&amp;C vous invite à la découverte du monde et au partage de moments d'exception… En route pour le bonheur ?
                                    </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 bg-white col-sol">
                                <img src={imgPartner2} className="img-fluid img-responsive " />
                            </div>
                        </div>
                        <div className="row experiments mb-25">
                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 bg-white">
                                <img src={imgPartner3} className="img-fluid img-responsive " />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 bg-white">
                                <div className="col-md-12 text-experiments">
                                    <h2>Pure Life experiences</h2>
                                    <div className="content-text-experiments">
                                    <p className="text-justify">
                                    Chaque année <a href="https://purelifeexperiences.com/" target="_blank" rel="noopener">Pure Life Experiences</a> rassemble sur 4 jours à Marrakech, une sélection des meilleurs acteurs du Tourisme pour un salon dédié au Voyage d'Expérience. Faire partie de la communauté PURE, c'est une question d'attitude,&nbsp; d'engagement et de conviction. Conviction que les voyages sont plus qu'une simple industrie et qu'ils peuvent changer le monde, en modifiant l'état d'esprit des voyageurs et en améliorant le sort des communautés locales.
                                    </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row experiments mb-25">
                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 bg-white">
                                <div className="col-md-12 text-experiments description-left">
                                    <h2>Le collectionnist</h2>
                                    <div className="content-text-experiments">
                                    <p className="text-justify">
                                    Dans des destinations mythiques ou surprenantes, les équipes <a href="https://www.lecollectionist.com/fr" target="_blank" rel="noopener">Le Collectionist</a> sillonnent les routes pour vous ouvrir les portes des plus belles maisons à louer.&nbsp; Les propriétés ont toutes un point commun : une personnalité empreinte de la spontanéité des vacances et de la simplicité des belles choses.
                                    </p>
                                    <p className="text-justify">
                                    Louer une villa de la sélection Le Collectionist avec LUXeTHIKA, c'est choisir le meilleur de la destination avec une panoplie d'expériences inédites, insolites ou extraordinaires qui vous seront proposées à la carte.
                                    </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 bg-white col-sol">
                                <img src={imgPartner4} className="img-fluid img-responsive " />
                            </div>
                        </div>
                        <div className="row experiments mb-25">
                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 bg-white">
                                <img src={imgPartner5} className="img-fluid img-responsive " />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 bg-white">
                                <div className="col-md-12 text-experiments">
                                    <h2>Moa &amp; U</h2>
                                    <div className="content-text-experiments">
                                    <p className="text-justify">
                                    Redonner du sens à l'évasion, prendre le temps de revenir à l'essentiel, telle est la vocation de <a href="https://www.moaandu.com/" target="_blank" rel="noopener">Moa &amp; U</a>, créateur d'expériences d'exception, clés en main ou sur mesure, dans l'univers du bien-être et du savoir-faire. Le concept ? Dénicher, en France ou à l'étranger, l'écrin parfait combinant nature, esthétique, confort pour y proposer des ateliers animés par des experts du bien-être, des professionnels du sport, des amoureux de la cuisine, des artistes ou des artisans engagés. Chaque séjour vous fera découvrir des activités originales, riches en partages et en émotions.
                                    </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ScrollButton/>
        </main>
        </>
    );
}
 
export default PartnersPage;