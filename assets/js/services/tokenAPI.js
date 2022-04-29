import axios from "axios";
import { FORGETPASSWORD_API } from "../config";
import { FORGET_API } from "../config";

async function find(email) {
    return axios
        .get(FORGETPASSWORD_API + "/" + email + "/check_email")
        .then(response => response.data);
}

async function create(id) {
    return axios
        .post(FORGET_API + "/" + id + "/post_token", {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.data);
}

async function check(token) {
    return axios
        .get(FORGET_API + "/" + token + "/get_token")
        .then(response => response.data);
}

export default {
    find,
    create,
    check
}