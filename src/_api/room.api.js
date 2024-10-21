import axios from 'axios';
import { requestOptions } from '../_helpers/request-options'; // Import des en-têtes

const END_POINT = `${process.env.API_URL}/room`;

export const authApi = {
    creatRoom,
    userJoinRoom,
    deleteRoom,
};

function creatRoom(name) {
  return axios
    .post(`${END_POINT}/create`, name, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.error(error));
}

function userJoinRoom(idUser, idRoom) {
    return axios
    .put(`${END_POINT}/userJoin`, idUser, idRoom, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.error(error));
}

function deleteRoom(id) {
    return axios
    .delete(`${END_POINT}/delete`, id, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.error(error));
}