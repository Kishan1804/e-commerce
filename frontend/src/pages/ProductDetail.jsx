import React from 'react'
import axios from '../utils/axiosInstance'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const ProductDetail = () => {

    const { id } = useParams()
    const userId = localStorage.getItem('userId')
    const [productDetail, setProductDetail] = useState()

    const fetchProductDetail = async () => {
        try {
            const { data } = await axios.get(`/product/detail/${id}`)
            setProductDetail(data.product)
        }
        catch (err) {

        }
    }

    useEffect(() => {
        fetchProductDetail()
    }, [])

    const handleCart = async (id) => {
        try {
            const { data } = await axios.post('/cart/add', {
                productId: id, userId
            })

            toast(data.message)
        }
        catch (err) {
            console.log(err)
            toast(err.response.data.message)
        }

    }
    return (
        <>
            <Toaster />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <img src={`http://localhost:3000/upload/${productDetail?.image}`} alt="Product" className="img-fluid rounded mb-3 product-image" id="mainImage" />
                    </div>


                    <div className="col-md-6">
                        <h2 className="mb-3">{productDetail?.name}</h2>
                        <div className="mb-3">
                            <span className="h4 me-2">₹ {productDetail?.price}</span>
                        </div>

                        <p className="mb-4">{productDetail?.description}</p>
                        <button onClick={() => handleCart(productDetail._id)} className="btn btn-primary btn-lg mb-3 me-2">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetail