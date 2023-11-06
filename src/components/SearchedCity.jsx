import React, { useState } from "react";
import RightArrow from '../assets/arrow-left.svg'
import { useGlobalContext } from "../context/context";
import { Link } from "react-router-dom";
import SavedSearch from "./Saved";
import Clouds from "../assets/cloudy.jpg"
import Rain from "../assets/rainy.jpg"
import Clear from "../assets/clear-sky.jpg"

const Popup = () => {
  const {cityData, setCityData} = useGlobalContext()
  const {hideSaved, setHideSaved} = useGlobalContext()
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

  let cityIcon = `https://openweathermap.org/img/wn/${cityData.icon}@2x.png`
  console.log(cityData.weather)

  const toggleSaved = () => {
    setHideSaved(!hideSaved)
  }

  return (
    <div className="font-Jost min-h-screen text-white flex justify-between bg-opac relative" style={
      cityData.weather === 'Clear' 
      ? {backgroundImage: `url(${Clear})`}
      : cityData.weather === 'Clouds'
      ? {backgroundImage: `url(${Clouds})`}
      : {backgroundImage: `url(${Rain})`}
    }>
      <div className="h-screen lg:my-0 my-14 xl:my-0 flex items-center justify-center w-full relative">
        <div className="xl:w-[60%] w-[90%] lg:w-[70%] sm:px-12 px-5 py-2 popup shadow-2xl rounded-2xl xl:py-8 xl:px-[4rem] absolute city-detail">
          <Link to="/">
            <div className="bg-[#ccc] w-[2.5rem] h-[2.5rem] my-4 sm:w-[3rem] sm:h-[3rem] cursor-pointer xl:my-8 flex items-center justify-center rounded-[50%]">
              <img src={RightArrow} alt="" />
            </div>
          </Link>
          
          <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center my-5">
            <div className="my-3">
              <p className="text-2xl sm:text-4xl mb-3 xl:text-4xl font-bold">{cityData.name}</p>
              {hours > 11 ? <p className="text-md xl:font-semibold font-normal">{hours}:{minutes} PM - {dayName}, {monthName} {date}, {year}</p> : <p className="text-md xl:font-semibold font-normal">{hours}:{minutes} AM - {dayName}, {monthName} {date}, {year}</p>}
            </div>
            <div className="w-full sm:w-[30%] text-center my-5 xl:my-0">
              <button onClick={toggleSaved} className="bg-[#0077be] text-lg py-2 px-6 rounded-md">Save Location</button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between">
            <div className="flex w-full sm:w-[70%] sm:my-4 mx-auto gap-5 items-center sm:justify-center xl:gap-5 xl:w-2/4 lg:border-r-2 lg:border-gray-200">
              <div className="h-[5rem] w-[5rem] xl:h-[6rem] xl:w-[8rem]">
                <img className="h-full w-full" src={cityIcon} alt="" />
              </div>
              <div className="flex flex-col justify-center items-center px-1">
                <p className="text-3xl sm:text-5xl xl:text-6xl font-bold">{cityData.temp_max}&deg;</p>
                <p className="text-lg font-semibold">{cityData.weather}</p>
              </div>
            </div>
            <div className="w-full sm:w-[90%] sm:mx-auto xl:w-2/4 grid grid-rows-2 sm:gap-8 lg:gap-4">
              <div className="grid grid-cols-3 sm:gap-3 lg:gap-1 mt-8 xl:my-4">
                <div className="text-center">
                  <p className="font-semibold text-xl sm:text-2xl xl:text-2xl">{cityData.temp_max}</p>
                  <p className="font-normal xl:font-medium">High</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-xl sm:text-2xl xl:text-2xl">{cityData.windSpeed}mph</p>
                  <p className="font-normal xl:font-medium">Wind</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-xl sm:text-2xl xl:text-2xl">{cityData.humidity}%</p>
                  <p className="font-normal xl:font-medium">Humidity</p>
                </div>
              </div>
              <div className="grid grid-cols-3 sm:gap-3 lg:gap-1 my-2 xl:my-4">
                <div className="text-center">
                  <p className="font-semibold text-xl sm:text-2xl xl:text-2xl">{cityData.temp_min}</p>
                  <p className="font-normal xl:font-medium">Low</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-xl sm:text-2xl xl:text-2xl">{cityData.pressure}in</p>
                  <p className="font-normal xl:font-medium">Pressure</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-xl sm:text-2xl xl:text-2xl">41%</p>
                  <p className="font-normal xl:font-medium">Precipitation</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-[60%] sm:mx-auto xl:w-3/4 xl:mx-auto flex justify-center my-5">
            <button className="w-full sm:w-[80%] bg-white text-[#0077be] text-lg py-2 px-6 rounded-md border-2 border-[#0077be]">View Saved Locations</button>
          </div>
        </div>
      </div>

      <SavedSearch />
    </div>
  )
}

export default Popup