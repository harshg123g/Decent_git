import Ceramic from "../ceramicUtils/connectCeramic";
import { TileDocument } from '@ceramicnetwork/stream-tile'; // Import TileDocument


const updateCeramicDocument = async(newCid: string, doc:TileDocument, version:number ) =>{
    const response = await doc.update({
        ipfsHash: newCid,
        version: version,
        additionalInfo: 'Updated info',
    });
    return response;

}
export default updateCeramicDocument;