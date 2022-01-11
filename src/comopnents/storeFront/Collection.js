import React, { useEffect, useState } from 'react'
import { db } from '../confing/confing'
import Header from '../header'
import ProductList from './ProductList'

const Collection = (props) => {
    const slug = props.match.params.slug
    const [products, setProducts] = useState({})
    const productData = async (collection) => {
        const promises = []
        collection.forEach(product => {
            const promis = db.collection('products')
                .where('productId', 'in', product.productIds)
                .get().then(async productSanapshot => {
                    product.products = productSanapshot.docs.map(s => s.data())
                })
            promises.push(promis)

        })
        await Promise.all(promises);

        return collection
    };
    useEffect(() => {
        db.collection('collections')
            .where('slug', "==", slug).get()
            .then(collectionSnapshot => {
                productData(collectionSnapshot.docs.map(S => S.data()))
                    .then(data => {
                        const products = data[0].products.map(s => s);
                        var fillteredProduct = []
                        products.map(product => {
                            if (product.variantIds.length !== 0) {
                                fillteredProduct.push(product)
                            }
                        })
                        const emptyData = new Array(4 - fillteredProduct.length % 4).fill(null)
                        setProducts({
                            ...data[0],
                            products: fillteredProduct.concat(emptyData)
                        })
                    })
            })
    }, [])
    return (
        <>
        <Header />
            <div className="collectionTitle"  >{products.title}</div>
            <div className="collections-container">
                {Object.keys(products).length && products.products.map(product => {
                    return (
                        <>
                        <ProductList product={product}/>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default Collection
