import React, { useState, useCallback } from 'react';
import uploadToMoralis from '@/utils/uploadToMoralis';
import splitCID from '@/utils/fileUtils/splitCID';
import connectContract from '@/utils/web3Utils/connectContract';

const UPLOAD_URL = "/api/uploadMetadata";

function Index() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const uploadFolder = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const repoId = window.location.pathname.split('/')[2];
      const files = event.target.files;

      if (!title || !description) {
        alert("Please fill in the title and description before uploading.");
        return;
      }

      try {
        // Upload files to Moralis
        const response = await uploadToMoralis(files);
        console.log("FILE UPLOADED TO IPFS RESPONSE IS", response);

        const cid = await splitCID(response);
        console.log("FILES CID IS", cid);

        const { contract, accounts } = await connectContract();

        // Create the ABI object with the latest title and description
        const abi = {
          title,
          description,
          author: accounts[0],
          createdAt: new Date().toISOString(),
          cid,
          filesChanged: [
            "pathtofile1.js",
            "pathtofile2.css",
          ],
        };

        console.log("ABI OBJECT:", abi);

        // Save metadata via API call
        const response2 = await fetch(UPLOAD_URL, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ abi }),
        });

        const formattedResponse = await response2.json();
        const metadataCID = splitCID(formattedResponse);
        console.log("METADATA CID:", metadataCID);

        // Interact with the smart contract
        console.log("Repo ID:", repoId);
        const res = await contract.methods.createPull(metadataCID, repoId).send({ from: accounts[0] });
        console.log("CONTRACT RESPONSE:", res);

      } catch (error) {
        console.error("Error during upload or contract interaction:", error);
        alert(error || "An error occurred");
      }
    },
    [title, description] // Dependencies to capture the latest state
  );

  return (
    <div className="pt-[100px] flex flex-col gap-4 w-auto items-center justify-center">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-white"
        placeholder="Pull Name"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="text-white"
        placeholder="Pull Description"
      />
      <input
        type="file"
        {...({ webkitdirectory: "true" })}
        multiple
        {...({ mozdirectory: "true" })}
        {...({ directory: "true" })}
        onChange={uploadFolder}
        {...({} as React.InputHTMLAttributes<HTMLInputElement>)}
      />
    </div>
  );
}

export default Index;
