import axios from 'axios';
import { requestOptions } from '../_helpers/request-options'; // Import des en-têtes

const END_POINT = `${process.env.API_URL}/trapUser`;

export const authApi = {
    createTrap,
    findAllByIdRoom,
    update,
};

function createTrap(location, userId, nameTrap, roomId) {
  return axios
    .post(`${END_POINT}/createTrap`, location, userId, nameTrap, roomId, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.error(error));
}

function findAllByIdRoom(idRoom) {
    return axios
    .post(`${END_POINT}/findAllByIdRoom`, idRoom, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.error(error));
}

function update(_id, location) {
    return axios
    .put(`${END_POINT}/update`, _id, location, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.error(error));
}