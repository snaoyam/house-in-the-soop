import React, { useRef } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LivingRoom from './map/living_room'
import Bathroom from './map/bathroom'
import Kitchen from './map/kitchen'
import Bedroom from './map/bedroom'
import Studio from './map/studio'
import Test from './map/test'
import Start from './start'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/start" element={<Start />} />
        <Route path="/1" element={<LivingRoom />} />
        <Route path="/2" element={<Bathroom />} />
        <Route path="/3" element={<Kitchen />} />
        <Route path="/4" element={<Bedroom />} />
        <Route path="/5" element={<Studio />} />
        {/* <Route path="/6" element={<Test />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App