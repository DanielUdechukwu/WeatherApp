import React from "react";
import { useState, useEffect } from "react";
import x from "../assets/x-mark.svg"
import axios from 'axios'
import { useGlobalContext } from "../context/context";
import { Link } from "react-router-dom";
import Clouds from "../assets/cloudy.jpg"
import Rain from "../assets/rainy.jpg"
import Clear from "../assets/clear-sky.jpg"

const Home = () => {
  const API_Key = '22b3541a55542c8f6f9fe906196620ce'
  const {userWeatherData, setUserWeatherData} = useGlobalContext()
  const {cityData, setCityData} = useGlobalContext()
  const [isLoading, setIsLoading] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [isClicked, setIsClicked] = useState(false)
  const [history, setHistory] = useState([])
  const KEY = "history"

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

  
  useEffect(() => {
    try {
      setIsLoading(true)
      
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          // console.log(position)

          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lon=${longitude}&lat=${latitude}&units=metric&appid=${API_Key}`)

          console.log(response.data)

          if (response.status === 200){
            setIsLoading(false)
            setUserWeatherData({
              temp_max: response.data.main.temp,
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

    const existingHistory = localStorage.getItem(KEY)
    if (existingHistory) {
      const histories = existingHistory.split(",")
      setHistory(histories)
    }

  }, [])

  let imgURL = `https://openweathermap.org/img/wn/${userWeatherData.icon}@2x.png`

  //Get input from input field
  const getInput = (event) => {
    setInputVal(event.target.value)
  }

  const getSearchedLoaction = async () => {
    try{
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${API_Key}&q=${inputVal}`)
      console.log(res.data)
      setCityData({
        temp_max: res.data.main.temp_max,
        temp_min: res.data.main.temp_min,
        humidity: res.data.main.humidity,
        windSpeed: res.data.wind.speed,
        name: res.data.name,
        weather: res.data.weather[0].main,
        icon: res.data.weather[0].icon,
        precipitation: '41%',
        pressure: res.data.main.pressure,
      })
    }catch(error){
      console.log(error)
    }
  }

  const addToHistory = () => {
    const existingHistory = localStorage.getItem(KEY)

    if (existingHistory?.split(",").includes(inputVal)) return

    let updatedHistory = ""
    if (existingHistory) {
      updatedHistory = existingHistory + "," + inputVal
    }else {
      updatedHistory = inputVal
    }

    const histories = updatedHistory.split(",")
    localStorage.setItem(KEY, updatedHistory)
    setHistory(histories)
  }

  const SearchedCity = () => {
    console.log("clicked")
    setIsClicked(true)
    // setHistory(prevItems => [...prevItems, inputVal])
    addToHistory()
    setInputVal('')
    getSearchedLoaction()
  }

  const delSearchHistory = (index) => {
    // setHistory(prevItems => prevItems.filter((item, itemIndex) => itemIndex !== index));
    console.log(history)
    const existingHistory = localStorage.getItem(KEY)
    const updatedList = history.filter((_, i) => i !== index);
    localStorage.setItem(KEY, updatedList);
    setHistory(updatedList);
  }
  
  return(
    <div className="font-Jost xl:min-h-screen text-white xl:flex xl:justify-between" style={
      userWeatherData.weather === 'Clear' 
      ? {backgroundImage: `url(${Clear})`}
      : userWeatherData.weather === 'Clouds'
      ? {backgroundImage: `url(${Clouds})`}
      : {backgroundImage: `url(${Rain})`}
    }>
      <div className="w-[90%] sm:w-[80%] md:w-[85%] h-[21rem] sm:h-[19rem] mx-auto xl:w-[65%] xl:pl-14 xl:pt-10 xl:h-[35rem] xl:flex xl:flex-col xl:justify-between">
        <p className="py-4 sm:pt-12 sm:pb-8 text-lg xl:ml-10 xl:mt-6 xl:text-lg font-semibold">Weather-Wiz</p>
        { isLoading ?
          <div className="w-[90%] sm:w-[80%]">
            <p className="w-full sm:text-xl text-md font-semibold xl:w-[80%] xl:text-2xl xl:font-semibold xl:ml-10">Failed to fetch weather of current location. Check your internet connectivity or enable your location </p>
          </div>
            :
          <div className="sm:flex sm:gap-4 sm:items-center xl:flex xl:items-center xl:gap-4 xl:ml-10">
            <h1 className="text-7xl sm:text-8xl sm:font-bold sm:w-[50%] md:text-left font-semibold text-center mb-8 md:mb-0 xl:text-[6rem] xl:font-bold">{userWeatherData.temp_max}°</h1>
            <div className="sm:w-[20%] md:w-[40%] md:items-start flex flex-col items-center justify-center font-semibold xl:w-[40%]">
              <p className="text-2xl xl:text-2xl xl:font-bold">{userWeatherData.name}</p>
              {hours > 11 ? <p className="pb-2 xl:text-md xl:font-semibold">{hours}:{minutes} PM - {dayName}, {monthName} {date}, {year}</p> : <p className="xl:text-md xl:font-semibold">{hours}:{minutes} AM - {dayName}, {monthName} {date}, {year}</p>}
            </div>
            <div className="sm:w-[10%] md:items-start flex flex-col items-center">
              <img className="h-10" src={imgURL} alt="" />
              <p className="text-2xl xl:text-xl font-bold">{userWeatherData.weather}</p>
            </div>
          </div>
        }
      </div>

      <div className="px-4 md:px-8 sm:pt-14 pt-12 xl:pt-16 xl:w-[35%] xl:px-6 shadow-xl backdrop-blur-lg bg-transparent">
        <div className="bg-white rounded-md px-2 flex gap-2 items-center">
          <input className="bg-transparent border-none outline-none py-4 pl-3 w-full text-black placeholder:text-gray-600" type="text" placeholder="Search for a city" value={inputVal} onChange={getInput} />
          <Link to="/search">
            <button onClick={SearchedCity} className="bg-[#0077be] rounded-md py-2 px-2">Search</button>
          </Link>
        </div>
        <div className="mt-10 border-b-[1px] border-b-gray-400">
          <p>Your Previous Searches</p>
          {history.length === 0 ? <p>No Searches Yet</p> : ''}
          {/* Search Data */}
          <div className="h-[7rem] overflow-y-scroll scroll-set">
            {history.map((cities, index) => {
              return(
                <div key={index} className="my-2 ml-2 flex justify-between items-center">
                  <p className="text-xl">{cities}</p>
                  <img onClick={() => delSearchHistory(index)} className="h-9 p-1 rounded-md cursor-pointer  bg-[#ccc]" src={x} alt="" />
                </div>
              )
            })}
          </div>
        </div>

        <div className="xl:mt-4 my-5 sm:py-6 sm:my-0">
          <h3 className="text-xl font-semibold mb-3">Current Location Weather Detail</h3>
          <div className="mb-3 flex justify-between items-center">
            <p className="text-xl font-semibold">Humidity</p>
            <p className="text-xl font-semibold">{userWeatherData.humidity}%</p>
          </div>
          <div className="mb-3 flex justify-between items-center">
            <p className="text-xl font-semibold">Temperature</p>
            <p className="text-xl font-semibold">{userWeatherData.temp_max}°C</p>
          </div>
          <div className="mb-3 flex justify-between items-center">
            <p className="text-xl font-semibold">Windspeed</p>
            <p className="text-xl font-semibold">{userWeatherData.windSpeed} m/s</p>
          </div>
          {/* Replicate into 3 places */}
          <div className="xl:mt-8">
            <button className="mb-7 mt-4 bg-white text-blue-600 py-3 px-7 rounded-md border border-blue-600 shadow-sm">View Saved Locations</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home