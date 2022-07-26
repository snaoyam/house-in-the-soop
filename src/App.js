import React, { useRef } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LivingRoom from './map/living_room'
import TestRoom from './map/tRoom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/1" element={<LivingRoom />} />
        <Route path="/2" element={<></>} />
        <Route path="/3" element={<></>} />
        <Route path="/4" element={<TestRoom />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App