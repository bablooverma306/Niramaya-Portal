import React from 'react'
import Footer from './Footer'
import Menus from './Menus'

const Layout = ({ children }) => {
  return (
    <div>

      {/* Sidebar */}
      <Menus />

      {/* Main Content */}
      <div className="main-content">

        <div className="content-area">
          {children}
        </div>

        <Footer />

      </div>

      {/* Styles */}
      <style>{`

        /* Main content shift */
        .main-content {
          margin-left: 220px;   /* sidebar width */
          min-height: 100vh;
          background: #f5f7fb;
          display: flex;
          flex-direction: column;
        }

        /* Page content */
        .content-area {
          flex: 1;
          padding: 20px;
          overflow-x: hidden;
        }

        /* Footer fix */
        footer {
          margin-top: auto;
        }

      `}</style>

    </div>
  )
}

export default Layout