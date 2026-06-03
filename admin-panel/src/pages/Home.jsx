import React, { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../redux/actions/authActions'
import { getStats } from '../redux/actions/userAction'

const CircleCard = ({ value = 0, label, gradient }) => {
  return (
    <div className='col-md-3 col-sm-6 mb-4 text-center'>
      <div className='glass-card p-4'>

        <div
          className='circle'
          style={{
            background: `conic-gradient(${gradient} ${value * 3.6}deg, rgba(255,255,255,0.1) 0deg)`
          }}
        >
          <div className='inner-circle'>
            <h4>{value || 0}</h4>
          </div>
        </div>

        <p className='mt-3 fw-bold label-text'>{label}</p>

      </div>
    </div>
  )
}

const Home = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserData());
    dispatch(getStats());
  }, [dispatch])

  const { user } = useSelector(state => state.auth)
  const { stats } = useSelector(state => state.user)

  return (
    <Layout>

      {/* Header */}
      <div className='text-center mb-5 glass-header p-4'>
        <h1 className='fw-bold text-gradient'>⚡ ADMIN DASHBOARD</h1>

        <p className='text-light mt-2 fs-6'>
          Welcome back, <span className='highlight'>{user?.name}</span> 👋 <br />
          <span className='small-text'>{user?.email}</span>
        </p>
      </div>

      {/* Cards */}
      <div className='row justify-content-center'>

        <CircleCard
          value={stats?.totalUsers}
          label="Users"
          gradient="#00f2fe, #4facfe, #00c6ff"
        />

        <CircleCard
          value={stats?.totalDoctors}
          label="Doctors"
          gradient="#43e97b, #38f9d7, #00ff87"
        />

        <CircleCard
          value={stats?.totalEarning}
          label="Earnings"
          gradient="#ff7eb3, #ff758c, #ff3d77"
        />

      </div>

      {/* Styles */}
      <style>{`

        body {
          background: radial-gradient(circle at top left, #1a1a2e, #16213e, #0f0f1a);
          min-height: 100vh;
        }

        /* HEADER */
        .glass-header {
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(25px);
          border-radius: 25px;
          border: 1px solid rgba(76, 188, 237, 0.15);
          box-shadow: 0 10px 50px rgba(0,0,0,0.6);
        }

        .text-gradient {
          background: linear-gradient(90deg, #00f2fe, #4facfe, #a18cd1, #ff6ec4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 2px;
        }

        .highlight {
          color: #00f2fe;
          font-weight: bold;
        }

        .small-text {
          color: rgba(255,255,255,0.75);
          font-size: 13px;
        }

        /* CARD */
        .glass-card {
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(25px);
          border-radius: 30px;
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 20px 60px rgba(0,0,0,0.7);
          transition: all 0.4s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        /* Glow effect */
        .glass-card::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1), transparent);
          transform: rotate(25deg);
        }

        .glass-card:hover {
          transform: translateY(-15px) scale(1.1);
          box-shadow: 0 30px 80px rgba(0,0,0,0.9);
        }

        /* CIRCLE */
        .circle {
          width: 170px;
          height: 170px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: auto;
          position: relative;
          box-shadow: 0 0 25px rgba(0,0,0,0.4);
        }

        .circle::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          filter: blur(30px);
        }

        .inner-circle {
          width: 120px;
          height: 120px;
          background: linear-gradient(145deg, #a7f17d, #e6e6e6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #111;
          box-shadow: inset 0 5px 15px rgba(0,0,0,0.2);
        }

        .inner-circle h4 {
          font-size: 26px;
          margin: 0;
        }

        /* LABEL */
        .label-text {
          color: #0d0c0c;
          letter-spacing: 1px;
          font-size: 17px;
        }

        /* ANIMATION */
        .glass-card {
          animation: fadeIn 0.6s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

      `}</style>

    </Layout>
  )
}

export default Home