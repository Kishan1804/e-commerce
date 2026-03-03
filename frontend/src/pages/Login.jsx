import axios from '../utils/axiosInstance'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);

    try {
      const { data } = await axios.post('/login', {
        email, password
      })
      toast(data.message)

      localStorage.setItem("userId" , data.user._id )
      localStorage.setItem("userRole", data.user.role)
      localStorage.setItem("userEmail", data.user.email)
      localStorage.setItem("token", data.token)

      setEmail('')
      setPassword('')
      navigate('/')
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Toaster />
      <div className="container d-flex justify-content-center">
        <form onSubmit={handleSubmit} className='col-4 m-5 shadow p-3 mb-5 bg-white rounded border border-secondary-subtle'>
          <h1 className='text-center mb-3'>Login Page</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              required
              value={email}
            />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              required
              value={password}
            />
          </div>
          <button type="submit" className="btn btn-secondary">Submit</button>
        </form>
      </div>
    </>
  )
}

export default Login