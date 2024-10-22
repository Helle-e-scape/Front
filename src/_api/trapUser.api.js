import axios from 'axios';
import {BACKEND_URL} from "@env";

const END_POINT = BACKEND_URL + "/trapUser";

export const trapUserApi = {
    createTrap,
    findAllByIdRoom,
    update,
};

async function createTrap(location, userId, nameTrap, roomId) {
  try {
        const response = await axios
            .post(`${END_POINT}/createTrap`, { location: location }, { userId: userId }, { nameTrap: nameTrap }, { roomId: roomId });
        return response.data;
    } catch (error) {
        return console.error(error);
    }
}

async function findAllByIdRoom(idRoom) {
    try {
        const response = await axios
            .post(`${END_POINT}/findAllByIdRoom`, idRoom);
        return response.data;
    } catch (error) {
        return console.error(error);
    }
}

async function update(_id, location) {
    try {
        const response = await axios
            .put(`${END_POINT}/update`, _id, location);
        return response.data;
    } catch (error) {
        return console.error(error);
    }
}