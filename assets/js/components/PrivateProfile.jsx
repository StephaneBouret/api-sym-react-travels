import React, { useContext } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import JwtDecode from "jwt-decode";

const PrivateProfile = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const token = window.localStorage.getItem("authToken");
    if (!token) {
        return <Navigate to="/"/>;
    }
    const { roles, id } = JwtDecode(token);

    const data = useParams();
    const slug = Number(data.id);
    const userId = id;
    const userRoles = roles;
    return isAuthenticated &&
        userRoles.includes('ROLE_USER') &&
        token.length > 0 &&
        userId === slug ? <Outlet/> : <Navigate to={"/"}/>;
}
 
export default PrivateProfile;