import axios from "axios";
import { CONTACTS_API } from "../config";

function create(query) {
    return axios.post(
        CONTACTS_API, 
        {...query, destinations: `/api/destinations/${query.destinations}`}
    );
}

export default {
    create
}