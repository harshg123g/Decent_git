import { NextApiRequest, NextApiResponse } from "next";
import { upload } from "thirdweb/storage";
import { createThirdwebClient } from "thirdweb";


export default async function Phandler(req: NextApiRequest, res: NextApiResponse)
{
    try{

        const {meta} = req.body;

        if (!process.env.THIRDWEB_SECRET_KEY) {
            throw new Error('MORALIS_API_KEY is not defined');
        }

        const client = createThirdwebClient({
            secretKey: process.env.THIRDWEB_SECRET_KEY,
          });


        const response = await upload({
            client,
            files: [new File([`${meta}`], "metdata.txt")],
        });


        if(!response) throw "No response";
        if(response.length <= 0) throw "Response length less than 0";
        console.log(response);
        
      res.status(200).json({
          message: response});   
          
    }catch(error)
    {
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Failed to upload to Moralis',
        });
    }
}