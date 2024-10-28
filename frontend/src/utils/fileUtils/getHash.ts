import CryptoJS from 'crypto-js';

export  function getHash(content: string) {
    return CryptoJS.SHA256(content).toString(CryptoJS.enc.Hex);
  };

