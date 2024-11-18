import ABI from "../../../../contract/ABI.json";
import web3Provider from "./web3Provider";

const contractAddress = "0xFC3DD73C93376D2371571cB3885b604f4Afc1adf";

const connectContract = async() =>{
    const web3 = await web3Provider();
    if (web3) {
        const accounts = await web3.eth.getAccounts();
        const contract = new web3.eth.Contract(ABI, contractAddress);
        return { contract, accounts };
    } else {
        throw new Error("Web3 provider is not available");
    }
}




export default connectContract;


