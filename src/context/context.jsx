import React, { useState, useContext } from "react"

const weatherContext = React.createContext();

export const WeatherContextProvider = ({ children }) => {
  // const [isLoading, setIsLoading] = useState(false)
  // const [isClicked, setIsClicked] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState({})
  // const [inputVal, setInputVal] = useState('')
  const [userWeatherData, setUserWeatherData] = useState({
    temp_max: '- -',
    temp_min: '- -',
    humidity: '- -',
    windSpeed: '- -',
    name: '- -',
    weather: '- -',
    icon: '',
    precipitation: '',
    pressure: ''
  })
  const [cityData, setCityData] = useState({
    temp_max: '- -',
    temp_min: '- -',
    humidity: '- -',
    windSpeed: '- -',
    name: '- -',
    weather: '- -',
    icon: '',
    precipitation: '',
    pressure: ''
  })
  return(
    <weatherContext.Provider value={{
      backgroundImage,
      setBackgroundImage,
      userWeatherData,
      setUserWeatherData,
      cityData,
      setCityData,
      }}>
      {children}
    </weatherContext.Provider>
  )
};

export const useGlobalContext = () => {
  return useContext(weatherContext)
};