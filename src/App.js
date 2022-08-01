import React, { useRef } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LivingRoom from './map/living_room'
import Bathroom from './map/bathroom'
import Kitchen from './map/kitchen'
import Bedroom from './map/bedroom'
import Studio from './map/studio'
import Test from './map/test'
import { Box, Button } from '@mui/material'
import Start from './start'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/0" element={<LivingRoom />} />
        <Route path="/1" element={<Bathroom />} />
        <Route path="/2" element={<Kitchen />} />
        <Route path="/3" element={<Bedroom />} />
        <Route path="/4" element={<Studio />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App