import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/login')
    }

    const handleSignUp = () => {
        navigate('/signup')
    }

    const handleLogOut = () => {
        localStorage.clear();
        navigate('/')
    }

    const handleProfile = () => {
        navigate('/profile')
    }

    const role = localStorage.getItem('userRole')
    const token = localStorage.getItem('token')
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container ">
                    <Link className="navbar-brand" to="/">MyShop</Link>
                    <div className="container d-flex justify-content-between">
                        <div>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {role === "admin" ?
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/manageproduct">Manage Product</Link>
                                        </li>
                                    </> :
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/">Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/products">Products</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/contact">Contact Us</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/cart">Your Cart</Link>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                        <div className='d-flex gap-3'>
                            {token ?
                                <>
                                    <button className='btn btn-secondary' onClick={handleLogOut}>Log Out</button>
                                    <button className='btn btn-primary' onClick={handleProfile}>Profile</button>
                                </> :
                                <>
                                    <button className='btn btn-secondary' onClick={handleLogin}>Login</button>
                                    <button className='btn btn-outline-secondary' onClick={handleSignUp}>Sign Up</button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar