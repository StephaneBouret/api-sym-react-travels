import axios from "axios";
import { TRAVELS_API } from "../config";

async function findAll() {
    return axios.get(TRAVELS_API)
                .then((response) => response.data["hydra:member"])
}

function deleteTravel(id) {
    return axios.delete(TRAVELS_API + "/" + id)
}

export default {
    findAll,
    delete: deleteTravel
}