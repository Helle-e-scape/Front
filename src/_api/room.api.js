import axios from 'axios';
import {BACKEND_URL} from "@env";

const END_POINT = BACKEND_URL + '/room';

export const authApi = {
    creatRoom,
    userJoinRoom,
    deleteRoom,
};

function creatRoom(name) {
  return axios
    .post(`${END_POINT}/create`, { name: name})
    .then(response => response.data)
    .catch((error) => console.error(error));
}

function userJoinRoom(idUser, roomId) {
    return axios
    .put(`${END_POINT}/userJoin`, { _id: idUser }, { roomId: roomId })
    .then(response => response.data)
    .catch((error) => console.error(error));
}

function deleteRoom(id) {
    return axiosroomId
    .delete(`${END_POINT}/delete`, { _id: id })
    .then(response => response.data)
    .catch((error) => console.error(error));
}