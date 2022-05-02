import axios from "axios";
import { FORGET_API } from "../config";

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
    create,
    check
}