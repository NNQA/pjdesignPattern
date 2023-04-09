import React, { useState } from 'react'
import index from '.'
import { data } from './data'
import { BsFillFileEarmarkMusicFill } from "react-icons/bs"


import { RiSearchLine } from "react-icons/ri"
import { BiMenuAltRight } from "react-icons/bi"
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

function SLideMenu({ pages, setPages }: any) {
    const router = useRouter();
    const handleSignIn = () => {
        router.push('/login');
    }

    return (
        <div className='xl:m-8'>
            <div className='flex items-center space-x-2 text-[#413543] pb-3'>
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <rect width="23" height="23" fill="url(#pattern0)" />
                    <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image0_773_688" transform="scale(0.00195312)" />
                        </pattern>
                        <image id="image0_773_688" width="512" height="512" xlink:href="data:image/png;base64,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" />
                    </defs>
                </svg>

                <p className='text-2xl hidden xl:inline font-font-slide'>Music Social</p>
            </div>
            <div className='flex items-center space-x-2 text-[#413543]'>
                <ul className=''>
                    {data.map((item, index) => [
                        <li key={index} className='list-none'>
                            <div className={`flex flex-row space-x-2 p-2 items-center
                            text-xl hover:font-bold hoverAnimation`}
                                onClick={() => setPages(
                                    index
                                )}>
                                <item.icon></item.icon>
                                <p className='hidden xl:inline'>{item.name}</p>
                            </div>
                        </li>
                    ])}
                </ul>
            </div>
        </div>
    )
}

export default SLideMenu