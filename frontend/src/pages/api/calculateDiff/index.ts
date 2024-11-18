// import { NextApiRequest, NextApiResponse } from "next";
// import { download } from "thirdweb/storage";
// import { createThirdwebClient } from "thirdweb";

// export default async function GHandler(req: NextApiRequest, res: NextApiResponse)
// {
//     var {main_cid, pull_cid} = req.query;
//     try{
//     if(req.method!="GET")
//     {    
//         throw "WRONG METHOD";
//     }
//     if(!process.env.THIRDWEB_SECRET_KEY)
//     {
//         throw "INVALID SECRET"
//     }
//     if(!main_cid || !pull_cid)
//     {
//         throw "INVALID CID";
//     }
//     main_cid = main_cid.toString();
//     pull_cid = pull_cid.toString();

//     const client = createThirdwebClient({secretKey:process.env.THIRDWEB_SECRET_KEY});
    
//     const main_repo = await download({ client: client,
//         uri: main_cid});
    
//     const pull_repo = await download({client:client,uri: pull_cid});

//     //compare and get differences on client


// }
// catch(error)
// {
//     switch(error)
//     {
//         case "WRONG METHOD":
//             res.status(400).json({message: "Wrong Method Use Get"});
//             break;

//         case "INVALID SECRET":
//             res.status(400).json({message: "Invalid secret key used"});
//             break;
        
//         case "INVALID CID":
//             res.status(400).json({message:"Invalid Cids used"});

//     }
// }
// }