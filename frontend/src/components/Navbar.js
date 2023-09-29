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
          <Link to='/editor' ><p>Editor</p></Link>
        </li>
        <li>
          <Link to='' ><p>Contact</p></Link>
        </li>
        <li>
          <Link to='' ><p>Links</p></Link>
        </li>
      </ul>
      {
        user==null?
          <Link to="/login" className='login' >
            Login/SignUp
          </Link>
          :
          <Link to="/dashoard" className='login' >
            Hi {user.name}
          </Link>
      }
    </div>
  )
}

export default Navbar