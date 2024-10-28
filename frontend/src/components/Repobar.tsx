"use client"
import React from 'react'


  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"


  import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useRouter } from 'next/router'


  const Repobar: React.FC =() =>{
    const router = useRouter();
    return(
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", paddingLeft:"18%",paddingRight:"18%", paddingTop:'10px'}}>
            <div style={{display:"flex", alignItems:"center", gap:"15px"}}>

<Button onClick={() => {router.push(`${router.asPath}/pulls`) }}>Pulls</Button>
</div>

        </div>
    )
}


export default Repobar

/*
     <button style={{width:"30px",height:"30px",borderRadius:"50%",background:"red"}}></button>
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/Repo/1">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
// </Breadcrumb> */