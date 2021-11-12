import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../confing/confing'
import firebase from 'firebase/compat/app';






const productTags = [

    "men",
    "shirt",
    "t-shirt",
    "pent",
    "jeans",
    "triousers",
    "sueat-shirt",
    "formal",
    "woman",
    "rounded-neck",
    "v-neck",
    "slim-fit",
    "leather",
]

const ProductDetails = (props) => {
    const variantId = props.match.params.pid
    const [product, setProduct] = useState({
        title: '',
        subTitle: '',
        description: '',
        productTag: [],
        variantsId: [],
        pinCoads: [],
        error: ''

    })
    // useEffect(() => {

    //     db.collection('variant').onSnapshot(snapshot=>{
    //         snapshot.docs.map(id=>{
    //             console.log("variantsId",id.id)
    //             setProduct((preValue)=>{ 
    //                 return{
    //                     ...preValue,
    //                     variantsId : id.id
    //                 }

    //             })
    //         })
    //     })
    // }, [])

    const getInputValue = (e) => {
        const { name, value } = e.target
        setProduct((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }
    const updatePinCode = (e) => {
        const value = e.target.value
        setProduct((preValue) => {
            return {
                ...preValue,
                pinCoads: value.split(',')

            }
        })

    }

    const updateTags = (e) => {
        let name = e.target.name
        let tag = Array.from(document.getElementsByName(e.target.name)).filter(t => t.checked).map(t => t.value)
        setProduct((preValue) => {
            return {
                ...preValue,
                [name]: tag
            }
        })
    }
    const addProduct = (e) => {
        e.preventDefault();
        if (product.error) {
            return;
        }

        const productId = Date.now() + Math.floor(1000 + Math.random() * 9000)
        const variant = db.collection('variant').doc(`${variantId}`).id
        const newVariantId = {
            ...variant
        }
        const variantDetailId = db.collection('products').doc(`${productId}`);
        const dbResposne = null
        if (product.variantsId.length) {
            dbResposne = variantDetailId.update({
                variantID: firebase.firestore.FieldValue.arrayUnion(newVariantId)
            });
        }
        else {
            dbResposne = variantDetailId.set({
                productId: productId,
                title: product.title,
                productTag: product.subTitle,
                pinCoads: product.pinCoads,
                variantID: [newVariantId]


            });
        }

        // db.collection('products').doc(`${productId}`).set({
        //     productId:productId,
        //     title:product.title,
        //     subTitle:product.subTitle,
        //     productTag:product.productTag,
        //     pinCoads:product.pinCoads,

        // })
        dbResposne
            .then(() => {
                setProduct(() => {
                    return {
                        title: '',
                        subTitle: '',
                        description: '',
                        productTag: [],
                        variantsId: [],
                        pinCoads: [],
                        error: ''

                    }
                })
            }).catch(err => product.error = err.message)

    }

    return (

        <div className='add-Product-container'>
            <br />
            <h2>product</h2>
            <hr />
            <form className="form-group" onSubmit={addProduct} autocomplete="off">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" className='add-Product-form' name="title" onChange={getInputValue} value={product.title} />
                <br />
                <label htmlFor="subTitle">SubTitle</label>
                <input type="text" id="subTitle" className='add-Product-form' name="subTitle" onChange={getInputValue} value={product.subTitle} />
                <br />
                <label htmlFor="description">Description</label>
                <textarea name="description" className='add-Product-form' id="description" onChange={getInputValue} value={product.description} />
                <br />
                <label htmlFor="pinCoads">PinCode</label>
                <input type="text" name="pinCoads" id="pinCoads" className='add-Product-form' placeholder="PinCode" onChange={updatePinCode} value={product.pinCoads} />
                <br />
                <div style={{ width: "865px" }}>
                    {productTags.map(tag => {
                        return (
                            <div style={{ border: "1px solid black", display: "inline-block", marginLeft: "21px", marginBottom: "10px", padding: "5px", borderRadius: "5px" }}>
                                <input type="checkbox" name="productTag" id={tag} style={{ marginRight: "3px" }} onChange={updateTags} value={tag} checked={product.productTag.includes(tag)} />
                                <label htmlFor={tag}>{tag}</label>
                            </div>
                        )

                    })}
                </div>
                {product.error && <span className='error-msg text-danger'>{product.error}<br /></span>}
                <button type="submit" className='add-Product-btn btn-success btn-md mybtn'>ADD</button>
                <button type="button" className='add-Product-btn btn-success btn-md mybtn'>
                    <Link to="/admin/variants/1234566654">Add variant</Link>
                </button>
            </form>
        </div>

    )
}

export default ProductDetails
