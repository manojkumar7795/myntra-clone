import React from 'react'
import { Link } from 'react-router-dom'

const Product = () => {
    return (
        <>
            <button type="button" className='add-Product-btn btn-success btn-md mybtn'><Link to="/admin/products/add">Add Product</Link></button>
        </>
    )
}

export default Product
