import React, { FormEvent, ReactNode, useState } from 'react'
import SLideMenu from '../../components/elements/Form/SLideMenu'
import Upload from '../Upload';
import Home from '../Home'
import Playlist from '../PlayList'
import handle from '../api/register';
import axios from 'axios';
import {signOut} from "next-auth/react";
import { NextPageContext } from 'next'



export async function getServerSideProps(contextt: NextPageContext) {
  return {
    
  }
}
function index() {
  const [pages, setPages] = useState(1);
  const numberPages = [<Home></Home>, <Upload></Upload>, <Playlist></Playlist>, <Upload />];
  const [file, setFile] = useState(undefined);
  // fetch user/server
  function handleReturnPages(): React.ReactNode {
    return (
      <>
        {numberPages[pages]}
      </>
    )
  }
  const handleSignOut = () => {
    signOut();
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
    fetch("/api/song", { method: 'post', body: formData })
  }
  return (
    <div className='h-screen relative'>
      <div className='flex h-full'>
        <div className='shadow-2xl w-[20%]'>
          <SLideMenu pages={pages} setPages={setPages} />
          <div className='text-xl ml-[30px] border-2 w-fit px-4 py-1 rounded-2xl
           bg-slate-200 cursor-pointer'
           onClick={handleSignOut}>
            Log out
          </div>
        </div>
        <div className='w-full'>
          {handleReturnPages()}
        </div>

      </div>
      <div className='absolute bottom-0 w-full bg-white h-[100px]'>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="file" id='file' name='file' onChange={(e) => setFile(e.target.files as any)}
            />
            <label htmlFor="file">asdsad</label>
          </div>
          <button type='submit' className='bg-black'>asdas</button>
        </form>
      </div>


    </div>

  )
}

export default index