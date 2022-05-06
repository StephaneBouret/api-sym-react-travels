// Les imports importants
import React, { useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// start the Stimulus application
import '../bootstrap';
// any CSS you import will output into a single css file (app.css in this case)
import '../styles/app.css';
import Footer from './components/footer/Footer';
import NavbarDisplayed from './components/navbar/NavbarDisplayed';
import NavbarWithoutDisplay from './components/navbar/NavbarWithoutDisplay';
import PrivateProfile from './components/PrivateProfile';
import PrivateRoute from './components/PrivateRoute';
import AuthContext from './contexts/AuthContext';
import AboutPage from './pages/about/AboutPage';
import AdminContinentPage from './pages/adminContinent/AdminContinentPage';
import AdminContinentsPage from './pages/adminContinents/AdminContinentsPage';
import AdminDestinationPage from './pages/adminDestination/AdminDestinationPage';
import AdminDestinationsPage from './pages/adminDestinations/AdminDestinationsPage';
import AdminImagePage from './pages/adminImage/AdminImagePage';
import AdminImagesPage from './pages/adminImages/AdminImagesPage';
import AdminTravelPage from './pages/adminTravel/AdminTravelPage';
import AdminTravelsPage from './pages/adminTravels/AdminTravelsPage';
import AdminUserPage from './pages/adminUser/AdminUserPage';
import AdminUsersPage from './pages/adminUsers/AdminUsersPage';
import AdminWishPage from './pages/adminWish/AdminWishPage';
import AdminWishesPage from './pages/adminWishes/AdminWishesPage';
import ChangePassword from './pages/ChangePassword';
import ContactPage from './pages/contact/ContactPage';
import ContinentPage from './pages/continent/ContinentPage';
import DestinationsPage from './pages/destinations/DestinationsPage';
import DetailDestination from './pages/detailDestination/DetailDestination';
import DetailTravel from './pages/detailTravel/DetailTravel';
import ForgetPassword from './pages/ForgetPassword';
import ForgetPasswordCheck from './pages/ForgetPasswordCheck';
import HomePage from './pages/homePage/HomePage';
import LoginPage from './pages/LoginPage';
import NewFeaturesPage from './pages/nouveautes/NewFeaturesPage';
import PartnersPage from './pages/partners/PartnersPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import ResetPassword from './pages/ResetPassword';
import TravelByDestination from './pages/travelByDestination/TravelByDestination';
import TravelsPage from './pages/travels/TravelsPage';
import WishPage from './pages/wish/WishPage';
import WishesPage from './pages/wishes/WishesPage';
import AuthAPI from './services/authApi';




const Wrapper = ({children}) => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
};

AuthAPI.setup();

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        AuthAPI.isAuthenticated()
    );

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
        <Footer />
        </>
    );

    return ( 
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated
            }}
        >
            <HashRouter>
                    {/* <Navbar/> */}
                <Wrapper>
                    <div>
                        <Routes>
                            <Route element={<PrivateProfile/>}>
                                <Route path="/profile/:id" element={<ProfilePage/>}/>
                                <Route path="/profile/:id/changepassword" element={<ChangePassword/>}/>
                            </Route>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/register" element={<RegisterPage/>}/>
                            <Route path="/forgetpassword/done" element={<ForgetPasswordCheck/>}/>
                            <Route path='/resetpassword/:token' element={<ResetPassword />} />
                            <Route path="/forgetpassword" element={<ForgetPassword/>}/>
                            <Route element={<PrivateRoute/>}>
                                <Route element={<NavbarDisplayedLayout/>}>
                                    <Route path="/admin/destination/:id" element={<AdminDestinationPage/>}/>
                                    <Route path="/admin/destinations" element={<AdminDestinationsPage/>}/>
                                    <Route path="/admin/continent/:id" element={<AdminContinentPage/>}/>
                                    <Route path="/admin/continents" element={<AdminContinentsPage/>}/>
                                    <Route path="/admin/images/:id" element={<AdminImagePage/>}/>
                                    <Route path="/admin/images" element={<AdminImagesPage/>}/>
                                    <Route path="/admin/travel/:id" element={<AdminTravelPage/>}/>
                                    <Route path="/admin/travel" element={<AdminTravelsPage/>}/>
                                    <Route path="/admin/users/:id" element={<AdminUserPage/>}/>
                                    <Route path="/admin/users" element={<AdminUsersPage/>}/>
                                    <Route path="/admin/wishes/:id" element={<AdminWishPage/>}/>
                                    <Route path="/admin/wishes" element={<AdminWishesPage/>}/>
                                </Route>
                            </Route>
                            <Route element={<NavbarWithoutDisplayedLayout/>}>
                                <Route path="/vos-envies/:id" element={<WishPage/>}/>
                                <Route path="/vos-envies" element={<WishesPage/>}/>
                                <Route path="/nos-partenaires" element={<PartnersPage/>}/>
                                <Route path="/nouveautes" element={<NewFeaturesPage/>} />
                                <Route path="/contact" element={<ContactPage/>}/>
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
                    <ToastContainer 
                        position={toast.POSITION.BOTTOM_LEFT}
                    />
                    </div>
                </Wrapper>
            </HashRouter>
        </AuthContext.Provider>
    );
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);