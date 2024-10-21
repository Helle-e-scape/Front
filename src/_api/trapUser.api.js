import axios from 'axios';
import {BACKEND_URL} from "@env";

const END_POINT = BACKEND_URL + "/trapUser";

export const authApi = {
    createTrap,
    findAllByIdRoom,
    update,
};

function createTrap(location, userId, nameTrap, roomId) {
  return axios
    .post(`${END_POINT}/createTrap`, { location: location }, { userId: userId  }, { nameTrap: nameTrap  }, { roomId: roomId } )
    .then(response => response.data)
    .catch((error) => console.error(error));
}

function findAllByIdRoom(idRoom) {
    return axios
    .post(`${END_POINT}/findAllByIdRoom`, idRoom )
    .then(response => response.data)
    .catch((error) => console.error(error));
}

function update(_id, location) {
    return axios
    .put(`${END_POINT}/update`, _id, location )
    .then(response => response.data)
    .catch((error) => console.error(error));
}