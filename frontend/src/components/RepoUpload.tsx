import React, { useCallback } from 'react';
import uploadToMoralis from '@/utils/uploadToMoralis';
import splitCID from '@/utils/fileUtils/splitCID';
import { useContract } from '@/hooks/useContract';
import connectContract from '@/utils/web3Utils/connectContract';

const RepoUpload = () => {
  const uploadFolder = useCallback(async(event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    try{
      const response = await uploadToMoralis(files);
      const cid = splitCID(response);
      console.log(cid)
      const { contract, accounts } = await connectContract();
      const res = await contract.methods.createRepo("Repo2", "Repo2_desc",cid,false).send({ from: accounts[0] });
      console.log(res);
    }catch(e)
    {
      alert(e);
    }
  },[]);

  return (
    <input    type="file"
    {...({ webkitdirectory: "true" })}
       multiple
       {...({ mozdirectory : "true" })}
       {...({ directory: "true" })}
       onChange={uploadFolder}
       {...({} as React.InputHTMLAttributes<HTMLInputElement>)}>
    </input>
  );
};

export default RepoUpload;
