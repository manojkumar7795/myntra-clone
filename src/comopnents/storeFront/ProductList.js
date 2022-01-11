import React from 'react'

const ProductList = (props) => {
    const product = props.product
    return (
        <>
            <div className="product-container pdr-30 pdb-30">
                {product && <a href={"/products/" + product.slug} target={"_blank"}>
                    <img className="collectionImage" src={product.mainImage} alt="productimg" />
                    <h4 className='productTitle'>{product.title}</h4>
                    <div className='productPrice'> <span>Rs.&nbsp;</span> {product.sellPrice}<span>.00</span> </div>
                </a>}
            </div>
        </>
    )
}

export default ProductList
