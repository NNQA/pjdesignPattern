import React from 'react'
import { getSession, useSession } from "next-auth/react";
import { NextPageContext } from 'next'
import Userimg from "../../static/user.png"
import Image from 'next/image';
import userCurrent from '@/hook/currentuser';
import { data } from '@/components/elements/Form/data';
import Modaledit from '@/components/elements/Form/Modaledit';


// export async function getServerSideProps(context: NextPageContext) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       }
//     }
//   }
//   return {
//     props: {}
//   }
// }
function index() {
  const { data: user } = userCurrent();
  const session = useSession();
  return (
    <div className='px-20'>
      <div className='flex p-10 bg-gray-200 space-x-12 items-center'>
        <Image
          src={Userimg}
          alt="Image User"
          className='h-50 w-25 rounded-full'>

        </Image>
        <div>
          <p className='text-xl p-2 '>
            Name: {session.data?.user?.name}
          </p>
          <p className='text-xl p-2'>
            Email: {user?.email}
          </p>
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='px-8 py-2 border-2 w-full flex justify-between'>
          <h3 className='text-2xl'>Track</h3>
          <Modaledit
          ></Modaledit>
        </div>

      </div>
      <div>
        <div>
          <div>
            <Image>
              
            </Image>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index