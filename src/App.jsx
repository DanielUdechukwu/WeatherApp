import React from "react";
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Popup from "./components/SearchedCity";

const App = () => {
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/search" element={<Popup />} />
    </Routes>
  )
}

export default App