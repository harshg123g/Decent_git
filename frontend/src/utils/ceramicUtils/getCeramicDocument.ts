import Ceramic from "./connectCeramic";

const getCeramicData = async(id: string) => {
    const stream = await Ceramic.loadStream(id);
    return stream;
}

export default getCeramicData;


