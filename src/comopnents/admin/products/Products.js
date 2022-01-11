import React, { useEffect, useState } from 'react'
import { Button, Image, Table } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { db } from '../../confing/confing'
import Header from '../Header'

const Products = () => {
    const queryParams = useLocation().search;
    const pids = new URLSearchParams(queryParams).get('pids');

    const [products, setProducts] = useState([])

    useEffect(() => {
        // db.collection('products').orderBy('productId').startAfter(null).limit(40).get().then(result => {
        //     setProducts(() =>
        //         result.docs.map(product => product.data()))
        // })
        let collectionRef = db.collection('products');
        if (pids !== null) {
            collectionRef = collectionRef.where('productId', 'in', pids.split(',').map(v => parseInt(v)))
        }

        collectionRef.get().then(Snapshot => {
            const productDetails = Snapshot.docs
            setProducts(() => productDetails)
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
                        <th>Url</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => {
                        const productDetail = product.data()
                        return (
                            <tr id="allProducts" key={productDetail.productId}  >

                                <td>{productDetail.productId}</td>

                                <td className="productImageWidth" >
                                    <Image src={productDetail.mainImage} thumbnail />
                                </td>
                                <td>{productDetail.title}</td>
                                <td>{productDetail.subTitle}</td>
                                <td>{productDetail.slug}</td>
                                <td>
                                    <Link to={`/admin/products/${productDetail.productId}`}><Button variant="success">Edit</Button></Link>
                                </td>
                            </tr>
                        )
                    })}


                </tbody>
            </Table>


        </>
    )
}

export default Products
