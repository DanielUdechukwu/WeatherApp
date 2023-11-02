import React, { useState, useContext } from "react"

const weatherContext = React.createContext();

export const WeatherContextProvider = ({ children }) => {
  // const [isLoading, setIsLoading] = useState(false)
  // const [isClicked, setIsClicked] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState({})
  return(
    <weatherContext.Provider value={{ backgroundImage, setBackgroundImage }}>
      {children}
    </weatherContext.Provider>
  )
};

export const useGlobalContext = () => {
  return useContext(weatherContext)
};