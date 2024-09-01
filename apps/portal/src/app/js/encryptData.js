import CryptoJS from 'crypto-js';

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, 'secretkey').toString();
};

export default encryptData;
