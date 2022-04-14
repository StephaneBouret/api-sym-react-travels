import React, { useState, useEffect } from 'react';
import { NavLink, Link } from "react-router-dom";
import { useNavigate, useLocation, useParams, use } from "react-router-dom";
import { toast } from 'react-toastify';
import { BsPhone, BsClock, BsList, BsChevronDown } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import "./Navbar.css";

const NavbarDisplayed = () => {
    const [scroll, setScroll] = useState(false);
    const [toggleMobile, settoggleMobile] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [display, setDisplay] = useState(true);

    useEffect(() => {
        let cancel = false;
        window.addEventListener("scroll", () => {
            if (cancel) return;
            if (window.pageYOffset > 100) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        });
        return () => {
            cancel = true;
        }
    }, []);

    const toggleOff = () => {
        if (dropDown !== false) {
            settoggleMobile(toggleMobile => !toggleMobile)
        }
    }
    
    return ( 
        <>
            <section id="topbar" className={`d-flex align-items-center fixed-top topbar-transparent ${scroll ? "topbar-scrolled" : ""} ${display ? "topbar-displayed" : ""}`}>
                <div className="container-fluid container-xl d-flex align-items-center justify-content-center justify-content-lg-start">
                    <i className="d-flex align-items-center"><BsPhone/><span>02 41 01 02 03</span></i>
                    <i className="ms-4 d-none d-lg-flex align-items-center"><BsClock/><span>Lun-Sam: 09:00 - 19:00</span></i>
                </div>
            </section>
            <header id="header" className={`fixed-top d-flex align-items-center header-transparent ${scroll ? "header-scrolled" : ""} ${display ? "header-displayed" : ""}`}>
                <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
                    <div className="logo me-auto">
                        <h1><Link to={"/"}>Luxury Travel</Link></h1>
                    </div>
                    <nav id="navbar" className={toggleMobile ? "navbar order-last order-lg-0 navbar-mobile" : "navbar order-last order-lg-0"}>
                        <ul>
                            <li>
                                <NavLink className={"nav-link scrollto"} to="/">Accueil</NavLink>
                            </li>
                            <li>
                                <NavLink className={"nav-link scrollto"} to={"/destinations"}>Destinations</NavLink>
                            </li>
                            <li>
                                <NavLink className={"nav-link scrollto"} to={"/travel"}>Voyages</NavLink>
                            </li>
                            <li className="dropdown">
                                <Link className={"nav-link scrollto"} to={{}}>
                                    Admin
                                    <BsChevronDown onClick={() => setDropDown(dropDown => !dropDown)}/>
                                </Link>
                                <ul className={`${dropDown ? "dropdown-active" : ""}`}>
                                    <li><NavLink className={"nav-link scrollto"} to={"/admin/destinations"} onClick={toggleOff}>Admin Destinations</NavLink></li>
                                    <li><NavLink className={"nav-link scrollto"} to={"/admin/travel"} onClick={toggleOff}>Admin Voyages</NavLink></li>
                                    <li><NavLink className={"nav-link scrollto"} to={"/admin/continents"} onClick={toggleOff}>Admin Continents</NavLink></li>
                                    <li><NavLink className={"nav-link scrollto"} to={"/admin/images"} onClick={toggleOff}>Admin Carousel</NavLink></li>
                                </ul>
                            </li>
                            <li>
                                <NavLink className={"nav-link scrollto"} to={"/about"}>Qui sommes-nous</NavLink>
                            </li>
                            <li>
                                <NavLink className={"nav-link scrollto"} to={"/contact"}>Contact</NavLink>
                            </li>
                            <li>
                                <NavLink className={"nav-link scrollto"} to={"/register"}>Inscription</NavLink>
                            </li>
                            <li>
                                <NavLink className={"btn login-btn"} to={"/login"}>Connexion</NavLink>
                            </li>
                        </ul>
                        <i className="mobile-nav-toggle" onClick={() => settoggleMobile(toggleMobile => !toggleMobile)}>
                            {toggleMobile ? <AiOutlineClose/> : <BsList/>}
                        </i>
                    </nav>
                </div>
            </header>
        </>
    );
}
 
export default NavbarDisplayed;
