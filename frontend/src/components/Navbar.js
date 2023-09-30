import React from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'

function Navbar({user}) {
  return (
    <div className='nav' >
      <ul>
        <li>
          <Link to='' ><p>Home</p></Link>
        </li>
        <li>
          <Link to='/editor' ><p>Write a new Blog</p></Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar