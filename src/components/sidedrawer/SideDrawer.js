import React from 'react';
import './SideDrawer.css';
import {Link} from 'react-router-dom';

const SideDrawer = props => {
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }

  return (
    <div className={drawerClasses}>
      <div>
        {/*<Link to="/" className="side-drawer-link">
          <span className="menu-text">Productos</span>
        </Link>*/}
        <Link to="/Service" className="side-drawer-link">
          <span className="menu-text">Servicios</span>
        </Link>
        <Link to="/Courses" className="side-drawer-link">
          <span className="menu-text">Cursos</span>
        </Link>
        <Link to="/Team" className="side-drawer-link">
          <span className="menu-text">Equipo</span>
        </Link>
        <Link to="/Community" className="side-drawer-link">
          <span className="menu-text">Comunidad</span>
        </Link>
      </div>
    </div>
  );
};

export default SideDrawer;
