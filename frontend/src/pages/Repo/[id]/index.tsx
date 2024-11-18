import Repobar from '@/components/Repobar'
import RepoDashboard from '@/components/RepoDashboard'
import React from 'react'

function index() {
  return (
    <div>
      <div className ="mt-[100px]">
      <Repobar/>
      </div>
     <RepoDashboard/>

    </div>
  )
}

export default index;

