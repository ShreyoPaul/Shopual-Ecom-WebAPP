import { createContext, useReducer, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Create from './components/Create'
import Contact from './components/Contact'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { initialState, reducer } from './ContextAPI/reducer'
import CardInfo from './components/CardInfo'

export const ContextAPI = createContext()

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ContextAPI.Provider value={{state, dispatch}}>
      <Navbar />
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/:id' element={<CardInfo />} />
        <Route path='/create' Component={Create} />
        <Route path='/contact' Component={Contact} />
        <Route path='/signin' Component={SignIn} />
        <Route path='/signup' Component={SignUp} />
      </Routes>
      
    </ContextAPI.Provider>
  )
}

export default App
