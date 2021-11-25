import React, { useEffect, useState } from 'react'
import { Button, Image, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { db } from '../confing/confing'
import Header from './Header'

const Products = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        db.collection('products').orderBy('productId').startAfter(null).limit(30).get().then(result => {
            setProducts(() =>
                result.docs.map(product => product.data()))
        })

    }, [])
    return (
        <>
            <Header heading="Products" action={{ title: "Add Product", url: "/admin/products/add" }} />
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>Product</th>
                        <th>Short Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr id="allProducts" key={product.productId}  >
                            <td>{product.productId}</td>

                            <td className="productImageWidth" >
                                <Image src={product.mainImage} thumbnail />
                            </td>
                            <td>{product.title}</td>
                            <td>{product.subTitle}</td>
                            <td>
                                <Link to={`/admin/products/${product.productId}`}><Button variant="success">Edit</Button></Link>
                            </td>
                        </tr>
                    ))}


                </tbody>
            </Table>


        </>
    )
}

export default Products
