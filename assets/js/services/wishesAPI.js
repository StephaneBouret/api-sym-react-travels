import axios from "axios";
import { WISHES_API } from "../config";

async function findAll() {
    return axios.get(WISHES_API)
                .then((response) => response.data["hydra:member"])
}

async function find(id) {
    return axios
            .get(WISHES_API + "/" + id)
            .then((response) => response.data);
}

function deleteWish(id) {
    return axios.delete(WISHES_API + "/" + id)
}

function update(id, wish) {
    return axios.put(
        WISHES_API + "/" + id, wish
        // {...travel, destinations: `/api/destinations/${travel.destinations}`}
    );
}

function create(whish) {
    return axios.post(
        WISHES_API, whish
        // {...travel, destinations: `/api/destinations/${travel.destinations}`}
    );
}

function updateImage(id, formData) {
    return axios.post(WISHES_API + "/" + id + "/image", formData);
}

function updateWishes(id, wish) {
    return axios.put(
        WISHES_API + "/" + id, wish
    );
}

export default {
    findAll,
    delete: deleteWish,
    find,
    create,
    update,
    updateImage,
    updateWishes
}