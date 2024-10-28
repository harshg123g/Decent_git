import connectContract from '../web3Utils/connectContract';

interface WindowWithEthereum extends Window {
    ethereum?: any;
  }


export default async function connectCeramic()
{
const win = window as WindowWithEthereum;

const { CeramicClient } = await import('@ceramicnetwork/http-client');
const { ThreeIdConnect, EthereumAuthProvider } = await import( '@3id/connect');
const { DID } = await import('dids'); // Import DID
const { getResolver } = await import('@ceramicnetwork/3id-did-resolver'); // Import DID resolver


const { accounts } = await connectContract();
const account = accounts[0];

const ceramic = new CeramicClient("https://ceramic-clay.3boxlabs.com");
const authProvider = new EthereumAuthProvider(win.ethereum, account);
const threeIdConnect = new ThreeIdConnect();
await threeIdConnect.connect(authProvider);


const did = new DID({
  provider: threeIdConnect.getDidProvider(),
  resolver: getResolver(ceramic)
});

await did.authenticate();
//ceramic.did = did
ceramic.setDID(did);
console.log(did," is DID Provider");

console.log(authProvider," is auth provider")

console.log("ThreeID Initialted")
return ceramic;
}

