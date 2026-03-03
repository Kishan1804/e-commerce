import React from 'react'

const ProductCard = ({ product, handleCart,handleProductDetail }) => {
    return (
        <>
            <div className="card" onClick={handleProductDetail}>
                <img src={`http://localhost:3000/upload/${product.image}`} className="card-img-top img-fluid" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">₹ {product.price}</p>
                    <button className="btn btn-primary" onClick={handleCart}>Add to Cart</button>
                </div>
            </div>
        </>
    )
}

export default ProductCard