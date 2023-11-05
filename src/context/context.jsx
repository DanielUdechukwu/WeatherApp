import React, { useState, useContext } from "react"

const weatherContext = React.createContext();

export const WeatherContextProvider = ({ children }) => {
  const [hideSaved, setHideSaved] = useState(false)
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
      userWeatherData,
      setUserWeatherData,
      cityData,
      setCityData,
      hideSaved,
      setHideSaved,
      }}>
      {children}
    </weatherContext.Provider>
  )
};

export const useGlobalContext = () => {
  return useContext(weatherContext)
};