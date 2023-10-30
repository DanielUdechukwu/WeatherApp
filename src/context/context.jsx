import React, { useState, useContext } from "react"

const productContext = React.createContext();

export const ProductContextProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  return(
    <productContext.Provider value={{ cart, setCart }}>
      {children}
    </productContext.Provider>
  )
};

export const useGlobalContext = () => {
  return useContext(productContext)
};