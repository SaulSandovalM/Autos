import React from 'react'
import './SideDrawer.css'

const SideDrawer = props => {
  let drawerClasses = 'side-drawer'
  if (props.show) {
    drawerClasses = 'side-drawer open'
  }

  return (
    <div className={drawerClasses} />
  )
}

export default SideDrawer
