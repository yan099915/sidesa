import { io } from 'socket.io-client';
import getCookie from './getCookie';
const token = getCookie('sessionToken');

const isLocalhost = window.location.hostname === 'localhost';
let URL = isLocalhost ? 'http://localhost:3000' : 'https://api.sidera.my.id';

console.log(URL, 'URL');
export const socket = io(URL, {
  auth: {
    token: token,
  },
});
