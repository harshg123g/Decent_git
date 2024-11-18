import type { NextApiRequest, NextApiResponse } from 'next'
import Moralis from 'moralis';
import { createThirdwebClient } from "thirdweb";
import { upload } from "thirdweb/storage";



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
        // if (!process.env.MORALIS_API_KEY) {
        //     throw new Error('MORALIS_API_KEY is not defined');
        // }

        if (!process.env.THIRDWEB_SECRET_KEY) {
            throw new Error('MORALIS_API_KEY is not defined');
        }

        const client = createThirdwebClient({
            // use `secretKey` for server side or script usage
            secretKey: process.env.THIRDWEB_SECRET_KEY,
          });


          const response = await upload({
            client,
            files: abi,
          });


        // await Moralis.start({
        //     apiKey: process.env.MORALIS_API_KEY,
        // });

        // const response = await Moralis.EvmApi.ipfs.uploadFolder({ abi });

        // res.status(200).json({ message: response.toJSON() });
          if(!response) throw "No response";
          if(response.length <= 0) throw "Response length less than 0";
          const firstUrl = response[0];

        console.log(response);
        const message = [{ path: firstUrl }];

        res.status(200).json({
            message: message, // Directly use the response here
          });    

    } catch (error) {
        console.error('Error uploading to Moralis:', error);
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Failed to upload to Moralis',
        });
    }
}