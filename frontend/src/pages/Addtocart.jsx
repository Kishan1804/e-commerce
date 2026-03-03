import axios from '../utils/axiosInstance'
import { Minus, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const Addtocart = () => {

    const [cart, setCart] = useState()

    const fetchAddToCart = async () => {
        try {
            const { data } = await axios.get('/cart/list')
            setCart(data)
        }
        catch (err) {
            toast(err.response.data.message)
        }
    }

    useEffect(() => {
        fetchAddToCart()
    }, [])

    const updateQuantity = async (productId, quantity) => {

        try {
            console.log(quantity)
            if (quantity === 0) {
                const { data } = await axios.delete(`/cart/remove/${productId}`)
                fetchAddToCart()
                return
            }
            else {
                const { data } = await axios.put(`/cart/update/${productId}`, { quantity })
                fetchAddToCart()
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    const removeItem = async (productId) => {
        try {
            const { data } = await axios.delete(`/cart/remove/${productId}`)
            fetchAddToCart()
        }
        catch (err) {
            console.log(err)
        }
    }

    const handlePayment = async (amounts) => {
        try {
            // Create order via backend
            const response = await axios.post('/order/create-order', {
                amount: amounts, // Amount in rupees
                currency: 'INR',
            });

            const { id: order_id, amount, currency } = response.data;

            // Set up RazorPay options
            const options = {
                key: "rzp_test_62TA8n33wZh3IJ", // Replace with your RazorPay Key ID
                amount: amount,
                currency: currency,
                name: "E- commerce",
                description: "Test Transaction",
                order_id: order_id,
                handler: async (response) => {

                    const {data} = await axios.post('/order/verify', response)

                    alert(data.message);
                },
                prefill: {
                    name: "John Doe",
                    email: "john.doe@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Payment initiation failed:', error);
        }
    };

    return (
        <>
            <section className="h-100 h-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12">
                            <div className="card card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                                <div className="card-body p-0">
                                    <div className="row g-0">
                                        <div className="col-lg-8">
                                            <div className="p-5">
                                                <div className="d-flex justify-content-between align-items-center mb-5">
                                                    <h1 className="fw-bold mb-0">Shopping Cart</h1>
                                                </div>
                                                <hr className="my-4" />
                                                {cart?.items?.map((item) => (

                                                    <>
                                                        <div className="row mb-4 d-flex justify-content-between align-items-center">
                                                            <div className="col-md-2 col-lg-2 col-xl-2">
                                                                <img
                                                                    src={`http://localhost:3000/upload/${item.productImage}`}
                                                                    className="img-fluid rounded-3" alt="Cotton T-shirt" />
                                                            </div>
                                                            <div className="col-md-3 col-lg-3 col-xl-3">
                                                                <h6 className="text-muted">{item.productName}</h6>
                                                                <h6 className="mb-0">{item.productDescription}</h6>
                                                            </div>
                                                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                                <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} data-mdb-button-init data-mdb-ripple-init className="btn btn-link px-2">
                                                                    <Minus />
                                                                </button>

                                                                <span className='align-content-center'>{item.quantity}</span>

                                                                <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} data-mdb-button-init data-mdb-ripple-init className="btn btn-link px-2">
                                                                    <Plus />
                                                                </button>
                                                            </div>
                                                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                                <h6 className="mb-0">₹ {item.productPrice}</h6>
                                                            </div>
                                                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                                <button onClick={() => removeItem(item.productId)} className='btn btn-link'><Trash /></button>
                                                            </div>
                                                        </div>


                                                        <hr className="my-4" />
                                                    </>
                                                ))}



                                                <div className="pt-5">
                                                    <h6 className="mb-0"><a href="#!" className="text-body"><i
                                                        className="fas fa-long-arrow-alt-left me-2"></i>Back to shop</a></h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 bg-body-tertiary">
                                            <div className="p-5">
                                                <h3 className="fw-bold mb-2 mt-2 pt-1">Summary</h3>

                                                <hr className="my-4" />

                                                <div className="d-flex justify-content-between mb-5">
                                                    <h5 className="text-uppercase">Total price</h5>
                                                    <h5>₹ {cart?.totalAmount}</h5>
                                                </div>

                                                <button onClick={() => handlePayment(cart?.totalAmount)} type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-block btn-lg"
                                                    data-mdb-ripple-color="dark">Pay Now</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Addtocart