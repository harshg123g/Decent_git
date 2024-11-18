import Ceramic from "../../components/connectCeramic";
import { TileDocument } from '@ceramicnetwork/stream-tile';


const docContent = {
    ipfsHash: 'Qm...',
    fileHash: 'abc123...',
    version: 1,
    timestamp: Date.now(),
    additionalInfo: 'Any other relevant info'
};


const PRData = {
    commitHash: 'commit-hash',
    author: 'author-id',
    timestamp: Date.now(),
    message: 'Initial commit',
    changes: [
        { file: 'file1.txt', action: 'added' },
        { file: 'file2.txt', action: 'modified' }
    ]
};

const repoMetadata = {
    repoId: 'unique-repo-id',
    owner: 'user-id',
    name: 'my-repo',
    description: 'This is a sample repository.',
    createdAt: Date.now(),
};


const fileMetadata = {
    fileId: 'unique-file-id',
    ipfsCid: 'Qm...',
    size: '2MB',
    type: 'text/plain',
};

const branchData = {
    branchName: 'main',
    baseCommit: 'base-commit-hash',
    commits: ['commit1-hash', 'commit2-hash']
};

const userAction = {
    actionType: 'commit',
    targetRepo: 'repo-id',
    timestamp: Date.now(),
};

const createCeramicDocument = async() =>{
    if(!Ceramic) return;
    if(!Ceramic.did) return;
    await Ceramic.did.authenticate();
    const metadata = { controllers: [Ceramic.did.id] };
    const doc = await TileDocument.create(Ceramic, docContent, metadata);
    console.log('Document ID:', doc.id.toString());
    return doc;

}

