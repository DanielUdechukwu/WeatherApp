import React, { useState, useEffect } from "react";
import RightArrow from '../assets/arrow-left.svg'
import Clouds from '../assets/cloud-drizzle.svg'
import { useGlobalContext } from "../context/context";
import { Link } from "react-router-dom";
import axios from "axios";

const Popup = () => {
  const {backgroundImage, setBackgroundImage} = useGlobalContext()
  const {cityData, setCityData} = useGlobalContext()
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const date = currentDate.getDate()
  const day = currentDate.getDay()
  const minutes = currentDate.getMinutes()
  const hours = currentDate.getHours()
  const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let monthName = monthArr[month] 
  let dayName = days[day]
  
  const getBackgroundImage = () => {
    return {backgroundImage: 'url(/src/assets/cloudy.jpg)'}
  }

  let cityIcon = `https://openweathermap.org/img/wn/${cityData.icon}@2x.png`

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
              <p className="text-4xl font-bold">{cityData.name}</p>
              {hours > 11 ? <p className="text-md font-semibold">{hours}:{minutes} PM - {dayName}, {monthName} {date}, {year}</p> : <p className="text-md font-semibold">{hours}:{minutes} AM - {dayName}, {monthName} {date}, {year}</p>}
            </div>
            <div className="">
              <button className="bg-[#0077be] text-lg py-2 px-6 rounded-md">Save Location</button>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-5 w-2/4 border-r-2 border-gray-200">
              <div>
                <img className="h-[6rem]" src={cityIcon} alt="" />
              </div>
              <div className="flex flex-col justify-center items-center px-1">
                <p className="text-6xl font-bold">{cityData.temp_max}&deg;</p>
                <p className="text-lg font-semibold">{cityData.weather}</p>
              </div>
            </div>
            <div className="w-2/4 grid grid-rows-2">
              <div className="grid grid-cols-3 my-4">
                <div className="text-center">
                  <p className="font-semibold text-2xl">{cityData.temp_max}</p>
                  <p className="font-medium">High</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-2xl">{cityData.windSpeed}mph</p>
                  <p className="font-medium">Wind</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-2xl">{cityData.humidity}%</p>
                  <p className="font-medium">Humidity</p>
                </div>
              </div>
              <div className="grid grid-cols-3 my-4">
                <div className="text-center">
                  <p className="font-semibold text-2xl">{cityData.temp_min}</p>
                  <p className="font-medium">Low</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-2xl">{cityData.pressure}in</p>
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