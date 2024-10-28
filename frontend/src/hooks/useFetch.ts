import { useCallback } from "react";

interface abi {
    path: string;
    content: string;
}

interface UseFetchProps {
    url: string;
    method: string;
    body?: Object;
    formData?: FormData;
    bearer?: string;
    abi?: abi[];
}


export const UseFetch = async({url, method,formData,bearer,abi}: UseFetchProps)=>{

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        }

        if(bearer)
        {
            headers['Authorization'] = `Bearer ${bearer}`;
        }

       const response = await fetch(url, {
        method: method,
        headers:headers,
        body: formData? formData: JSON.stringify({abi}),
      });
        const data = await response.json();
        return data;
}

