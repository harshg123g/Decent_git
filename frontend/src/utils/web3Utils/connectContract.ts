import ABI from "../../../../contract/ABI.json";
import web3Provider from "./web3Provider";

const contractAddress = "0x0fcf4859d699a73c4695895b72b4709e2b1b8e26";

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


