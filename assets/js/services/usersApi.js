import axios from "axios";
import { FORGETPASSWORD_API, PROFILE_API, USERS_API } from "../config";

function register(user) {
    return axios.post(
        USERS_API, user);
}

async function find(id) {
    return axios
        .get(USERS_API + "/" + id)
        .then((response) => response.data);
}

function update(id, user) {
    return axios.put(
        USERS_API + "/" + id, user 
    );
}

function patch(id, user) {
    return axios.patch(
        USERS_API + "/" + id, user, {
            headers: {
                'Content-Type': 'application/merge-patch+json'
            }
        }
    );
}

async function checkEmail(email) {
    return axios
        .get(FORGETPASSWORD_API + "/" + email + "/check_email")
        .then(response => response.data);
}

async function checkPassword(password) {
    return axios.get(PROFILE_API + "/" + password + "/check_password")
                .then(response => response.data);
}

export default {
    register,
    update,
    find,
    checkEmail,
    checkPassword,
    patch
};