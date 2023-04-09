import React, { FormEvent, ReactNode, useState } from 'react'
import SLideMenu from '../../components/elements/Form/SLideMenu'
import Upload from '../Upload';
import Home from '../Home'
import Playlist from '../PlayList'
import handle from '../api/register';
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
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
    fetch("/api/song", {
      method: "post",
      body: formData
    })
  }
  return (
    <div className='h-screen relative'>
      <div className='flex h-full'>
        <div className='shadow-2xl w-[20%]'>
          <SLideMenu pages={pages} setPages={setPages} />
        </div>
        <div className='w-full'>
          {handleReturnPages()}
        </div>
      </div>
      <div className='absolute bottom-0 w-full bg-white h-[100px]'>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="file" id='file' name='file'
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
