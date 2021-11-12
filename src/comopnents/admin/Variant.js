import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { db, fStorage } from '../confing/confing'


const Variant = (props) => {
    const productId = props.match.params.pid

    const [variant, setVariant] = useState({
        images: [],
        pricing: {
            rackPrice: '',
            sellPrice: '',
            inclusivTax: false
        },
        inventory: {
            sku: "",
            barcode: "",
            quantity: ""

        },
        variantId: '',
        error: ''
    })


    const getPricing = (e) => {
        let { name, value } = e.target
        setVariant((preValue) => {
            const pricing = { ...preValue.pricing };
            pricing[name] = value;
            return {
                ...preValue,
                pricing: pricing
            }
        })
    }
    const getInventory = (e) => {
        let { name, value } = e.target
        setVariant((preValue) => {
            const inventory = { ...preValue.inventory };
            inventory[name] = value;
            return {
                ...preValue,
                inventory: inventory
            }
        })
    }

    const types = ['image/png', 'image/jpeg', 'image/webp'];
    const productImagesHandler = (e) => {
        let selectedFile = e.target.files;
        Object.keys(selectedFile).map(type => {
            if (selectedFile && types.includes(selectedFile[type].type)) {
                setVariant((preValue) => {
                    return {
                        ...preValue,
                        images: [...selectedFile],
                        error: ''

                    }
                })
            }
            else {
                setVariant((preValue) => {
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
            const uploadPromise = fStorage.ref(`product-images/${image.name}`).put(image)
                .then(async snapshot => {
                    const imagUrl = await fStorage.ref('product-images').child(image.name).getDownloadURL();
                    productImages.push(imagUrl)
                })
            uploadPromises.push(uploadPromise)
        })

        await Promise.all(uploadPromises);

        return productImages
    }
    const addProduct = (e) => {
        e.preventDefault();
        if (variant.error) {
            return
        }

        uploadProductImages(variant.images).then(productImg => {
            const variantId = Date.now() + Math.floor(1000 + Math.random() * 9000)
            db.collection('variant').doc(`${variantId}`).set({
                variantId: variantId,
                productId: productId,
                images: productImg,
                pricing: {
                    rackPrice: variant.pricing.rackPrice,
                    sellPrice: variant.pricing.sellPrice,
                    inclusivTax: variant.pricing.inclusivTax
                },
                inventory: {
                    sku: variant.inventory.sku,
                    barcode: variant.inventory.barcode,
                    quantity: variant.inventory.quantity

                },
            }).then(() => {
                setVariant(() => {
                    return {
                        images: [],
                        pricing: {
                            rackPrice: '',
                            sellPrice: '',
                            inclusivTax: false
                        },
                        inventory: {
                            sku: "",
                            barcode: "",
                            quantity: ""
                        },
                        variantId: variantId,
                        error: ''

                    }
                })
                document.getElementById("images").value = "";
            }).catch(err => variant.error = err.message)
        })
    }

    return (

        <div className='add-Product-container'>
            <br />
            <h2> VARIANT</h2>
            <hr />
            <form className='form-group' autoComplete="off" onSubmit={addProduct}>

                <label htmlFor="images">Images</label>
                <input type="file" name="images" className='add-Product-form' id="images" multiple="true" onChange={productImagesHandler} />
                <br />

                <label htmlFor="rack-price">Rack Price</label>
                <input type="number" className='add-Product-form' name="rackPrice" id="rack-price" placeholder="  Rack Price" onChange={getPricing} value={variant.pricing.rackPrice} />
                <br />

                <label htmlFor="discounted-price">Sell Price</label>
                <input type="number" className='add-Product-form' name="sellPrice" id="discounted-Price" placeholder="  Sell Price" onChange={getPricing} value={variant.pricing.sellPrice} />
                <br />

                <label htmlFor="pincodes">Tax inclusive? </label>
                <input type="checkbox" id="inclusivTax" name="inclusivTax" value="true" onChange={getPricing} checked={variant.pricing.inclusivTax} />
                <br />

                <label htmlFor="sku">SKU</label>
                <input type="text" name="sku" id="sku" className='add-Product-form' placeholder="  sku" onChange={getInventory} value={variant.inventory.sku} />
                <br />

                <label htmlFor="barcode">Barcode</label>
                <input type="text" name="barcode" id="barcode" className='add-Product-form' placeholder="  Barcode" onChange={getInventory} value={variant.inventory.barcode} />
                <br />

                <label htmlFor="quantity">Quantity</label>
                <input type="number" name="quantity" className='add-Product-form' id="quantity" placeholder="   Quantity" onChange={getInventory} value={variant.inventory.quantity} />
                <br />
                {variant.error && <span className='error-msg text-danger'>{variant.error}<br /></span>}
                <button type="submit" className='add-Product-btn btn-success btn-md mybtn'>ADD</button>
                <button type="button" className='add-Product-btn btn-success btn-md mybtn'>
                    <Link to={`/admin/products/${variant.variantId}`}>product</Link>
                </button>
            </form>
        </div>
    )
}


export default Variant
