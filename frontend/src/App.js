import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import axios from 'axios';

import './app.css';

import Blog from './components/Blog';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Editor from './components/Editor';
import NotFound from './components/NotFound';

const baseUrl = 'http://localhost:3001';

const App = () => {
  // const [user, setUser] = useState({name:"Pulkit"})
  const [user, setUser] = useState(null)
  
  return (
    <Router>
      <div className='app'>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/editor/:id" element={<Editor />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
