import React from "react";
import { useState, useEffect } from "react";
import Cloud from "../assets/cloud-drizzle.svg"
import x from "../assets/x-mark.svg"
import axios from 'axios'

const Home = () => {
  const API_Key = '22b3541a55542c8f6f9fe906196620ce'
  const [backgroundImage, setBackgroundImage] = useState('/src/assets/cloudy.jpg')
  const [userWeatherData, setUserWeatherData] = useState({
    temp: '- -',
    humidity: '- -',
    windSpeed: '- -',
    name: '- -',
    weather: '- -',
    icon: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  // let userHumidity, userTemp, useerWindSpeed, userWeatherIcon

  const getLocation = async () => {

    try {
      setIsLoading(true)
      
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lon=${longitude}&lat=${latitude}&units=metric&appid=22b3541a55542c8f6f9fe906196620ce`)

          if (response.status === 200){
            setIsLoading(false)
            setUserWeatherData({
              temp: response.data.main.temp,
              humidity: response.data.main.humidity,
              windSpeed: response.data.wind.speed,
              name: response.data.name,
              weather: response.data.weather[0].main,
              icon: response.data.weather[0].icon
            })
          }
        });
      }

    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  console.log(userWeatherData)

  // const getLoc = async () => {
  //   try{
  //     const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${API_Key}&q=awka`)
  //     console.log(res.data)
  //   }catch(error){
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    getLocation()
    // getLoc()
  }, [])

  let imgURL = `https://openweathermap.org/img/wn/${userWeatherData.icon}@2x.png`

  return(
    <div className="font-Jost min-h-screen text-white flex justify-between" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="w-[65%] pl-14 pt-10 h-[35rem] flex flex-col justify-between">
        <p className="ml-10 mt-6 text-lg font-semibold">Weather-Wiz</p>
        { isLoading ?
          <div>
            <p className="w-[80%] text-2xl font-semibold ml-10">Failed to fetch weather of current location. Check your internet connectivity or enable your location </p>
          </div>
            :
          <div className="flex items-center gap-4 ml-10">
            <h1 className="text-[6rem] font-bold">{userWeatherData.temp}°</h1>
            <div className="w-[40%]">
              <p className="text-2xl font-bold">{userWeatherData.name}</p>
              <p className="text-md font-semibold">22:14 PM - Saturday, October 28, 2023</p>
            </div>
            <div className="flex flex-col items-center">
              <img className="h-10" src={imgURL} alt="" />
              <p className="text-xl font-bold">{userWeatherData.weather}</p>
            </div>
          </div>
        }
      </div>

      <div className="pt-16 w-[35%] px-6 shadow-xl backdrop-blur-lg bg-transparent">
        <div className="bg-white rounded-md px-2 flex gap-2 items-center">
          <input className="bg-transparent border-none outline-none py-4 pl-3 w-full text-black placeholder:text-gray-600" type="text" placeholder="Search for a city" />
          <button className="bg-[#0077be] rounded-md py-2 px-2">Search</button>
        </div>
        <div className="mt-10 border-b-[1px]">
          <p>Your Previous Searches</p>
          <p>No Searches Yet</p>
          {/* Search Data */}
          <div className="h-[7rem] overflow-y-scroll scroll-set">
            <div className="my-2 ml-2 flex justify-between items-center">
              <p className="text-xl">Lagos</p>
              <img className="h-9 p-1 rounded-md bg-[#ccc]" src={x} alt="" />
            </div>
          </div>
        </div>

        <div className="my-5">
          <h3 className="text-xl font-semibold mb-3">Current Location Weather Detail</h3>
          <div className="mb-3 flex justify-between items-center">
            <p className="text-xl font-semibold">Humidity</p>
            <p className="text-xl font-semibold">{userWeatherData.humidity}%</p>
          </div>
          <div className="mb-3 flex justify-between items-center">
            <p className="text-xl font-semibold">Temperature</p>
            <p className="text-xl font-semibold">{userWeatherData.temp}°C</p>
          </div>
          <div className="mb-3 flex justify-between items-center">
            <p className="text-xl font-semibold">Windspeed</p>
            <p className="text-xl font-semibold">{userWeatherData.windSpeed} m/s</p>
          </div>
          {/* Replicate into 3 places */}
          <div className="my-7">
            <button className="bg-white text-blue-600 py-3 px-7 rounded-md border border-blue-600 shadow-sm">View Saved Locations</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home