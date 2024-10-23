import axios from 'axios';
import {BACKEND_URL} from "@env";

const END_POINT = BACKEND_URL + "/auth";

export const authApi = {
    creatUser,
    findById,
    findByIdRoom,
    deleteUser,
};

async function creatUser(pseudo) {
  try {
        const response = await axios
            .post(`${END_POINT}/register`, { pseudo: pseudo });
        return response.data;
    } catch (error) {
        return console.error(error);
    }
}

async function findById(id) {
    try {
        const response = await axios
            .post(`${END_POINT}/findById`, { id: id });
        return response.data;
    } catch (error) {
        return console.error(error);
    }
}

async function findByIdRoom(roomId) {
    try {
        const response = await axios
            .post(`${END_POINT}/findByIdRoom`, { roomId: roomId });
        return response.data;
    } catch (error) {
        return console.error(error);
    }
}

async function deleteUser(id) {
    try {
        const response = await axios
            .delete(`${END_POINT}/delete`, { _id: id });
        return response.data;
    } catch (error) {
        return console.error(error);
    }
}