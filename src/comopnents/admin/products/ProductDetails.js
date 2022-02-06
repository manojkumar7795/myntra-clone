import React, { useEffect, useState } from 'react'
import { db, fStorage } from '../../confing/confing'
import { Button } from 'react-bootstrap';
import { BsPencilSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom'
import { description, MyEditor } from './MyEditor';
import MToastContainer from '../../../containers/MToastContainer';




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

    const [product, setProduct] = useState({
        title: '',
        subTitle: '',
        description: '',
        mainImage: null,
        productTags: [],
        variantIds: [],
        pinCoads: [],
        productId: '',
        sellPrice: '',
        // pricing: {
        //     rackPrice: '',
        //     sellPrice: '',
        //     inclusivTax: false
        // },
        slug: ''
    })

    const generateProductId = () => {
        return Date.now() + Math.floor(1000 + Math.random() * 9000)
    }

    const setInputValue = (e) => {
        const { name, value } = e.target
        setProduct((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }


    // const setPricing = (e) => {
    //     let { name, value } = e.target
    //     console.log(name, value);
    //     setProduct((preValue) => {
    //         const price = { ...preValue };
    //         price.pricing[name] = value;

    //         return {
    //             ...preValue,
    //           price : price
    //         }
    //     })
    // }
    // const setInclusivTax = (e)=>{
    //     const name = e.target.name;
    //     const checked= e.target.checked
    //     console.log("setInclusive",name,checked)
    //     setProduct((preValue)=>{
    //        const  inclusivTax = {...preValue};
    //        inclusivTax.pricing[name] = checked
    //         return {
    //             ...preValue,
    //             inclusivTax:inclusivTax

    //         }
    //     })
    // }


    const fillUrlSlug = (event) => {
        const value = event.target.value;
        if (product.slug.length == 0) {
            setProduct((preValue) => {
                return {
                    ...preValue,
                    slug: value.toLowerCase().replace(/\s/g, '-')
                }
            })
        }
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
            props.MToastDangerHandler({title:'image not valid  ', description:' Error :- Please select a valid image type (jpg,png or webp)!'})
        }

    }
    function renderFile(file, container) {
        if (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                container.src = e.target.result
            }
            reader.readAsDataURL(file);
            container.classList.add("show");
        }
    }

    // const setPricing = (e) => {
    //     let { name, value } = e.target
    //     setProduct((preValue) => {
    //         const pricing = { ...preValue };
    //         pricing[name] = value;
    //         return {
    //             ...preValue,
    //             pricing: pricing
    //         }
    //     })
    // }

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
                const productDetails = documentSnapshot.data()
                if (productDetails) {
                    setProduct((preValue) => {
                        return {
                            ...preValue,
                            title: productDetails.title,
                            subTitle: productDetails.subTitle,
                            description: productDetails.description,
                            mainImage: productDetails.mainImage,
                            productTags: productDetails.productTags,
                            variantIds: productDetails.variantIds,
                            pinCoads: productDetails.pinCoads,
                            productId: productDetails.productId,
                            slug: productDetails.slug,
                            sellPrice: productDetails.sellPrice
                            // pricing: {
                            //     rackPrice: productDetails.pricing.rackPrice,
                            //     sellPrice: productDetails.pricing.sellPrice,
                            //     inclusivTax: productDetails.pricing.inclusivTax
                            // },



                        }
                    })



                }
            })

        }
    }, [])

    const updateProduct = (url) => {
        productId = (productId == "add") ? generateProductId() : productId;

        const updatedData = {
            productId: Number(productId),
            title: product.title,
            subTitle: product.subTitle,
            mainImage: url,
            pinCoads: product.pinCoads,
            description: description.data,
            productTags: product.productTags,
            variantIds: product.variantIds,
            slug: product.slug,
            sellPrice: product.sellPrice,
            // pricing: {
            //     rackPrice: product.pricing.rackPrice,
            //     sellPrice: product.pricing.sellPrice,
            //     inclusivTax: product.pricing.inclusivTax
            // },
        };

        db.collection('products').doc(`${productId}`).set(updatedData)
            .then(() => {
                props.MToastSuccessHandler({title:'Collection success ', description:'Collection success Upload!'})
                // addCollectionId(collectionId);
                setProduct(() => {
                    return {
                        ...product,
                        productId: productId,
                        title: '',
                        subTitle: '',
                        description: '',
                        mainImage: null,
                        productTags: [],
                        variantIds: [],
                        pinCoads: [],
                        sellPrice: '',
                        // pricing: {
                        //     rackPrice: '',
                        //     sellPrice: '',
                        //     inclusivTax: false
                        // },
                        slug: ''
                    }
                })
                setTimeout(() => {
                    window.history.pushState(true, `${productId}`, `/admin/products/${productId}`);
                }, 3000);


            }).catch(err => {
                props.MToastDangerHandler({Title:'error',description:err.message})
            });

    }



    const addProduct = (e) => {
        e.preventDefault();
        // if (product.error) {
        //     return;
        // }
        // product update in db
        db.collection('products').where('slug', '==', product.slug).onSnapshot(snapshot => {

            if (snapshot.docs.length > 0 && productId !== snapshot.docs[0].id) {
                props.MToastDangerHandler({title:'pleace select unique slug ',description:'this  slug is already exist'})
                return
            }
            if (typeof product.mainImage == "object") {

                fStorage.ref(`product/${product.mainImage.name}`).put(product.mainImage);
                fStorage.ref("product").child(product.mainImage.name).getDownloadURL().then(url => {

                    updateProduct(url)
                });
            }
            else {
                updateProduct(product.mainImage)
            }
        })
    }

    return (

        <div className='add-Product-container'>
            <a href="/admin/products">
                <button type="button" class="btn btn-success btn btn-primary">back </button>
            </a>
            <MToastContainer.MToast/>
            <h2>product</h2>
            <hr />
            <form className="form-group" onSubmit={addProduct} autoComplete="off">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" className='add-Product-form' name="title" onChange={setInputValue} onBlur={(e) => fillUrlSlug(e)} value={product.title} />
                <br />
                <label htmlFor="subTitle">SubTitle</label>
                <input type="text" id="subTitle" className='add-Product-form' name="subTitle" onChange={setInputValue} value={product.subTitle} />
                <br />
                <div>
                    <div className="urlCon">
                        <label htmlFor="slug">Slug</label>
                        <input type="text" name="slug" id="slug" className="form-control" onChange={setInputValue} value={product.slug} />
                    </div>
                    <br />
                    <label htmlFor="mainImage" className='file-control' >
                        <img id="slectfile" alt='slectfile' width="100%" height="100%" src={product.mainImage} className={product.mainImage ? "show" : ""} />
                        <BsPencilSquare className={product.mainImage ? "editImgBtn" : "hedden"} id="editImage" />
                    </label>
                    <input type="file" id="mainImage" className='form-control' name="mainImage" onChange={mainImageHandler} />
                    <br />
                </div>
                <label htmlFor="discounted-price">Sell Price</label>
                <input type="number" className='add-Product-form' name="sellPrice" id="discounted-Price" placeholder="  Sell Price" onChange={setInputValue} value={product.sellPrice} />
                <br />

                {/* <label htmlFor="rack-price">Rack Price</label>
                <input type="number" className='add-Product-form' name="rackPrice" id="rack-price" placeholder="  Rack Price" onChange={setPricing} value={product.pricing.rackPrice} />
                <br />

                <label htmlFor="discounted-price">Sell Price</label>
                <input type="number" className='add-Product-form' name="sellPrice" id="discounted-Price" placeholder="  Sell Price" onChange={setPricing} value={product.pricing.sellPrice} />
                <br />

                <label htmlFor="pincodes">Tax inclusive? </label>
                <input type="checkbox" id="inclusivTax" name="inclusivTax" onChange={setInclusivTax}  checked= {product.pricing.inclusivTax}   />
                <br /> */}
                {/* <label htmlFor="description">Description</label>
                <textarea name="description" className='add-Product-form' id="description" onChange={setInputValue} value={product.description} />
                <br /> */}
                <label htmlFor="description">Description</label>
                <MyEditor description={product.description} />
                <label htmlFor="pinCoads">PinCode</label>
                <input type="text" name="pinCoads" id="pinCoads" className='add-Product-form' placeholder="PinCode" onChange={updatePinCode} value={product.pinCoads} />
                <br />
                <div className="tags mrbottam">
                    {productTags.map(tag => {
                        return (
                            <div key={tag} className="form-check-label badge bdge-success bg-info mrbtn mrbottam">
                                <label htmlFor={tag}>
                                    <input type="checkbox" name="productTags" id={tag} style={{ marginRight: "3px" }} onChange={updateTags} value={tag} checked={product.productTags.includes(tag)} />
                                    <span>
                                        {tag}
                                    </span>
                                </label>
                            </div>
                        )

                    })}
                </div>
                <Button type="submit" className=' btn-success btn-md ' >Add</Button>
            </form>
            <Link to={`/admin/products/${product.productId}/variants`} className='showVariantBtn' >
                <Button variant="success">Show Variants</Button>
            </Link>
            {/* <ToastContainer /> */}
        </div>

    )
}

export default ProductDetails
