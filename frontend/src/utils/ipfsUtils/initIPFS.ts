import { create } from 'ipfs-core';

const initIPFS = async () => {
  const ipfs = await create({
    config: {
      Addresses: {
        API: '/dns4/ipfs.infura.io/tcp/5001/https', // Infura endpoint
      },
    },
  });
  console.log('Connected to public IPFS node');
  return ipfs;
};

export default initIPFS;