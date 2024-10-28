// // @ts-ignore
// const makeIpfsFetch  = import('js-ipfs-fetch');

// // @ts-ignore
// const { create } = await import('js-ipfs-fetch');
export interface IPFSLink {
    name: string;
    cid: string;
    size: number;
    type: 'file' | 'directory';
  }

  // utils/ipfs.ts
  interface IPFSResponse {
    Objects: Array<{
      Links: Array<{
        Name: string;
        Hash: string;
        Size: number;
        Type: number;
      }>;
    }>;
  }


// const ipfs = create({
//   url:"https://ipfs.moralis.io:2053/ipfs/"
// });
// const fetch = await makeIpfsFetch({ipfs})

// export default async function retrieveIPFS(){
//     const ipfs = create();
//     const response = await fetch(`https://ipfs.moralis.io:2053/ipfs/Qma5XXMPpLmxcgwM5K34PytrAcG66N73h8XuLBN7nZ9SnW/`, {headers: {Accept: 'application/json'}})
//     const text = await response.json()
//     console.log(text)
//     return text;
// }


export async function getIPFSFolder(): Promise<IPFSLink[]> {
    try {
        const response = await fetch(`https://bafybeifonruauajgx5cjxpxyog6kul2zj5v25buyxkdwvxuhsnl7pcs5gm.ipfs.dweb.link/`, {headers: {Accept: 'application/json'}})
        if (!response.ok) throw new Error('Failed to fetch folder');

      const data: IPFSResponse  = await response.json();
      return data.Objects[0].Links.map(link => ({
        name: link.Name,
        cid: link.Hash,
        size: link.Size,
        type: link.Type === 2 ? 'directory' : 'file'
      }));
    } catch (error) {
      console.error('Error fetching IPFS folder:', error);
      throw error;
    }
  }


  export async function getIPFSFolderAlternative(): Promise<IPFSLink[]> {
    const gateway = 'https://dweb.link';
    try {
      const response = await fetch(`https://bafybeifonruauajgx5cjxpxyog6kul2zj5v25buyxkdwvxuhsnl7pcs5gm.ipfs.dweb.link/?format=json`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Handle the directory listing format
      if (Array.isArray(data)) {
        return data.map(entry => ({
          name: entry.name,
          cid: entry.cid || entry.hash,
          size: entry.size,
          type: entry.type === 'directory' ? 'directory' : 'file'
        }));
      }

      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error fetching IPFS folder:', error);
      throw error;
    }
  }