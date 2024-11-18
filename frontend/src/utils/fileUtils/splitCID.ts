// interface Response {
//     message: {
//       path: string;
//     }[];
//   }


const splitCID=(response: any)=>{
    const url = response.message[0].path?  response.message[0].path : response.message.toString();
    console.log(url);
    const parts = url.split('/');
    console.log(parts[2])
    return parts[2].toString(); 
}

export default splitCID;
