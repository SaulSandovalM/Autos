import React from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';
//import logo from '../../assets/logo.jpg';
//import user from '../../assets/user.jpeg';

const Nav = props => (
  <div className="navbar">
    <div className="container-navbar">
      <div className="flex-center">
        <div className="logo-wrap">
          {/*<Link to="/" className="logo">
            <img src={logo} className="logo-bg" alt=""/>
          </Link>*/}
        </div>
        
      </div>
    </div>
  </div>
);

export default Nav;
