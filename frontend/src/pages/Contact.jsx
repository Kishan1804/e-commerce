import axios from '../utils/axiosInstance'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const Contact = () => {

    const [email, setEmail] = useState()
    const [fullname, setFullName] = useState()
    const [message, setMessage] = useState()

    const handleContact = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("/contact",
                { email, fullname, message }
            )
            toast(data.message)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
        <Toaster />
        <div className="container d-flex justify-content-center">
                    <form onSubmit={handleContact} className='col-4 m-5 shadow p-3 rounded border'>
                    <h1>Contact</h1>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Full Name</label>
                            <input onChange={(e) => setFullName(e.target.value)} type="text" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Message</label>
                            <input onChange={(e) => setMessage(e.target.value)} type="text" className="form-control" id="exampleInputPassword1" />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
        </div>
        </>
    )
}

export default Contact