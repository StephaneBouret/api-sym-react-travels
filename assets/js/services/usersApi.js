import axios from "axios";
import jwtDecode from 'jwt-decode';
import { USERS_API } from "../config";

function register(user) {
    return axios.post(
        USERS_API, user);
}

function update(id, user) {
    return axios.put(
        USERS_API + "/" + id, user 
    );
}

export default {
    register,
    update
};