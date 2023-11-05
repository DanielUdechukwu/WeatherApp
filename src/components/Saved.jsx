import React, { useState } from "react";
import { useGlobalContext } from "../context/context";
import Xmark from "../assets/x-mark.svg"
import Check from "../assets/check.svg"

const SavedSearch = () => {
  const { hideSaved, setHideSaved } = useGlobalContext()
  const toggleSaved = () => {
    setHideSaved(!hideSaved)
  }
  return (
    <div className={`absolute w-[100%] h-[100%] bg-[#000000c9] ${hideSaved ? '' : 'hidden'}`}>
      <div className="xl:w-[40%] w-[90%] h-screen  absolute top-[25%] xl:left-[30%]">
      <div className="bg-white text-black p-6 rounded-xl">
        <div className="flex justify-end">
          <div onClick={toggleSaved} className="bg-[#ccc] w-[3rem] h-[3rem] rounded-[50%] flex justify-center items-center cursor-pointer">
            <img className="h-8" src={Xmark} alt="" />
          </div>
        </div>
        <div className="flex flex-col items-center mt-6 mb-12">
          <img className="h-28" src={Check} alt="" />
          <p className="font-semibold text-xl">Your search has been saved successfully</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default SavedSearch