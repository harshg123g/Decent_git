import processFiles from "./fileUtils/processFiles";
import { UseFetch } from "@/hooks/useFetch";

const UPLOAD_URL = "/api/uploadToMoralis";
const POST_METHOD = "POST";


const uploadToMoralis = async(files: FileList | null) => {

    try {
        if (!files || files.length === 0) {
          throw new Error('No files selected');
        }

        const abi = await processFiles(files);

        const response = await UseFetch({
          url: UPLOAD_URL,
          method: POST_METHOD,
          abi: abi
        });

        console.log(response);
        return response;
      } catch (error) {
        console.error('Error uploading files:', error);
      }
}

export default uploadToMoralis;