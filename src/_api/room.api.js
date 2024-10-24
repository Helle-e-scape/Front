import axios from 'axios';
import {BACKEND_URL} from "@env";

const END_POINT = BACKEND_URL + '/room';

export const roomApi = {
    creatRoom,
    userJoinRoom,
    deleteRoom,
};

async function creatRoom(name) {
  try {
        const response = await axios
            .post(`${END_POINT}/create`, { name: name });
        return response.data;
    } catch (error) {
        return console.error(error);
    }
}

async function userJoinRoom(idUser, roomCode) {
    try {
        const response = await axios
            .put(`${END_POINT}/userJoin`, { _id: idUser, roomCode: roomCode });
        return response.data;
    } catch (error) {
        return console.error(error);
    }
}

function deleteRoom(id) {
    return axiosroomId
    .delete(`${END_POINT}/delete`, { _id: id })
    .then(response => response.data)
    .catch((error) => console.error(error));
}