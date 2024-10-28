interface Response {
    message: {
      path: string;
    }[];
  }
const splitCID=(response: Response,i:number)=>{
    const url = response.message[i].path;
    const parts = url.split('/').filter(part => part);
    return parts[3]; //[3]
}

export default splitCID;
