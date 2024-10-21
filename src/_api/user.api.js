import axios from 'axios';
import { requestOptions } from '../_helpers/request-options'; // Import des en-têtes

const END_POINT = `${process.env.API_URL}/auth`;

export const authApi = {
    creatUser,
    findById,
    findByIdRoom,
    deleteUser,
};

function creatUser(id) {
  return axios
    .post(`${END_POINT}/register`, id, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.error(error));
}

function findById(id) {
    return axios
    .post(`${END_POINT}/findById`, id, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.error(error));
}

function findByIdRoom(id) {
    return axios
    .post(`${END_POINT}/findByIdRoom`, id, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.error(error));
}

function deleteUser(id) {
    return axios
    .delete(`${END_POINT}/delete`, id, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.error(error));
}