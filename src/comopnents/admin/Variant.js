import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { db, fStorage } from '../confing/confing'
import firebase from 'firebase/compat/app';
import { BsFillTerminalFill } from 'react-icons/bs';



const Variant = (props) => {

    const productId = props.pid
    // variant modal hide and show 
    const [showModal, setShowModal] = useState(false);

    // variant details  push in  db 
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
        productId: '',
        error: ''
    })


    // get  variant id  function  
    const getVariantId = () => {
        return Date.now() + Math.floor(1000 + Math.random() * 9000)
    }
    //  get pricing   funciton  from input field 
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

    //  get sku  barcode  quantity   from input field
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



 // delete  image   from browser
    const deleteImageFile = (index) => {
        setVariant(() => {
            variant.images.splice(index, 1)
            return {...variant}
        })
    }

    const generatePath = (file) => {
        if (typeof file == "string") {
            return file;
        } else {
            return URL.createObjectURL(file)
        }
    }


    const types = ['image/png', 'image/jpeg', 'image/webp'];
    const variantImagesHandler = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile && types.includes(selectedFile.type)) {

            setVariant((preValue) => {
                preValue.images.push(selectedFile)
                return {
                    ...preValue,
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

    }


    // upload variant multipal  images functions 
    const uploadVariantImages = async (images) => {
        console.log('uploadVariantImages')
        const variantImages = [];
        const uploadPromises = [];
        images.forEach(image => {
            const uploadPromise = fStorage.ref(`product-images/${image.name}`).put(image)
                .then(async snapshot => {
                    const imagUrl = await fStorage.ref('product-images').child(image.name).getDownloadURL();
                    variantImages.push(imagUrl)
                })
            uploadPromises.push(uploadPromise)
        })

        await Promise.all(uploadPromises);

        return variantImages
    }




    // fech variant details and set data from 
    useEffect(() => {
        db.collection('variant').doc(`${props.vid}`).get().then(snapshot => {
            const variantDetail = snapshot.data()
            if (variantDetail !== undefined) {
                setVariant(() => {
                    return {
                        productId: variantDetail.productId,
                        images: variantDetail.images,
                        pricing: {
                            rackPrice: variantDetail.pricing.rackPrice,
                            sellPrice: variantDetail.pricing.sellPrice,
                            inclusivTax: variantDetail.pricing.inclusivTax
                        },
                        inventory: {
                            sku: variantDetail.inventory.sku,
                            barcode: variantDetail.inventory.barcode,
                            quantity: variantDetail.inventory.quantity
                        }

                    }

                })
            }
        })
    }, [])

    const updateVariant = (varintImg) => {
        const variantId = (props.vid) ? props.vid : getVariantId()
        const data = {
            variantId: variantId,
            productId: productId,
            images: varintImg,
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
        }


        db.collection('variant').doc(`${variantId}`)
            .set(data)
            .then(() => {
                setVariant(() => {
                    return {
                        productId: productId,
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
                        error: ''

                    }

                })
                document.getElementById("images").value = "";
                // variant id send in productDetails component
                props.onAdd(variantId)

                setShowModal(false)
                // and close varient modal
            }).catch(err => variant.error = err.message)
    }


    // varient push db 
    const addVariant = (e) => {
        e.preventDefault();
        if (variant.error) {
            return
        }

        const imageObjects = [];
        const imageUrls = [];
        variant.images.forEach(image => {
            if (typeof image == 'object') {
                imageObjects.push(image);
            }
            else {
                imageUrls.push(image);
            }
        })

        if (imageObjects.length > 0) {
            uploadVariantImages(imageObjects).then(varintImg => {
                const variantImgs = imageUrls.concat(varintImg)
                updateVariant(variantImgs)
            })
        } else {
            updateVariant(imageUrls)
        }
    }

    return (
        <>
            {props.pid ? (<Button variant="success" onClick={() => setShowModal(true)}>Add Variant</Button>) :
                (<Button variant="success" onClick={() => setShowModal(true)}>Edit</Button>)}

            <Modal
                size="lg"
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        VARIANT
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='add-Product-container'>

                        <form className='form-group' autoComplete="off" onSubmit={addVariant}>
                            <div className=" preview">
                                {variant.images.map((item, index) => {
                                    return (
                                        <div className='imagefiles' key={index}>
                                            <img src={generatePath(item)} alt="" />
                                            <button type='button' onClick={() => deleteImageFile(index)}>delete</button>
                                        </div>
                                    );
                                })}
                            </div>
                            <div>
                                <label htmlFor="images" className='file-control'>
                                </label>
                                <input type="file" name="images" className='form-control' id="images" multiple={true} onChange={variantImagesHandler} />
                            </div>
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
                            <Button type="submit" variant="success">Add Variant</Button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}


export default Variant
