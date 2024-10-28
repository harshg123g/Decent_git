import type { NextApiRequest, NextApiResponse } from 'next'
import Moralis from 'moralis';


type ResponseData = {
    message?: { path: string }[];
    error?: string;
}

export default async function Phandler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
  ){
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' }); // This works since `message` is optional
    }
    try {
        const { abi } = req.body;
        if (!process.env.MORALIS_API_KEY) {
            throw new Error('MORALIS_API_KEY is not defined');
        }

        await Moralis.start({
            apiKey: process.env.MORALIS_API_KEY,
        });

        const response = await Moralis.EvmApi.ipfs.uploadFolder({ abi });

        res.status(200).json({ message: response.toJSON() });

    } catch (error) {
        console.error('Error uploading to Moralis:', error);
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Failed to upload to Moralis',
        });
    }
}