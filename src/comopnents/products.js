import React, { useEffect, useState } from 'react'
import { db } from './confing/confing';

const Products = () => {


    const [productDetail, setProductDetail] = useState({
        list: []
    })
    useEffect(() => {
        console.log("collection", db.collection(`Products`).doc())
        db.collection('Products').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.map(change => {
                setProductDetail((Prevdata) => {
                    const newProdutList = { ...Prevdata }
                    newProdutList.list.push(change.doc.data())
                    return newProdutList
                })
            })
        })
    }, [])

    return (
        <>
            <div className='products-container'>
                {productDetail.list.map(product => {
                    const productSlug = product.shortDescription.toLowerCase().replace(/\s/g, '-');
                    return (
                        <div className='product-card'>
                            <div className='product-img'>
                                <a href={`/products/${productSlug}/${product.Id}`} target="_blank" >
                                    <img src={product.mainImage} alt="not found" />
                                </a>
                            </div>
                            <div className='product-brand'>
                                {product.productName}
                            </div>
                            <div className='product-name'>
                                {product.shortDescription}
                            </div>
                            <div className='product-price'>
                                Rs
                                <span>{product.discountedPrice}   </span>
                                <span>Rs{product.rackPrice}</span>
                                <span>({product.discount}% OFF)</span>
                            </div>
                        </div>
                    )
                })}
            </div>

        </>
    )
}

export default Products
