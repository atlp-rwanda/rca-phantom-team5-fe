import '../index.scss'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { HomePage } from './index'
import SignInPage from './pages/signInPage'

const Routers = () =>
    <div>
      <Router>
        <Routes>

          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<SignInPage/>}/>

        </Routes>
      </Router>
    </div>

export default Routers
