import React, { useEffect, useState } from 'react'
import { db } from './confing/confing'

const ProductsDetails = (props) => {
    let productId = props.match.params.id;
    const [productDetail, setProductDetail] = useState({
        list: []

    })

    useEffect(() => {
        db.collection('Products').doc(productId).onSnapshot(snapshot => {
            setProductDetail((Prevdata) => {
                const newProdutList = { ...Prevdata }
                newProdutList.list.push(snapshot.data())
                return newProdutList

            })

        })
    }, [])

    return (
        <>
            {productDetail.list.map(productDetail => {
                return (
                    <div>
                        <div>{productDetail.productName}</div>
                        <div>{productDetail.shortDescription}</div>
                        <div>{productDetail.description}</div>
                        <div>
                            <span>Rs. {productDetail.discountedPrice} </span>
                            <span>Rs {productDetail.rackPrice} </span>
                            <span> ({productDetail.discount}% OFF)</span>
                        </div>
                        <div> Seller: {productDetail.seller}</div>
                        <div>Sku : {productDetail.sku}</div>
                        <div>{productDetail.size}</div>
                        <div>
                            {productDetail.pinCoads.map(pincoad => {
                                return (
                                    <>
                                        <div>{pincoad}</div>
                                    </>
                                )
                            })}
                        </div>
                        <div>
                            {productDetail.productTag.map(productTag => {
                                return (
                                    <>
                                        <div>{productTag}</div>
                                    </>
                                )
                            })}
                        </div>

                        {productDetail.images.map(image => {
                            return (
                                <>
                                    <img src={image} alt="productImage" />


                                </>
                            )

                        })}
                    </div>
                )
            })
            }
        </>
    )
}

export default ProductsDetails
