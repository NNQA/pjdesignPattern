import React from "react";
import { RiHeadphoneFill } from "react-icons/ri";
import {BiCategoryAlt} from "react-icons/bi"
import {FaUserCircle} from "react-icons/fa"
function BarUser() {
  return (
    <div className="bg-[#2b2b2b] py-4 w-full cursor-pointer">
      <div className="flex justify-between items-center h-full text-[#f5f5f7]">
        <div className="font-font-slide h-[32px] ml-12 flex items-end space-x-2">
          <p>Enjoin World Music</p>
          <RiHeadphoneFill className="mb-1"></RiHeadphoneFill>
        </div>
        <div className="flex space-x-6 mr-24 items-center">
            <BiCategoryAlt></BiCategoryAlt>
            <FaUserCircle className="text-2xl"></FaUserCircle>
            </div>
      </div>
    </div>
  );
}

export default BarUser;
