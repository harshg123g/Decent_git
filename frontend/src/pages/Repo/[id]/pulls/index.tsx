import PullDashboard from '@/components/PullDashboard'
import React from 'react'
import Pullbar from '@/components/Pullbar'
function index() {
  return (
    <div>
            <div className ="mt-[80px]">

<Pullbar/>

</div>
        <PullDashboard/>
    </div>
  )
}

export default index