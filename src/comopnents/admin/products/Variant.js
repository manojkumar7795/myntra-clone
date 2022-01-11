import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { Button, Modal, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { db, fStorage } from '../../confing/confing'
import firebase from 'firebase/compat/app';
import { MdDeleteForever } from 'react-icons/md';
import { cloneDeep } from 'lodash';
import { MToast, toast } from '../MToast';



const Variant = (props) => {

    const emptyState = {
        variant: {
            productId: props.pid,
            images: [],
            inventory: {
                sku: "",
                barcode: "",
                quantity: ""
            },
            pricing: {
                rackPrice: null,
                sellPrice: null,
                inclusivTax: false
            },
        }

    }

    const newToast = (type) => {
        if (type == "success") {
            toast.success('variant success ', 'variant success Upload!')
        }
        else if (type == 'imageErrror') {
            toast.error('image not valid  ', ' Error :- Please select a valid image type (jpg,png or webp)!')
        }
        else {
            toast.error('Error ', type)
        }
    }

    // variant details  push in  db 
    const [state, setState] = useState(emptyState)

    // Edit variant data 
    useEffect(() => {
        db.collection('variant').doc(`${props.match.params.vid}`).get().then(documentSnapshot => {
            const productDetails = documentSnapshot.data()

            if (productDetails) {
                setState((preValue) => {
                    return {
                        ...preValue,
                        variant: {
                            productId: Number(props.match.params.pid),
                            images: productDetails.images,

                            inventory: {
                                sku: productDetails.inventory.sku,
                                barcode: productDetails.inventory.barcode,
                                quantity: productDetails.inventory.quantity
                            },
                            pricing: {
                                rackPrice: productDetails.pricing.rackPrice,
                                sellPrice: productDetails.pricing.sellPrice,
                                inclusivTax: productDetails.pricing.inclusivTax
                            },
                        }

                    }
                })

            }
        })
    }, [])





    if (props.action) {
        return (
            <>
                <Button variant="success" className={props.actionClass} onClick={() => {
                    setState((preValue) => {
                        return {
                            ...preValue,
                            variant: cloneDeep(props.data)
                        }
                    })
                }}>{props.action}</Button>
            </>
        );
    }


    // Update variant Id  for product 
    const addVariantId = (vid) => {
        db.collection('products').doc(`${props.match.params.pid}`).update({
            "variantIds": firebase.firestore.FieldValue.arrayUnion(`${Number(vid)}`)
        });
    }




    // get  variant id  function  
    const generateVariant = () => {
        return Date.now() + Math.floor(1000 + Math.random() * 9000)
    }




    //  get sku  barcode  quantity   from input field
    const setInventory = (e) => {
        let { name, value } = e.target
        setState((preValue) => {
            const inventory = { ...preValue.variant };
            inventory.inventory[name] = value;
            return {
                ...preValue,
                inventory: inventory
            }
        })
    }



    // delete  image   from browser
    const deleteImageFile = (index) => {
        setState(() => {
            state.variant.images.splice(index, 1)
            return { ...state }
        })
    }



    // generatePath to  show image 
    const generatePath = (file) => {
        if (typeof file == "string") {
            return file;
        } else {
            return URL.createObjectURL(file)
        }
    }
    const setPricing = (e) => {
        let { name, value } = e.target

        setState((preValue) => {
            const price = { ...preValue.variant };
            price.pricing[name] = value;

            return {
                ...preValue,
                price: price
            }
        })
    }
    const setInclusivTax = (e) => {
        const name = e.target.name;
        const checked = e.target.checked
        console.log("setInclusive", name, checked)
        setState((preValue) => {
            const inclusivTax = { ...preValue.variant };
            inclusivTax.pricing[name] = checked
            return {
                ...preValue,
                inclusivTax: inclusivTax

            }
        })
    }



    //variant Images   handler 
    const types = ['image/png', 'image/jpeg', 'image/webp'];
    const variantImagesHandler = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile && types.includes(selectedFile.type)) {

            setState((preValue) => {
                preValue.variant.images.push(selectedFile)
                return {
                    ...preValue
                }
            })
        }

        else {
            newToast('imageErrror')
        }

    }



    // upload variant multipal  images db  functions 
    const uploadVariantImages = async (images) => {
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


    const updateVariant = (varintImg) => {
        const variantId = (props.match.params.vid == 'new') ? generateVariant() : props.match.params.vid
        const data = {

            variantId: `${variantId}`,
            productId: Number(props.match.params.pid),
            images: varintImg,
            inventory: {
                sku: state.variant.inventory.sku,
                barcode: state.variant.inventory.barcode,
                quantity: state.variant.inventory.quantity

            },
            pricing: {
                rackPrice: Number(state.variant.pricing.rackPrice),
                sellPrice: Number(state.variant.pricing.sellPrice),
                inclusivTax: state.variant.pricing.inclusivTax
            }
        }


        db.collection('variant').doc(`${variantId}`)
            .set(data)
            .then(() => {
                setState(() => emptyState)
                addVariantId(variantId)
                newToast('success')
                setTimeout(() => {
                    window.open(`/admin/products/${Number(props.match.params.pid)}/variants`, '_self')
                }, 3000);
            }).catch(err => {
                newToast(err.message)
            })
    }



    // varient push db 
    const addVariant = (e) => {
        e.preventDefault();
        // if (variant.error) {
        //     return
        // }

        const imageObjects = [];
        const imageUrls = [];
        state.variant.images.forEach(image => {
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
            <div className='add-Product-container'>

                <MToast />
                <form className='form-group' autoComplete="off" onSubmit={addVariant}>
                    <div className="images-container">
                        {state.variant.images.map((item, index) => {
                            return (
                                <div className='imagefile bdrn mrbtn mrbottam ' key={index}>
                                    <Image src={generatePath(item)} thumbnail className='file-control' />
                                    <MdDeleteForever className='imgDeleteBtn' onClick={() => deleteImageFile(index)} />
                                </div>
                            );
                        })}


                        <div>
                            <label htmlFor="images" className='file-control' />
                            <input type="file" name="images" className='form-control' id="images" multiple={true} onChange={variantImagesHandler} />
                        </div>
                    </div>
                    <label htmlFor="rack-price">Rack Price</label>
                    <input type="number" className='add-Product-form' name="rackPrice" id="rack-price" placeholder="  Rack Price" onChange={setPricing} value={state.variant.pricing.rackPrice} />
                    <br />

                    <label htmlFor="discounted-price">Sell Price</label>
                    <input type="number" className='add-Product-form' name="sellPrice" id="discounted-Price" placeholder="  Sell Price" onChange={setPricing} value={state.variant.pricing.sellPrice} />
                    <br />

                    <label htmlFor="pincodes">Tax inclusive? </label>
                    <input type="checkbox" id="inclusivTax" name="inclusivTax" onChange={setInclusivTax} checked={state.variant.pricing.inclusivTax} />
                    <br />
                    <br />
                    <label htmlFor="sku">SKU</label>
                    <input type="text" name="sku" id="sku" className='add-Product-form' placeholder="  sku" onChange={setInventory} value={state.variant.inventory.sku} />
                    <br />

                    <label htmlFor="barcode">Barcode</label>
                    <input type="text" name="barcode" id="barcode" className='add-Product-form' placeholder="  Barcode" onChange={setInventory} value={state.variant.inventory.barcode} />
                    <br />

                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" name="quantity" className='add-Product-form' id="quantity" placeholder="   Quantity" onChange={setInventory} value={state.variant.inventory.quantity} />
                    <br />
                    <Button type="submit" variant="success">Add Variant</Button>

                </form>
            </div>
        </>
    )
}


export default Variant
