import axios from "axios";
import { DESTINATIONS_API } from "../config";

function findAll() {
    return axios.get(DESTINATIONS_API)
                .then((response) => response.data["hydra:member"]);
}

async function find(id) {
    return axios
            .get(DESTINATIONS_API + "/" + id)
            .then((response) => response.data);
}

function deleteDestination(id) {
    return axios.delete(DESTINATIONS_API + "/" + id);
}

function create(destinations) {
    return axios.post(DESTINATIONS_API, destinations)
}

function update(id, destinations) {
    return axios.put(DESTINATIONS_API + "/" + id, destinations)
}

function updateImage(id, formData) {
    return axios.post(DESTINATIONS_API + "/" + id + "/image", formData);
}

function getTravelsbyDestination(id) {
    return axios.get(DESTINATIONS_API + "/" + id + "/travel")
                .then((response) => response.data["hydra:member"]);
}

export default {
    findAll,
    delete: deleteDestination,
    find,
    create,
    update,
    updateImage,
    getTravelsbyDestination
}