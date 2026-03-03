import axios from '../utils/axiosInstance'
import React, { useEffect, useState } from 'react'

const Home = () => {

    const [title, setTitle] = useState()

    const handleTitle = async ()=> {
        const {data} = await axios.get('/test')

        setTitle(data)
    }

    useEffect(()=>{
        handleTitle()
    },[])


    return (
        <>
            <div className="container mt-5">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <h1 className="fw-bold display-5 mt-3">{title}</h1>
                        <p className="text-muted mt-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <div className="mt-4">
                            <a href="/products" className="btn btn-secondary me-3">Browse Products</a>
                            <a href="/products" className="btn btn-outline-secondary">View Deals</a>
                        </div>
                    </div>
                    <div className="col-md-6 text-center">
                        <img src="https://img.freepik.com/free-vector/cashback-concept-character_23-2148458118.jpg?t=st=1770120740~exp=1770124340~hmac=ab40fe8ac637d6eae8ff13b3fb524c6bf2b424b299aa20b84d23b2858ad0ef7d" className="img-fluid" alt="shopping" />
                    </div>
                </div>
            </div>
        </>
    )
}
// https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-f-9.webp
export default Home