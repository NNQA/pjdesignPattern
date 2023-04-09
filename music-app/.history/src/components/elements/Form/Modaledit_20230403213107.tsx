import React, { useState } from 'react'

function Modaledit() {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }
  return (
    <div className=''>
      <button className='text-sm bg-gray-300 px-4 py-2 rounded-2xl'
        onClick={() => toggle()}>
        Edit
      </button>
      {modal ?
        <div className='fixed'>
          asdasd
        </div>
      : ''}
    </div>
  )
}

export default Modaledit