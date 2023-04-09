import React from 'react'
import {getSession} from "next-auth/react";
import { NextPageContext } from 'next'
import user from "../../static/user.png"
import Image from 'next/image';


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if(!session) {
    return {
      redirect:{
        destination: '/',
        permanent: false,
      }
    }
  }
  return {
    props:{}
  }
}
function index() {
  return (
    <div>
        <div>
          <Image
            src={user}
            alt="Image User">

          </Image>
        </div>
        uploadImage
        <div>
          track
        </div>
        <div>
          edit
        </div>
    </div>
  )
}

export default index