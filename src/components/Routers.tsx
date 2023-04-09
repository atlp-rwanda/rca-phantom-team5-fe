import '../index.scss'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { HomePage } from './index'

const Routers = () =>
    <div>
      <Router>
        <Routes>

          <Route path="/" element={<HomePage/>}/>

        </Routes>
      </Router>
    </div>

export default Routers
