// Les imports importants
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Routes, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/homePage/HomePage';
import AdminContinentsPage from './pages/adminContinents/AdminContinentsPage';
import AdminContinentPage from './pages/adminContinent/AdminContinentPage';
import AdminDestinationsPage from './pages/adminDestinations/AdminDestinationsPage';
import AdminDestinationPage from './pages/adminDestination/AdminDestinationPage';
import AdminTravelsPage from './pages/adminTravels/AdminTravelsPage';
import AdminTravelPage from './pages/adminTravel/AdminTravelPage';
import DestinationsPage from './pages/destinations/DestinationsPage';
import DetailDestination from './pages/detailDestination/DetailDestination';
import TravelsPage from './pages/travels/TravelsPage';
import TravelByDestination from './pages/travelByDestination/TravelByDestination';
import ContinentPage from './pages/continent/ContinentPage';
import AboutPage from './pages/about/AboutPage';
import ScrollToTop from './components/ScrollToTop';

// any CSS you import will output into a single css file (app.css in this case)
import '../styles/app.css';

// start the Stimulus application
import '../bootstrap';
import NavbarDisplayed from './components/navbar/NavbarDisplayed';
import NavbarWithoutDisplay from './components/navbar/NavbarWithoutDisplay';

const App = () => {

    // Cacher la Navbar sur les pages login et register
    const NavbarDisplayedLayout = () => (
        <>
        <NavbarDisplayed />
        <Outlet />
        </>
    );
    const NavbarWithoutDisplayedLayout = () => (
        <>
        <NavbarWithoutDisplay />
        <Outlet />
        </>
    );

    return ( 
        <HashRouter>
            <ScrollToTop>
                {/* <Navbar/> */}
                <div>
                    <Routes>
                        <Route element={<NavbarDisplayedLayout/>}>
                            <Route path="/about" element={<AboutPage/>}/>
                            <Route path="/travel" element={<TravelsPage/>}/>
                            <Route path="/admin/destination/:id" element={<AdminDestinationPage/>}/>
                            <Route path="/admin/destinations" element={<AdminDestinationsPage/>}/>
                            <Route path="/admin/continent/:id" element={<AdminContinentPage/>}/>
                            <Route path="/admin/continents" element={<AdminContinentsPage/>}/>
                            <Route path="/admin/travel/:id" element={<AdminTravelPage/>}/>
                            <Route path="/admin/travel" element={<AdminTravelsPage/>}/>
                        </Route>
                        <Route element={<NavbarWithoutDisplayedLayout/>}>
                            <Route path="/destinations/:slug/continent" element={<ContinentPage/>}/>
                            <Route path="/destination/:id/travel" element={<TravelByDestination/>}/>
                            <Route path="/destinations/:id" element={<DetailDestination/>}/>
                            <Route path="/destinations" element={<DestinationsPage/>} />
                            <Route path="/" element={<HomePage />}/>
                        </Route>
                    </Routes>
                <ToastContainer 
                    position={toast.POSITION.BOTTOM_LEFT}
                />
                </div>
            </ScrollToTop>
        </HashRouter>
    );
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);