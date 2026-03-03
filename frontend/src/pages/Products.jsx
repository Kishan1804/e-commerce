import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';
import axios from '../utils/axiosInstance'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Products = () => {

    const [product, setProduct] = useState();
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()
    

    const handleProduct = async () => {
        try {
            const { data } = await axios.get('/product/list')
            setProduct(data.productList)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleProduct();
    }, []);

    const handleCart = async (item) => {
        try {
            const { data } = await axios.post('/cart/add', {
                productId: item._id, userId
            })

            toast(data.message)
        }
        catch (err) {
            console.log(err)
            toast(err.response.data.message)
        }
        
    }

    const handleProductDetail = (id) => {
        navigate(`/product-detail/${id}`)
        console.log(id)
    }

    return (
        <>
            <Toaster />
            <div className="container mt-4">
                <h2 className="text-center mb-4">Products</h2>
                <div className="row">
                    {
                        product &&
                        product.map((item) => (
                            <div className="col-md-4" key={item._id}>
                                <ProductCard handleProductDetail={() => handleProductDetail(item._id)} product={item} handleCart={() => handleCart(item)} />
                            </div>
                        ))}
                </div>
            </div>
        </>
    )
}

export default Products