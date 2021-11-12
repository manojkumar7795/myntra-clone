import React, { useState } from 'react'
import { db, fStorage } from './confing/confing'

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
const ProductDetailsAdd = () => {
    const [productDetails, setProductDetails] = useState({
        productName: "",
        shortDescription: "",
        pinCoads: [],
        description: "",
        mainImage: null,
        sku: "",
        seller: "",
        productTag: [],
        collectionId: "",
        error: ""

    })
    const [productVarients, setProductVarients] = useState({
        quantity: "",
        size: "s",
        images: [],
        rackPrice: "",
        discountedPrice: "",
        discount: "",
        inclusivTax: ''

    })
    const getInputValue = (e) => {
        let { name, value } = e.target
        setProductDetails((preValue) => {
            return {
                ...preValue,
                [name]: value,
            }
        })

    }


    const getProductVarientValue = (event) => {
        let { name, value } = event.target
        setProductVarients((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }
    const updateTags = (e) => {
        let name = e.target.name
        let tag = Array.from(document.getElementsByName(e.target.name)).filter(t => t.checked).map(t => t.value)
        setProductDetails((preValue) => {
            return {
                ...preValue,
                [name]: tag

            }
        })

    }
    const updatePinCode = (e) => {
        let value = e.target.value;
        setProductDetails((preValue) => {
            return {
                ...preValue,
                pinCoads: value.split(",")
            }
        })


    }

    const types = ['image/png', 'image/jpeg' , 'image/webp'];

    const ProductMainImageHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductDetails((preValue) => {
                return {
                    ...preValue,
                    mainImage: selectedFile,
                    error: ''

                }
            })
        }
        else {
            setProductDetails((preValue) => {
                return {
                    ...preValue,
                    mainImage: null,
                    error: "Please select a valid image type (jpg,png or webp)"
                }
            })
        }
    }

    const productImagesHandler = (e) => {
        let selectedFile = e.target.files;
        Object.keys(selectedFile).map(type => {
            if (selectedFile && types.includes(selectedFile[type].type)) {
                setProductVarients((preValue) => {
                    return {
                        ...preValue,
                        images: [...selectedFile],
                        error: ''

                    }
                })
            }
            else {
                setProductVarients((preValue) => {
                    return {
                        ...preValue,
                        images: null,
                        error: "Please select a valid image type (jpg,png or webp)"
                    }
                })

            }

        })
    }

    const uploadProductImages = async (images) => {
        const productImages = [];
        const uploadPromises = [];
        images.forEach(image => {
            const uploadPromise = fStorage.ref(`product-images/_ID_/${image.name}`)
                .put(image)
                .then(async snapshot => {
                    const imageUrl = await fStorage.ref(`product-images/_ID_`).child(image.name).getDownloadURL();
                    productImages.push(imageUrl);
                });
            uploadPromises.push(uploadPromise);
        })

        await Promise.all(uploadPromises);

        return productImages;
    }

    const addProduct = (e) => {
        e.preventDefault();
        if (productDetails.error) {
            return;
        }
        const { quantity, size, images, rackPrice, discountedPrice, discount, inclusivTax } = productVarients
        const { productName, shortDescription, pinCoads, description, mainImage, sku, seller, productTag } = productDetails
       
        fStorage.ref(`product-images/${mainImage.name}`).put(mainImage);
        uploadProductImages(images).then(producImg => {


            fStorage.ref(`product-images`).child(mainImage.name).getDownloadURL().then(url => {
                const productsID = Date.now() + Math.floor(1000 + Math.random() * 9000)
                db.collection('Products').doc(`${productsID}`).set({
                    Id: productsID,
                    productName: productName,
                    shortDescription: shortDescription,
                    pinCoads: pinCoads,
                    description: description,
                    mainImage: url,
                    sku: sku,
                    seller: seller,
                    productTag: productTag,
                    quantity: quantity,
                    size: size,
                    images: producImg,
                    rackPrice: rackPrice,
                    discountedPrice: discountedPrice,
                    discount: discount,
                    inclusivTax: inclusivTax

                }).then(() => {
                    setProductDetails(() => {
                        return {
                            productName: "",
                            shortDescription: "",
                            pinCoads: [],
                            description: "",
                            mainImage: null,
                            sku: "",
                            seller: "",
                            productTag: [],
                            collectionId: ""
                        }
                    })
                    setProductVarients(() => {
                        return {
                            quantity: "",
                            size: "",
                            images: [],
                            rackPrice: "",
                            discountedPrice: "",
                            discount: "",
                            inclusivTax: ''
                        }
                    })


                    document.getElementById("mainImage").value = "";
                    document.getElementById("images").value = "";

                }).catch(err => productDetails.error = err.message);
            });
        });
    }


    return (
        <div className='add-Product-container'>
            <br />
            <h2> PRODUCTS DETAILS</h2>
            <hr />
            <form className='form-group' onSubmit={addProduct} autoComplete="off">
                <label htmlFor="product-Name">Product Name</label>
                <input type="text" id="product-Name" className='add-Product-form' name="productName" onChange={getInputValue} value={productDetails.productName} />
                <br />


                <label htmlFor="short-Description">Short Description</label>
                <input type="text" id="short-Description" className='add-Product-form' name="shortDescription" onChange={getInputValue} value={productDetails.shortDescription} />
                <br />


                <label htmlFor="rack-price">Rack Price</label>
                <input type="number" className='add-Product-form' name="rackPrice" id="rack-price" placeholder="Rack Price" onChange={getProductVarientValue} value={productVarients.rackPrice} />
                <br />
                <label htmlFor="discounted-price">Discounted Price</label>
                <input type="number" className='add-Product-form' name="discountedPrice" id="discounted-Price" placeholder="Discounted Price" onChange={getProductVarientValue} value={productVarients.discountedPrice} />
                <br />
                <label htmlFor="discount">Discount Price</label>
                <input type="number" className='add-Product-form' name="discount" id="discount" placeholder="Discount" onChange={getProductVarientValue}  value={productVarients.discount}/>
                <br />


                <label htmlFor="pinCoads">PinCode</label>
                <input type="text" name="pinCoads" id="pinCoads" className='add-Product-form' placeholder="PinCode" onChange={updatePinCode} value={productDetails.pinCoads} />
                <br />


                <label htmlFor="quantity">Quantity</label>
                <input type="number" name="quantity" className='add-Product-form' id="quantity" placeholder="Quantity" onChange={getProductVarientValue} value={productVarients.quantity} />
                <br />


                <label htmlFor="pincodes">Tax inclusive? </label>
                <input type="checkbox" id="inclusivTax" name="inclusivTax" value="true" onChange={getProductVarientValue} checked = {productVarients.inclusivTax.includes(true)} />
                <br />


                <label htmlFor="mainImage">Main Image</label>
                <input type="file" name="mainImage" className='add-Product-form' id="mainImage" onChange={ProductMainImageHandler} />
                <br />
                <label htmlFor="images">Images</label>
                <input type="file" name="images" className='add-Product-form' id="images" onChange={productImagesHandler} multiple="true" />
                <br />

                <label htmlFor="seller">Seller</label>
                <input type="text" name="seller" id="seller" className='add-Product-form' onChange={getInputValue} placeholder="Seller" value={productDetails.seller} />
                <br />

                <label htmlFor="sku">SKU</label>
                <input type="text" name="sku" id="sku" className='add-Product-form' onChange={getInputValue} placeholder="Sku" value={productDetails.sku} />
                <br />

                <label for="description">Description</label>
                <textarea name="description" id="description" cols="30" rows="10" onChange={getInputValue}  value={productDetails.description}/>
                <br />


                {productTags.map(tag => {
                    return (
                        <div style={{ border: "1px solid black", display: "inline-block", marginLeft: "21px", marginBottom: "10px", padding: "5px", borderRadius: "5px" }}>
                            <input type="checkbox" name="productTag" id={tag} style={{ marginRight: "3px" }} onChange={updateTags} value={tag} checked={productDetails.productTag.includes(tag)}/>
                            <label htmlFor={tag}>{tag}</label>
                        </div>
                    )


                })}
                <br />
                {productDetails.error && <span className='error-msg text-danger'>{productDetails.error}<br /></span>}
                <button type="submit" className='add-Product-btn btn-success btn-md mybtn'>ADD</button>




            </form>
        </div>
    )
}

export default ProductDetailsAdd
