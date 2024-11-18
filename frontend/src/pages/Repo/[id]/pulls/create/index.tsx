import React from 'react'
import { Button } from '@/components/ui/button'
import Uploader from "@/components/PullUpload";
import { useState,useCallback } from 'react';
import uploadToMoralis from '@/utils/uploadToMoralis';
import splitCID from '@/utils/fileUtils/splitCID';
import { useContract } from '@/hooks/useContract';
import connectContract from '@/utils/web3Utils/connectContract';
import { UseFetch } from '@/hooks/useFetch';




const UPLOAD_URL = "/api/uploadMetadata";




function index() {

  const [title, setTitle] = useState('TITLE');
  const [description, setDescription] = useState('DESCRIPTION');
  const [repoId, setRepoId] = useState(1);
  const [cid, setCID] = useState('')
  const [fileList, setFileList] = useState<File[]>([]); 


  const abi = {
    title: title,
    description: description,
    author: "0x12345abcde",
    createdAt: new Date().toISOString(),
    cid: "123",
    filesChanged: [
       "pathtofile1.js",
       "pathtofile2.css",
    ],
  };

  const uploadFolder = useCallback(async(event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    try{
      const response = await uploadToMoralis(files);
      setCID(splitCID(response));
      console.log(cid)
    }catch(e)
    {
      alert(e);
    }
  },[]);
  

async function createPull()
  {
try{
  const { contract, accounts } = await connectContract();
  const response = await fetch(UPLOAD_URL, {
    method: "POST",
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({abi}),
  });
  console.log(response)
  console.log(response);
  const formattedResponse = await response.json();
    const _cid =   splitCID(formattedResponse);
    console.log(_cid," Execution is here");
    const res = await contract.methods.createPull(_cid, 3).send({ from: accounts[0] });
    console.log(res);
}
catch(e:any)
{
  alert(e);
}

  }

  return (
    <div className='pt-[100px] flex flex-col gap-4 w-auto items-center justify-center align-left'>
         <input    type="file"
    {...({ webkitdirectory: "true" })}
       multiple
       {...({ mozdirectory : "true" })}
       {...({ directory: "true" })}
       onChange={uploadFolder}
       {...({} as React.InputHTMLAttributes<HTMLInputElement>)}>
    </input> 
        <input className='text-white' placeholder='Pull Name'></input>
        <input className='text-white' placeholder='Pull Description'></input>       
    <Button onClick={createPull}  >Submit</Button>
    </div>
  )
}

export default index