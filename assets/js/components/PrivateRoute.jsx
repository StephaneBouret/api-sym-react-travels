import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import JwtDecode from "jwt-decode";

const PrivateRoute = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const token = window.localStorage.getItem("authToken");
    if (!token) {
        return <Navigate to="/"/>;
    }
    const { roles } = JwtDecode(token);
    return isAuthenticated && roles.includes('ROLE_ADMIN') ? <Outlet /> : <Navigate to="/" />;
}
 
export default PrivateRoute;