import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/actions/authActions'
import { reset } from '../../redux/slice/authSlice'

const Login = () => {

  const [email, setemail] = useState("admin@niramaya.local")
  const [password, setpassword] = useState("Admin@1234")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { success, error, loading } = useSelector(state => state.auth)

  const handleLogin = () => {
    if(!email||!password){
      return toast.error("please provide email or password ")
    }
    dispatch(login({ email, password }))
  }

  useEffect(() => {
    if (success) {
      toast.success('Login successfully')
      navigate('/home')
      dispatch(reset())
    }

    if (error) {
      toast.error(error)
        dispatch(reset())
    }
  }, [success, error, navigate])

  return (
    <>
      <div className='d-flex flex-column align-items-center justify-content-center' style={{ minHeight: '80vh' }}>

        <h1>Admin Panel</h1>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setemail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setpassword(e.target.value)}
          />
        </div>

        <button
          className='btn btn-primary'
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>

      </div>
    </>
  )
}

export default Login
