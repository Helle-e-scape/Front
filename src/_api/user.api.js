import axios from 'axios';
import {BACKEND_URL} from "@env";

const END_POINT = BACKEND_URL + "/auth";

export const authApi = {
    creatUser,
    findById,
    findByIdRoom,
    deleteUser,
};

function creatUser(pseudo) {
  return axios
    .post(`${END_POINT}/register`,  { pseudo: pseudo })
    .then(response => response.data)
    .catch((error) => console.error(error));
}

function findById(id) {
    return axios
    .post(`${END_POINT}/findById`, { id: id })
    .then(response => response.data)
    .catch((error) => console.error(error));
}

function findByIdRoom(roomId) {
    return axios
    .post(`${END_POINT}/findByIdRoom`, { roomId: roomId })
    .then(response => response.data)
    .catch((error) => console.error(error));
}

function deleteUser(id) {
    return axios
    .delete(`${END_POINT}/delete`, { _id: id })
    .then(response => response.data)
    .catch((error) => console.error(error));
}