import React from 'react'
import { Button } from '@/components/ui/button'


function index() {
  return (
    <div className='pt-[100px] flex flex-col gap-4 w-auto items-center justify-center align-left'>
        <input className='text-white' placeholder='Pull Name'></input>
        <input className='text-white' placeholder='Pull Description'></input>
        <input multiple type='file' placeholder='Input Files'></input>
        <Button>Submit</Button>
    </div>
  )
}

export default index