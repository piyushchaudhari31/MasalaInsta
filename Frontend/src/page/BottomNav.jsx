import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../css/bottom-nav.css'
import toast from 'react-hot-toast'
import axios from 'axios';
import { reelsvideo } from '../context/Reelsvideo';

const BottomNav = () => {
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  const {url} = useContext(reelsvideo)

  const handleLogout = () => {
    toast.promise(
      axios.post(`${url}/api/auth/user/log-out`, {}, { withCredentials: true }),
      {
        loading: "Logging out...",
        success: (res) => {
          localStorage.removeItem("token");
          return res.data.message;
        },
        error: "Something went wrong"
      }
    )
    .then(() => navigate('/user/login'))
    .catch(() => toast.error("Error!"))
  };

  const handleSettingsClick = () => {
    if (!token) {
      navigate("/user/login");
      return;
    }
    setOpen(!open);
  };

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav__inner">

        
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}
        >
          <span className="bottom-nav__icon">
           <i className="ri-home-2-line"></i>
          </span>
          <span className="bottom-nav__label">Home</span>
        </NavLink>

        <div 
          className="bottom-nav__item profile-wrapper"
          onClick={handleSettingsClick}
        >
          <span className="bottom-nav__icon">
            <i className="ri-settings-2-line"></i>
          </span>
          <span className="bottom-nav__label">Settings</span>

          {token && open && (
            <div className="profile-dropdown show">
              <button onClick={() => navigate('/saved')}>Saved</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>

      </div>
    </nav>
  )
}

export default BottomNav;
