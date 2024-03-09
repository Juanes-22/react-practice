import axios from "axios"

export const getAllTasks = () => {
    return axios.get("https://rickandmortyapi.com/api/character");
}
