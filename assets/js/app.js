// Les imports importants
import React, { useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Routes, Outlet, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/homePage/HomePage';
import AdminContinentsPage from './pages/adminContinents/AdminContinentsPage';
import AdminContinentPage from './pages/adminContinent/AdminContinentPage';
import AdminDestinationsPage from './pages/adminDestinations/AdminDestinationsPage';
import AdminDestinationPage from './pages/adminDestination/AdminDestinationPage';
import AdminImagesPage from './pages/adminImages/AdminImagesPage';
import AdminImagePage from './pages/adminImage/AdminImagePage';
import AdminTravelsPage from './pages/adminTravels/AdminTravelsPage';
import AdminTravelPage from './pages/adminTravel/AdminTravelPage';
import DestinationsPage from './pages/destinations/DestinationsPage';
import DetailDestination from './pages/detailDestination/DetailDestination';
import DetailTravel from './pages/detailTravel/DetailTravel';
import TravelsPage from './pages/travels/TravelsPage';
import TravelByDestination from './pages/travelByDestination/TravelByDestination';
import ContinentPage from './pages/continent/ContinentPage';
import AboutPage from './pages/about/AboutPage';
import Footer from './components/footer/Footer';

// any CSS you import will output into a single css file (app.css in this case)
import '../styles/app.css';

// start the Stimulus application
import '../bootstrap';
import NavbarDisplayed from './components/navbar/NavbarDisplayed';
import NavbarWithoutDisplay from './components/navbar/NavbarWithoutDisplay';

const Wrapper = ({children}) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
};

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
                {/* <Navbar/> */}
            <Wrapper>
                <div>
                    <Routes>
                        <Route element={<NavbarDisplayedLayout/>}>
                            <Route path="/admin/destination/:id" element={<AdminDestinationPage/>}/>
                            <Route path="/admin/destinations" element={<AdminDestinationsPage/>}/>
                            <Route path="/admin/continent/:id" element={<AdminContinentPage/>}/>
                            <Route path="/admin/continents" element={<AdminContinentsPage/>}/>
                            <Route path="/admin/images/:id" element={<AdminImagePage/>}/>
                            <Route path="/admin/images" element={<AdminImagesPage/>}/>
                            <Route path="/admin/travel/:id" element={<AdminTravelPage/>}/>
                            <Route path="/admin/travel" element={<AdminTravelsPage/>}/>
                        </Route>
                        <Route element={<NavbarWithoutDisplayedLayout/>}>
                            <Route path="/about" element={<AboutPage/>}/>
                            <Route path="/travel/:id" element={<DetailTravel/>}/>
                            <Route path="/travel" element={<TravelsPage/>}/>
                            <Route path="/destinations/:slug/continent" element={<ContinentPage/>}/>
                            <Route path="/destination/:id/travel" element={<TravelByDestination/>}/>
                            <Route path="/destinations/:id" element={<DetailDestination/>}/>
                            <Route path="/destinations" element={<DestinationsPage/>} />
                            <Route path="/" element={<HomePage />}/>
                        </Route>
                    </Routes>
                    <Footer/>
                <ToastContainer 
                    position={toast.POSITION.BOTTOM_LEFT}
                />
                </div>
            </Wrapper>
        </HashRouter>
    );
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);