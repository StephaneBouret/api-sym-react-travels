import axios from "axios";
import { CONTINENTS_API } from "../config";

async function findAll() {
    return axios.get(CONTINENTS_API)
                .then((response) => response.data["hydra:member"]);
}

function deleteContinent(id) {
    return axios.delete(CONTINENTS_API + "/" + id);
}

async function find(id) {
    return axios
            .get(CONTINENTS_API + "/" + id)
            .then((response) => response.data);
}

function create(continents) {
    return axios.post(CONTINENTS_API, continents)
}

function update(id, continents) {
    return axios.put(CONTINENTS_API + "/" + id, continents)
}

function updateImage(id, formData) {
    return axios.post(CONTINENTS_API + "/" + id + "/image", formData);
}

async function getContinentBySlug(slug) {
    return axios.get(CONTINENTS_API + "/" + slug + "/continent")
                .then((response) => response.data["hydra:member"]);;
}

export default {
    findAll,
    delete: deleteContinent,
    find,
    create,
    update,
    updateImage,
    getContinentBySlug
}