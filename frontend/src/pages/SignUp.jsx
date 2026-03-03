import axios from '../utils/axiosInstance'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {

  const [fullName, setFullName] = useState()
  const [email, setEmail] = useState()
  const [number, setNumber] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(fullName);
    console.log(email);
    console.log(number);
    console.log(password);

    try {
      const { data } = await axios.post('/register', {
        fullName, email, number, password
      })
      toast(data.message)
      setEmail('')
      setPassword('')
      setFullName('')
      setNumber('')
    }
    catch (err) {
      toast(err.response.data.message)
    }
  }

  return (
    <>
      <Toaster />
      <div className="container d-flex justify-content-center">
        <form className='col-4 m-5 shadow p-3 mb-5 bg-white rounded border border-secondary-subtle' onSubmit={handleSubmit}>
          <h1 className='text-center mb-3'>SignUp Page</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputtext1" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputtext1"
              aria-describedby="textHelp"
              onChange={(e) => {
                setFullName(e.target.value)
              }}
              required
              value={fullName}
            />
          </div>
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
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputnumber1" className="form-label">Phone No.</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputnumber1"
              aria-describedby="numberHelp"
              onChange={(e) => {
                setNumber(e.target.value)
              }}
              required
              value={number}
            />
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

export default SignUp