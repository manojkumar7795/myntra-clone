import React, { useEffect, useState } from 'react'
import { db, fStorage } from '../confing/confing'
import firebase from 'firebase/compat/app';
import Variant from './Variant';
import { Button, Image, Table } from 'react-bootstrap';

import { useHistory } from 'react-router';
import { BsPencilSquare } from 'react-icons/bs';
import SussaceToast from './ShowToast';
import ShowToast from './ShowToast';
import Products from './Products';



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

    let productId = props.match.params.pid

    const [variants, setVariants] = useState([])

    const [toastState, setToastState] = useState(true);

    const [product, setProduct] = useState({
        title: '',
        subTitle: '',
        description: '',
        mainImage: null,
        productTags: [],
        variantIds: [],
        pinCoads: [],
        productId: '',
        error: ''

    })

    const generateProductId = () => {
        return Date.now() + Math.floor(1000 + Math.random() * 9000)
    }


    const addVariant = (vid) => {
        if (product.variantIds) {
            product.variantIds.push(vid)
            db.collection('products').doc(`${product.productId}`).update({
                "variantIds": firebase.firestore.FieldValue.arrayUnion(`${vid}`)
            });
        }
    }

    const getInputValue = (e) => {
        const { name, value } = e.target
        setProduct((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    const types = ['image/png', 'image/jpeg', 'image/webp'];
    const mainImageHandler = (e) => {
        const selectedFile = e.target.files[0];
        renderFile(selectedFile, document.getElementById('slectfile'))
        if (selectedFile && types.includes(selectedFile.type)) {
            setProduct((preData) => {
                return {
                    ...preData,
                    mainImage: selectedFile
                }
            })
        }
        else {
            setProduct((preData) => {
                return {
                    ...preData,
                    mainImage: null,
                    error: "Please select a valid image type (png,jpg,webp)"
                }
            })

        }

    }
    function renderFile(file, container) {
        if (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                container.src = e.target.result
            }
            reader.readAsDataURL(file);
            // container.style.display = 'block'
            container.classList.add("show");
        }
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




    // fech data from db 

    useEffect(() => {
        if (productId != "add") {
            db.collection('products').doc(`${productId}`).get().then(documentSnapshot => {
                const fechData = documentSnapshot.data()

                if (fechData) {
                    setProduct((preValue) => {
                        return {
                            ...preValue,
                            title: fechData.title,
                            subTitle: fechData.subTitle,
                            description: fechData.description,
                            mainImage: fechData.mainImage,
                            productTags: fechData.productTags,
                            variantIds: fechData.variantIds,
                            pinCoads: fechData.pinCoads,
                            productId: fechData.productId, 
                        }
                    })
                    // show variant if click product 
                    if (product.variantIds){
                     db.collection('variant')
                      .where(firebase.firestore.FieldPath.documentId(), 'in',fechData.variantIds)
                      .get()
                      .then(Snapshot => {
                          const variantDetails = Snapshot.docs
                            setVariants(() => variantDetails)
                        })
                    }

                }
            })

        }
    }, [])







    const updateProduct = (url) => {
        productId = (productId == "add") ? generateProductId() : productId;

        const updatedData = {
            productId: productId,
            title: product.title,
            subTitle: product.subTitle,
            mainImage: url,
            pinCoads: product.pinCoads,
            description: product.description,
            productTags: product.productTags,
            variantIds: product.variantIds

        };

        db.collection('products').doc(`${productId}`).set(updatedData)
            .then(() => {
                setProduct(() => {
                    return {
                        ...product,
                        productId: productId
                    }
                })


                window.history.pushState(true, `${productId}`, `/admin/products/${productId}`);
                    <ShowToast state={toastState} onClose={() => setToastState(false)} />
            

            }).catch(err => product.error = err.message);

    }
   
    

    const addProduct = (e) => {
        e.preventDefault();
        if (product.error) {
            return;
        }
        // product update in db
        if (typeof product.mainImage == "object") {

            fStorage.ref(`product/${product.mainImage.name}`).put(product.mainImage);
            fStorage.ref("product").child(product.mainImage.name).getDownloadURL().then(url => {
                
                updateProduct(url)
            });
        }
        else {
            updateProduct(product.mainImage)
        }
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
                <div>
                    <label htmlFor="mainImage" className='file-control'>
                        <BsPencilSquare className={product.mainImage ? "editImgBtn" : "hedden"} />
                        <img id="slectfile" alt='slectfile' width="100%" height="100%" src={product.mainImage} className={product.mainImage ? "show" : ""} />
                    </label>
                    <input type="file" id="mainImage" className='form-control' name="mainImage" onChange={mainImageHandler} />
                    <br />
                </div>



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
                                <input type="checkbox" name="productTags" id={tag} style={{ marginRight: "3px" }} onChange={updateTags} value={tag} checked={product.productTags.includes(tag)} />
                                <label htmlFor={tag}>{tag}</label>
                            </div>
                        )

                    })}
                </div>
                {product.error && <span className='error-msg text-danger'>{product.error}<br /></span>}
                <Button type="submit" className=' btn-success btn-md ' >Add</Button>
            </form>

        
        <Variant pid={product.productId} onAdd={(vid) => addVariant(vid)} />
           
            {/* show Varients */}
            
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>Reck price</th>
                        <th>sell price</th>
                        <th>Tex inclusive</th>
                        <th>Sku</th>
                        <th>Barcode</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                
                    {
                        variants.map(variantDetails => {
                            const variant = variantDetails.data();
                            return (
                            <tr key={variant.variantId}>
                                <td>{variant.variantId}</td>
                                <td className="productImageWidth" >
                                    {variant.images.map(image => (
                                        <Image src={image} thumbnail />
                                    ))}

                                </td>
                                <td>{variant.pricing.rackPrice}</td>
                                <td>{variant.pricing.sellPrice}</td>
                                <td>{variant.pricing.inclusivTax}</td>
                                <td>{variant.inventory.sku}</td>
                                <td>{variant.inventory.barcode}</td>
                                <td>{variant.inventory.quantity}</td>
                                <td> <Variant  pid={product.productId} vid={variant.variantId} hallo = {true}/></td>

                            </tr>

                        )})
                    }
                </tbody>
            </Table>
        </div>

    )
}

export default ProductDetails
