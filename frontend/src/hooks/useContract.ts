import connectContract from "@/utils/web3Utils/connectContract"

interface ContractMethodOptions {
    methodType: "call" | "send";
    methodName: string;
    params?: any[];
}

export const useContract = async ({ methodType, methodName, params = [] }: ContractMethodOptions) => {
    try {
        const { contract, accounts } = await connectContract();

        if (!contract || !accounts.length) {
            throw new Error("Contract or accounts not available");
        }
        if (methodType === "send") {
            const response = await contract.methods[methodName](...params).send({ from: accounts[0] });
            return response;
        } else if (methodType === "call") {
            const response = await contract.methods[methodName](...params).call();
            return response;
        } else {
            throw new Error("Invalid method type");
        }
    } catch (error) {
        console.error(`Error executing contract method: ${error}`);
        throw error;
    }
};