import React from 'react'
import Topbar from './Topbar'
import NavMenu from './NavMenu'
import { NavLink } from 'react-router-dom'
import Loco from "../../../assets/loco.png"
import "./Navbar.css"

const Navbar = () => {
  return (
   <>
   <div className="Navbar-Container sticky-top ">
    <div className="row">
        <div className="col-md-2">
            <NavLink to="/">
            <img src={Loco} alt="loco" className="brand-loco"/>
            </NavLink>
        </div>
        <div className="col-md-10">
            {/*Topbar*/}
            <div>
                <Topbar/>
                </div>
                
                {/*Navmenu*/}
            <div>
                <NavMenu/>
                </div>
        </div>

    </div>

   </div>
   </>
  )
}

export default Navbar
