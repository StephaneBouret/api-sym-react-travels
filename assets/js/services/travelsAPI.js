import axios from "axios";
import { TRAVELS_API } from "../config";

async function findAll() {
    return axios.get(TRAVELS_API)
                .then((response) => response.data["hydra:member"])
}

async function find(id) {
    return axios
            .get(TRAVELS_API + "/" + id)
            .then((response) => response.data);
}

function deleteTravel(id) {
    return axios.delete(TRAVELS_API + "/" + id)
}

function update(id, travel) {
    return axios.put(
        TRAVELS_API + "/" + id, 
        {...travel, destinations: `/api/destinations/${travel.destinations}`}
    );
}

function create(travel) {
    return axios.post(
        TRAVELS_API, 
        {...travel, destinations: `/api/destinations/${travel.destinations}`}
    );
}

function updateImage(id, formData) {
    return axios.post(TRAVELS_API + "/" + id + "/image", formData);
}

export default {
    findAll,
    delete: deleteTravel,
    find,
    create,
    update,
    updateImage
}