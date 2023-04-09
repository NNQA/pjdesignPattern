import React, { useState } from 'react'

function Modaledit({ actionModal, setActionModal }: any) {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }
  return (
    <div className='opacity-80  bg-slate-200'>
      <button className='text-lg bg-white border-2 shadow-md px-4 py-2 rounded-2xl'
        onClick={() => {
          toggle(),
            setActionModal(!actionModal)
        }}>
        Edit Profile
      </button>
      {modal ?
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black'>
          <div className='w-[40%] h-2/3 mt-24 m-auto bg-gray-500 text-white'>
            <div className='flex justify-between p-5 border-b-2'>
              <h3>Edit your profile</h3>
              <button className=''
                onClick={() => {
                  toggle(),
                    setActionModal(!actionModal)
                }}>
                Close
              </button>
            </div>
            <div className='py-1'>
              <form className='flex flex-col space-y-1'>
                <div className='w-1/2 m-5'>
                  <label htmlFor="name" className='block pb-2'>UserName</label>
                  <input type="text" id='name' className='block text-black' />
                </div>
                <div className='w-1/2 m-5'>
                  <label htmlFor="email" className='block pb-2'>Email</label>
                  <input type="email" id='email' className='block text-black' />
                </div>
                <div className='flex m-5 pt-12'>
                  <input type="file" />
                  <label htmlFor="">Image</label>
                </div>
                <div className='m-5 pt-12'>
                  <button className='border-2 px-4 py-2 rounded-2xl'>
                    finish  
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        : ''}
    </div>
  )
}

export default Modaledit