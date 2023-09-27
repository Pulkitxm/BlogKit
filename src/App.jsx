import React from 'react'

import './app.css'

import Navbar from './components/Navbar.jsx'
import Editor from './components/Editor.jsx'

const app = () =>{
  return (
    <div className='app'>
        {/* <Navbar/> */}
        <Editor/>
    </div>
  )
}

export default app