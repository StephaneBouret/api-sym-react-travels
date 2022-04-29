import axios from "axios";
import jwtDecode from 'jwt-decode';
import { USERS_API } from "../config";

function register(user) {
    return axios.post(
        USERS_API, user);
}

export default {
    register,
};