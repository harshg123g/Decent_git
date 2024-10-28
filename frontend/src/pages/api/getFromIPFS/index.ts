import type { NextApiRequest, NextApiResponse } from 'next'
import { create } from 'ipfs-http-client';
import axios from 'axios';

const ipfs = create({
    host: 'api.pinata.cloud',
    port: 443,
    protocol: 'https',
    headers: {
        pinata_api_key: "eec68ab32e9454a53a6b", // Add your API key here
        pinata_secret_api_key: "086ad74534399bbdbd9d9a2d9e91a71a717acdde5a0eae5dc7379ff31a373542", // Add your secret key here
    },
});


interface FileData {
    name: string;
    content: Buffer; // Note: You may want to return base64 or another format if sending content
}


export default async function Phandler(
    req: NextApiRequest,
    res: NextApiResponse
  ){
    const { cid } = req.query;

    if (!cid || Array.isArray(cid)) {
        return res.status(400).json({ error: 'Invalid or missing CID' });
    }

    try {
        const files:FileData[] = [];
        console.log(cid as string)
        const dir = ipfs.ls(cid as string); // Ensure cid is treated as a string

        const uri = `https://gateway.pinata.cloud/ipfs/${cid as string}/`
        const rest = await axios.get(uri, { responseType: 'arraybuffer' });
        for await (const file of dir) {
            const chunks: Buffer[] = [];
            if (file.type === 'file') {
                for await (const chunk of ipfs.cat(file.cid)) {

                    chunks.push(Buffer.from(chunk));
                }
                files.push({ name: file.name, content: Buffer.concat(chunks) });
            }
        }

        res.status(200).json(files);
    } catch (error) {
        console.error('Error downloading directory:', error);
        res.status(500).json({ error: 'Failed to download directory' });
    }
}