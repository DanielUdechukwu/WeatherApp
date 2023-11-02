import React, { useState } from "react";
import RightArrow from '../assets/arrow-left.svg'
import Clouds from '../assets/cloud-drizzle.svg'
import { useGlobalContext } from "../context/context";
import { Link } from "react-router-dom";

const Popup = () => {
  const {backgroundImage, setBackgroundImage} = useGlobalContext()
  const getBackgroundImage = () => {
    return {backgroundImage: 'url(/src/assets/cloudy.jpg)'}
  }

  return (
    <div className="font-Jost min-h-screen text-white flex justify-between" style={getBackgroundImage()}>
      <div className="h-screen flex items-center justify-center w-full bg-opac relative">
        <div className="w-[60%] popup shadow-2xl rounded-2xl py-8 px-[4rem] absolute city-detail">
          <Link to="/">
            <div className="bg-[#ccc] w-[3rem] h-[3rem] cursor-pointer my-8 flex items-center justify-center rounded-[50%]">
              <img src={RightArrow} alt="" />
            </div>
          </Link>
          
          <div className="flex justify-between items-center my-5">
            <div className="my-3">
              <p className="text-4xl font-bold">Orogbun, NG</p>
              <p>18:47 PM - Wednesday, November 1, 2023</p>
            </div>
            <div className="">
              <button className="bg-[#0077be] text-lg py-2 px-6 rounded-md">Save Location</button>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-5 w-2/4 border-r-2 border-gray-200">
              <div>
                <img className="h-[6rem]" src={Clouds} alt="" />
              </div>
              <div className="flex flex-col justify-center items-center px-1">
                <p className="text-7xl font-bold">25.85&deg;</p>
                <p className="text-lg font-semibold">Clouds</p>
              </div>
            </div>
            <div className="w-2/4 grid grid-rows-2">
              <div className="grid grid-cols-3 my-4">
                <div className="text-center">
                  <p className="font-semibold text-2xl">23.85</p>
                  <p className="font-medium">High</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-2xl">2.17mph</p>
                  <p className="font-medium">Wind</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-2xl">86%</p>
                  <p className="font-medium">Humidity</p>
                </div>
              </div>
              <div className="grid grid-cols-3 my-4">
                <div className="text-center">
                  <p className="font-semibold text-2xl">25.85</p>
                  <p className="font-medium">Low</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-2xl">1010in</p>
                  <p className="font-medium">Pressure</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-2xl">41%</p>
                  <p className="font-medium">Precipitation</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-3/4 mx-auto flex justify-center my-5">
            <button className="bg-white text-[#0077be] text-lg py-2 px-6 rounded-md border-2 border-[#0077be]">View Saved Locations</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popup