// Les imports importants
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/homePage/HomePage';
import AdminDestinationsPage from './pages/adminDestinations/AdminDestinationsPage';
import AdminDestinationPage from './pages/adminDestination/AdminDestinationPage';
import AdminTravelsPage from './pages/adminTravels/AdminTravelsPage';
import AdminTravelPage from './pages/adminTravel/AdminTravelPage';
import DestinationsPage from './pages/destinations/DestinationsPage';

// any CSS you import will output into a single css file (app.css in this case)
import '../styles/app.css';

// start the Stimulus application
import '../bootstrap';

const App = () => {
    return ( 
        <HashRouter>
            <Navbar/>
            <div>
                <Routes>
                    <Route path="/destinations" element={<DestinationsPage/>} />
                    <Route path="/admin/travel/:id" element={<AdminTravelPage/>}/>
                    <Route path="/admin/travel" element={<AdminTravelsPage/>}/>
                    <Route path="/admin/destination/:id" element={<AdminDestinationPage/>}/>
                    <Route path="/admin/destinations" element={<AdminDestinationsPage/>}/>
                    <Route path="/" element={<HomePage />}/>
                </Routes>
            <ToastContainer 
                position={toast.POSITION.BOTTOM_LEFT}
            />
            </div>
        </HashRouter>
    );
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);