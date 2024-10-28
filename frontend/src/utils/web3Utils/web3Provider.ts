import Web3 from "web3";

interface WindowWithEthereum extends Window {
    ethereum?: any;
}

const web3Provider = async (): Promise<Web3 | null> => {
    if (typeof window !== "undefined") {
        const win = window as WindowWithEthereum;

        if (win.ethereum) {
            try {
                // Request account access
                await win.ethereum.request({ method: "eth_requestAccounts" });
                const web3 = new Web3(win.ethereum);
                return web3;
            } catch (error) {
                console.error("User denied account access:", error);
                return null;
            }
        } else {
            console.log("No Ethereum browser detected. Please install MetaMask.");
            return null;
        }
    }

    console.log("Web3 provider can only be initialized in a browser environment.");
    return null;
};

export default web3Provider;
