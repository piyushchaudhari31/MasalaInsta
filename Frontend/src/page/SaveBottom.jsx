import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../css/savebottom.css'


const SaveBottom = () => {
  const navigate = useNavigate();
  

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav__inner">

        
        <NavLink to="/"  end className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}>
          <span className="bottom-nav__icon">
           <i className="ri-home-2-line"></i>
          </span>
          <span className="bottom-nav__label">Home</span>
        </NavLink>

      </div>
    </nav>
  )
}

export default SaveBottom;
