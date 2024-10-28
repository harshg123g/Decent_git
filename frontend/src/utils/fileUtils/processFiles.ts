import {getHash} from "./getHash";
import {encodeContent} from "../ceramicUtils/encodeContent";

export default async function processFiles (files: FileList)  {
    const fileHash = [];
    const abi = [];
    for (const file of Array.from(files)) {
      const content = await file.text();
      const path = file.webkitRelativePath || file.name;
      const shaHash = getHash(content);

      abi.push({ path, content: encodeContent(content) });
      fileHash.push(shaHash);
    }

    return abi;
    // return { abi, fileHash };
   };