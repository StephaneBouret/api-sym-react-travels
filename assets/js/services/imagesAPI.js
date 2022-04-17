import axios from "axios";
import { IMAGES_API } from "../config";

async function findAll() {
    return axios.get(IMAGES_API)
                .then((response) => response.data["hydra:member"])
}

async function find(id) {
    return axios
            .get(IMAGES_API + "/" + id)
            .then((response) => response.data);
}

function deleteTravel(id) {
    return axios.delete(IMAGES_API + "/" + id)
}

function create(images) {
    return axios.post(IMAGES_API, 
    {...images, travels: `/api/travel/${images.travels}`});
}

function createCarousel(images, id) {
    return axios.post(IMAGES_API,
    {...images, travels: `/api/travel/${id}`});
}

function updateImage(id, formData) {
    return axios.post(IMAGES_API + "/" + id + "/carousel", formData);
}

function deleteCarousel(id) {
    return axios.delete(IMAGES_API + "/" + id);
}

export default {
    findAll,
    delete: deleteTravel,
    find,
    create,
    updateImage,
    createCarousel,
    deleteCarousel
}