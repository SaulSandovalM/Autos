import React from 'react'
import './Nav.css'
import logon from '../../assets/logo_nav.svg'

const Nav = props => (
  <div>
    <div className='navbar'>
      <div className='navbar-navigation'>
        <div>
          <img className='logo' src={logon} alt='' />
        </div>
      </div>
    </div>
  </div>
)

export default Nav
