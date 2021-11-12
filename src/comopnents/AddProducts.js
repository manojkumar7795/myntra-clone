import React from 'react'
import  { useState } from 'react'
import { db, fStorage } from './confing/confing';




const AddProducts = () => {

    const [productDetail, setProductDetail] = useState({
        ProductBrand:"",
        productName: "",
        productPrice: 0,
        productImg: null,
        error: ""

    });

    function getValue(event) {
        const { name, value } = event.target;
        setProductDetail((preVal) => {
            return {
                ...preVal,  
                [name]: value,
            }
        });
    }


    const types = ['image/png', 'image/jpeg']; // image types

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductDetail((preVal) => {
                return {
                    ...preVal,
                    productImg: selectedFile,
                    error: ''
                }
            })
        }
        else {
            setProductDetail((preVal) => {
                return {
                    ...preVal,
                    productImg: null,
                    error: 'Please select a valid image type (jpg or png)'
                }
            })
        }
    }



    // add product
    const addProduct = (e) => {
        e.preventDefault();
        if (productDetail.error) {
            return;
        }
        const {ProductBrand, productName, productPrice, productImg, error } = productDetail
        const uplodTask = fStorage.ref(`product-images/${productImg.name}`).put(productImg);

        uplodTask.on(`State_changed`, snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(progress)
        }, err => {
            error = err.message
        }, () => {
            fStorage.ref(`product-images`).child(productImg.name).getDownloadURL().then(url => {
                db.collection(`Products`).add({
                    ProductBrand:ProductBrand,
                    ProductName: productName,
                    ProductPrice: Number(productPrice),
                    ProductImg: url
                }).then(() => {
                    setProductDetail(()=>{
                        return {
                            ProductBrand:'',
                            productName : '',
                            productPrice : 0,
                            productImg : null,
                            error : "",
                        }
                    })

                   
                    document.getElementById("file").value = "";
                }).catch(err => error = err.message);
            });
        });
    }

    return (
        <div className='add-Product-container'>
            <br />
            <h2>ADD PRODUCTS</h2>
            <hr />
            <form autoComplete="off" className='form-group' onSubmit={addProduct}>
            <label htmlFor="product-brand">Product Brand</label>
                <input type="text" id="product-brand" className='add-Product-form' name="ProductBrand" 
                    onChange={getValue} value={productDetail.ProductBrand} />
                    <br />
                <label htmlFor="product-name">Product Name</label>
                <input type="text" id="product-name" className='add-Product-form' name="productName" 
                    onChange={getValue} value={productDetail.productName} />
                <br />
                <label htmlFor="product-price">Product Price</label>
                <input type="number" className='add-Product-form' name="productPrice" id="product-price"
                    onChange={getValue} value={productDetail.productPrice} />
                <br />
                <label htmlFor="product-img">Product Image</label>
                <input type="file" className="add-Product-form"  id="product-img" name='productimg' required id="file"
                    onChange={productImgHandler} />
                <br />
                {productDetail.error && <span className='error-msg text-danger'>{productDetail.error}<br /></span>}
                <button type="submit" className='add-Product-btn btn-success btn-md mybtn'>ADD</button>
            </form>
        </div>
    )
}
export default AddProducts
