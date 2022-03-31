import axios from "axios";
import { COUNTRIES_API } from "../config";

async function findAll() {
    return axios.get(COUNTRIES_API)
                .then((response) => response.data["hydra:member"])
}

async function find(currentIdCountry) {
    return axios.get(COUNTRIES_API + "/" + currentIdCountry)
    .then((response) => response.data);
}

export default {
    findAll,
    find
}