import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useState } from 'react';
import CountUp from 'react-countup';
import { BsCheckCircle, BsEmojiSmile, BsHeadset, BsPeople } from "react-icons/bs";
import { RiCheckDoubleLine, RiFacebookFill, RiInstagramFill, RiLinkedinFill, RiTwitterFill } from "react-icons/ri";
import { SiYourtraveldottv } from "react-icons/si";
import { Link } from 'react-router-dom';
import VisibilitySensor from "react-visibility-sensor";
import ScrollButton from '../../components/scrollButton/ScrollButton';
import './AboutPage.css';

const AboutPage = () => {
    AOS.init({
        duration: 1000
    });

    const [focus, setFocus] = useState(false);

    return ( 
        <>
        <main id='main'>
            <section id="about" className="about">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                        <h2>A propos de nous</h2>
                        <p>Agents de voyages spécialistes sur de nombreuses destinations, nous répondons à vos attentes avec le meilleur conseil sur chaque destination. Notre équipe vous propose des voyages sur mesure en fonction de vos préférences.</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100" data-aos-once="true">
                            <img src={require('../../../media/bg-about.webp')} className='img-fluid' />
                        </div>
                        <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content" data-aos="fade-right" data-aos-delay="100" data-aos-once="true">
                            <h3>Quels sont nos engagements ?</h3>
                            <p>L'organisation de voyages de qualité à travers le monde requiert l'expérience de spécialistes capables de répondre à vos questions tout en étant à la hauteur de vos exigences.</p>
                            <ul>
                                <li>
                                    <BsCheckCircle/>
                                    Faites-nous confiance pour l'organisation de vos vacances. Nous sommes à même de vous élaborer tous types de voyages sur mesure, organisés ou à la carte.
                                </li>
                                <li>
                                    <BsCheckCircle/>
                                    My Luxury Travel vous permet à l'aide de ses consultants, de créer vos propres vacances en vous apportant une offre de services personnalisée, attentive et de qualité.
                                </li>
                                <li>
                                    <BsCheckCircle/>
                                    Toute l'équipe connaît les prestations et sera à même de vous orienter dans vos choix.
                                </li>
                                <li>
                                    <BsCheckCircle/>
                                    En qualité de producteur, nous sommes également en contact direct avec nos prestataires et nous offrons des produits et services haut de gamme sans intermédiaire.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section id="counts" className="counts">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-3 col-md-6">
                            <div className="count-box">
                                <BsEmojiSmile/>
                                <CountUp start={focus ? 0 : null} end={532}>
                                {({ countUpRef }) => (
                                    <VisibilitySensor onChange={(isVisible) => {
                                        if (isVisible) { setFocus(true); }
                                    }}>
                                    <span ref={countUpRef} />
                                    </VisibilitySensor>
                                )}
                                </CountUp>
                                <p>Clients satisfaits</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
                            <div className="count-box">
                                <BsHeadset/>
                                <CountUp start={focus ? 0 : null} end={1467}>
                                {({ countUpRef }) => (
                                    <VisibilitySensor onChange={(isVisible) => {
                                        if (isVisible) { setFocus(true); }
                                    }}>
                                    <span ref={countUpRef} />
                                    </VisibilitySensor>
                                )}
                                </CountUp>
                                <p>Heures de support</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                            <div className="count-box">
                                <SiYourtraveldottv/>
                                <CountUp start={focus ? 0 : null} end={2579}>
                                {({ countUpRef }) => (
                                    <VisibilitySensor onChange={(isVisible) => {
                                        if (isVisible) { setFocus(true); }
                                    }}>
                                    <span ref={countUpRef} />
                                    </VisibilitySensor>
                                )}
                                </CountUp>
                                <p>Heures de vol</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                            <div className="count-box">
                                <BsPeople/>
                                <CountUp start={focus ? 0 : null} end={15}>
                                {({ countUpRef }) => (
                                    <VisibilitySensor onChange={(isVisible) => {
                                        if (isVisible) { setFocus(true); }
                                    }}>
                                    <span ref={countUpRef} />
                                    </VisibilitySensor>
                                )}
                                </CountUp>
                                <p>Collaborateurs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="assets" className="assets">
                <div className="container" data-aos="fade-up" data-aos-once="true">
                    <div className="section-title">
                        <h2>Nos atouts</h2>
                    </div>
                    <div className="row content">
                        <div className="col-lg-6" data-aos="fade-right" data-aos-delay="100" data-aos-once="true">
                            <p>
                            Qualité de service, conseil, disponibilité et confidentialité sont nos maîtres mots.
                            </p>
                            <ul>
                                <li>
                                    <RiCheckDoubleLine/>
                                    Une expérience de plus de 10 ans dans le secteur du luxe
                                </li>
                                <li>
                                    <RiCheckDoubleLine/>
                                    Une connaissance parfaite des destinations et des produits que nous proposons à nos clients
                                </li>
                                <li>
                                    <RiCheckDoubleLine/>
                                    Des partenariats avec les plus grands acteurs du tourisme de luxe : établissements hôteliers, villas de prestige, compagnies aériennes, yachting et aviation privée.
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-6 pt-4 pt-lg-0" data-aos="fade-left" data-aos-delay="100" data-aos-once="true">
                            <p>
                            L'évolution des besoins en matière de voyage de luxe requiert des qualités et des critères de sélection que notre équipe s'efforce de vous offrir au quotidien.
                            </p>
                            <ul>
                                <li>
                                    <RiCheckDoubleLine/>
                                    Une écoute et un service personnalisés 7 jours sur 7
                                </li>
                                <li>
                                    <RiCheckDoubleLine/>
                                    Des conseillers certifiés par destination
                                </li>
                                <li>
                                    <RiCheckDoubleLine/>
                                    Des tarifs compétitifs
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section id="team" class="team">
                <div className="container" data-aos="fade-up" data-aos-once="true">
                    <div className="section-title">
                        <h2>Notre équipe</h2>
                        <p>Nous sommes créateurs de voyages insolites, qui répondent aux exigences les plus importantes. Chaque client est considéré comme un VIT (Very Important Traveler) et chaque demande est étudiée avec attention.</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="100" data-aos-once="true">
                                <div className="pic">
                                    <img src={require("../../../media/team/team-1.jpg")} alt="" className='img-fluid'/>
                                </div>
                                <div className="member-info">
                                    <h4>David Le Goff</h4>
                                    <span>Founder & Travel Designer</span>
                                    <p>
                                        Diplômé d'un BTS Tourisme conception-commercialisation, il est fort de quinze années passées au sein d'un important voyagiste national, qui lui ont permis d'acquérir une vision globale du secteur.
                                        <br />
                                        Son rôle : développer l'activité et la communication de l'agence auprès du public.
                                    </p>
                                    <div className="social">
                                        <Link to={{}}><RiTwitterFill/></Link>
                                        <Link to={{}}><RiFacebookFill/></Link>
                                        <Link to={{}}><RiInstagramFill/></Link>
                                        <Link to={{}}><RiLinkedinFill/></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mt-4 mt-lg-0">
                            <div className="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="200" data-aos-once="true">
                                <div className="pic">
                                    <img src={require("../../../media/team/team-2.jpg")} alt="" className='img-fluid'/>
                                </div>
                                <div className="member-info">
                                    <h4>Thibaut Boutin</h4>
                                    <span>Founder & Travel Designer</span>
                                    <p>
                                        Après un BTS Tourisme et un master professionnalisant de trois années en tourisme d'affaires à l'Université de Nantes, il décide de se lancer dans l'aventure et de créer conjointement My Luxury Travel.
                                        <br />
                                        Son rôle : développer l'activité et la communication de l'agence auprès du public.
                                    </p>
                                    <div className="social">
                                        <Link to={{}}><RiTwitterFill/></Link>
                                        <Link to={{}}><RiFacebookFill/></Link>
                                        <Link to={{}}><RiInstagramFill/></Link>
                                        <Link to={{}}><RiLinkedinFill/></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mt-4">
                            <div className="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="300" data-aos-once="true">
                                <div className="pic">
                                    <img src={require("../../../media/team/team-3.jpg")} alt="" className='img-fluid'/>
                                </div>
                                <div className="member-info">
                                    <h4>Louise Blot</h4>
                                    <span>Travel Designer</span>
                                    <p>
                                        Suite à quelques mois en BTS Tourisme, elle se rend compte que le monde est trop grand et beau pour attendre plus longtemps. Forte de ses expériences autour du monde et dans plusieurs agences, elle se lance dans l'aventure.
                                        <br />
                                        Son rôle : Conseil sur les destinations auprès des voyageurs, réalisation d'itinéraires et devis pour les clients.
                                    </p>
                                    <div className="social">
                                        <Link to={{}}><RiTwitterFill/></Link>
                                        <Link to={{}}><RiFacebookFill/></Link>
                                        <Link to={{}}><RiInstagramFill/></Link>
                                        <Link to={{}}><RiLinkedinFill/></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mt-4">
                            <div className="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="400" data-aos-once="true">
                                <div className="pic">
                                    <img src={require("../../../media/team/team-4.jpg")} alt="" className='img-fluid'/>
                                </div>
                                <div className="member-info">
                                    <h4>Sébastien Giraud</h4>
                                    <span>Travel Designer</span>
                                    <p>
                                        À 21 ans, Sébastien a eu la chance d'être sélectionné pour faire le tour du monde en tant que reporter junior pour le magazine VSD. Cette envie de découvrir le monde ne l'a dès lors plus jamais quitté.
                                        <br />
                                        Son rôle : Accompagner le développement de la clientèle dans l'Ouest.
                                    </p>
                                    <div className="social">
                                        <Link to={{}}><RiTwitterFill/></Link>
                                        <Link to={{}}><RiFacebookFill/></Link>
                                        <Link to={{}}><RiInstagramFill/></Link>
                                        <Link to={{}}><RiLinkedinFill/></Link>
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
 
export default AboutPage;