import React from 'react'
import toast from 'react-hot-toast'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slice/authSlice';
import { useDispatch } from 'react-redux'

const Menus = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
    toast.success("Logout successfully!")
    navigate('/')
  };

  return (
    <>
      <div className='sidebar'>

        <h3 className='logo'>⚡ Admin Panel</h3>

        <ul className='nav flex-column menu-list'>

          <li>
            <NavLink className='nav-link menu-item' to='/home'>
              🏠 Home
            </NavLink>
          </li>

          <li>
            <NavLink className='nav-link menu-item' to='/all-users'>
              👥 Users
            </NavLink>
          </li>

          <li>
            <NavLink className='nav-link menu-item' to='/all-doctors'>
              🩺 Doctors
            </NavLink>
          </li>

          <li>
            <NavLink className='nav-link menu-item' to='/all-appointment'>
              📅 Appointments
            </NavLink>
          </li>

        </ul>

        <button className='logout-btn' onClick={handleLogout}>
          🚪 Logout
        </button>

      </div>

      {/* Styles */}
      <style>{`

        /* Sidebar */
        .sidebar {
          height: 100vh;
          width: 220px;
          position: fixed;
          top: 0;
          left: 0;
          background: linear-gradient(180deg, #1f1c2c, #928dab);
          padding: 20px 12px;
          box-shadow: 5px 0 20px rgba(0,0,0,0.4);
          display: flex;
          flex-direction: column;
        }

        /* Logo */
        .logo {
          color: #fff;
          text-align: center;
          margin-bottom: 30px;
          font-weight: bold;
        }

        /* Menu list spacing */
        .menu-list {
          gap: 12px;              /* 🔥 spacing between items */
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        /* Menu item */
        .menu-item {
          color: #ddd;
          padding: 12px 14px;
          border-radius: 12px;
          transition: 0.3s;
          font-weight: 500;
          background: rgba(255,255,255,0.05);
        }

        .menu-item:hover {
          background: rgba(255,255,255,0.15);
          color: #fff;
          transform: translateX(5px);
        }

        /* Active */
        .menu-item.active {
          background: linear-gradient(90deg, #00f2fe, #4facfe);
          color: #000;
          font-weight: bold;
        }

        /* Logout button spacing */
        .logout-btn {
          margin-top: auto;   /* 🔥 pushes to bottom */
          padding: 12px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(90deg, #ff416c, #ff4b2b);
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        .logout-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(0,0,0,0.4);
        }

      `}</style>
    </>
  )
}

export default Menus