import axios from '../utils/axiosInstance'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const ManageProduct = () => {
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [img, setImg] = useState()
    const [productList, setProductList] = useState([]);

    const handleProduct = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/product/list')
            setProductList(data.productList)
            console.log(data.productList)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleProduct();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('image', img)

        try {
            const { data } = await axios.post('http://localhost:3000/product/add',
                formData
            )
            console.log(data)
            toast(data.message)
            handleProduct()
            setName('')
            setDescription('')
            setPrice('')
        }
        catch (err) {
            toast(err.response?.data?.message)
            console.log(err)
        }

        console.log(name)
        console.log(description)
        console.log(price)
        console.log(img)

    }

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:3000/product/delete/${id}`)
            toast(data.message)
            handleProduct()
        } catch (err) {
            toast(err.response?.data?.message)
            console.log(err)
        }
    }

    return (
        <>
            <Toaster />
            <div className="container d-flex flex-column justify-content-center align-items-center">
                <form onSubmit={handleSubmit} className='col-8 m-5 shadow p-3 mb-5 bg-white rounded border border-secondary-subtle'>
                    <h1 className='text-center mb-3'>Add Product</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Product Name</label>
                        <input
                            value={name}
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Product Description</label>
                        <textarea
                            value={description}
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Price - ₹</label>
                        <input
                            value={price}
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            onChange={(e) => {
                                setPrice(e.target.value)
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Choose Image</label>
                        <input
                            type="file"
                            className="form-control"
                            id="exampleFormControlInput1"
                            accept='image/*'
                            onChange={(e) => {
                                setImg(e.target.files[0])
                            }}
                        />
                    </div>
                    <button type="submit" className="btn btn-secondary">Add Product</button>
                </form>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Description</th>
                            <th scope="col">Product Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productList == 0
                                ?
                                <h1>No Product Found</h1>
                                :
                                productList?.map((item) => (
                                    <tr>
                                        <th scope="row">
                                            <img width={50} height={50} src={`http://localhost:3000/upload/${item.image}`} alt="" />
                                        </th>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            <button className='btn btn-success me-2'>Edit</button>
                                            <button className='btn btn-danger' onClick={() => handleDelete(item._id)} >Delete</button>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ManageProduct