import React, { useRef } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LivingRoom from './map/living_room'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/1" element={<LivingRoom />} />
        <Route path="/2" element={<></>} />
        <Route path="/3" element={<></>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App