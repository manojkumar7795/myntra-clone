
import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { AiOutlineHeart } from 'react-icons/ai';
import { RiShoppingBagFill } from "react-icons/ri";
import { BsTruck } from "react-icons/bs";
import { FaAmazonPay, FaExchangeAlt } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { Link } from 'react-router-dom'
import { Markup } from 'interweave';
import { db } from '../confing/confing'
import { CartContext } from '../global/CartContext';
import Header from '../header';




const buttonSize = ['S', 'M', 'L', 'XL', 'XXL']

const ProductDetails = (props) => {
    const slug = props.match.params.slug;
    const [product, setProduct] = useState({
        variant: [],
        curentPincode: '',
        currentVariant: '',
    })

    const { dispatch } = useContext(CartContext)
    const data = JSON.parse(localStorage.getItem('localCart'))
    const context = useContext(CartContext)
    if (data == null)
        var { shoppingCart } = context

    else {
        var { shoppingCart } = data;
    }
    const ActiveVariant = shoppingCart.filter((variantid) => variantid.variantId == product.currentVariant)

    const variantData = async (product) => {
        const promis = db.collection('variant')
            .where('variantId', 'in', product.variantIds)
            .get().then(async variantSanapshot => {
                let variants = {};
                variantSanapshot.docs.map(s => variants[s.data().variantId] = s.data())
                product.variants = variants;
            })

        await promis;
        return product;
    }


    useEffect(() => {
        db.collection('products')
            .where('slug', "==", slug).get()
            .then(productSnapshot => {
                variantData(productSnapshot.docs[0].data())
                    .then(data => {
                        setProduct((preValue) => {
                            return {
                                ...preValue,
                                variant: data
                            }
                        })
                    })
            })
    }, [])
    const getPincode = (e) => {
        const value = e.target.value
        setProduct((preValue) => {
            return {
                ...preValue,
                curentPincode: value
            }
        })
    }
    const checkPincode = (e) => {
        e.preventDefault();
        const pincode = product.variant.pinCoads.filter(pinCoad => {
            return pinCoad == product.curentPincode
        })
        if (pincode.length) {
            setProduct((preValue) => {
                return {
                    ...preValue,
                    ispinCode: true
                }
            })
        } else if (pincode.length == 0) {
            setProduct((preValue) => {
                return {
                    ...preValue,
                    ispinCode: false
                }
            })
        }
    }
    const getDay = () => {
        let currentDate = new Date();
        currentDate.setDate(new Date().getDate() + 6);
        let days = [];
        days[0] = "Sun";
        days[1] = "Mon";
        days[2] = "Tue";
        days[3] = "Wed";
        days[4] = "Thu";
        days[5] = "Fri";
        days[6] = "Sat";
        const day = days[currentDate.getDay()];
        return day
    }
    const day = () => {
        return new Date().getDate() + 6
    }

    const getMonth = () => {
        let currentDate = new Date();
        currentDate.setDate(new Date().getDate() + 6);
        let months = [];
        months[0] = "Jan "
        months[1] = 'Feb '
        months[2] = 'Mar'
        months[3] = 'Apr '
        months[4] = 'May '
        months[5] = 'Jun'
        months[6] = 'Jul'
        months[7] = 'Aug'
        months[8] = 'Sep '
        months[9] = 'Oct'
        months[10] = 'Nov'
        months[11] = 'Dec '
        const month = months[currentDate.getMonth()]
        return month
    }
    const getVariantId = (vid) => {
        setProduct((preValue) => {
            return {
                ...preValue,
                currentVariant: vid
            }
        })
    }
    return (
        <>
            <Header />
            <div className="variantContainer">
                <div className="variantImg">
                    {product.currentVariant && product.currentVariant ?

                        product.variant.variants && product.variant.variants[product.currentVariant].images.map(image => {
                            return (
                                <img src={image} alt="mainImage" />
                            )
                        })
                        :
                        product.variant.variants && product.variant.variants[product.variant.variantIds[0]].images.map(image => {
                            return (
                                <img src={image} alt="mainImage" />
                            )
                        })}

                </div>
                <div className="variantDetaills">
                    <div className="priceInfo">
                        <h1 className="productTitleName">{product.variant.title}</h1>
                        <h1 className="productSubTitleName">{product.variant.subTitle}</h1>
                        <div className="priceContainer">
                            {product.currentVariant && product.currentVariant
                                ?
                                product.variant.variants && <span className="pdp-price">Rs.&nbsp;{product.variant.variants[product.currentVariant].pricing.sellPrice}</span>
                                :
                                product.variant.variants && <span className="pdp-price">Rs.&nbsp;{product.variant.variants[product.variant.variantIds[0]].pricing.sellPrice}</span>
                            }


                            <span className="pdp-rackPrice">
                                &nbsp;&nbsp;
                                {product.currentVariant && product.currentVariant
                                    ?
                                    product.variant.variants && <del>Rs.&nbsp;{product.variant.variants[product.currentVariant].pricing.rackPrice}</del>

                                    :
                                    product.variant.variants && <del>Rs.&nbsp;{product.variant.variants[product.variant.variantIds[0]].pricing.rackPrice}</del>

                                }
                            </span>

                            {product.currentVariant && product.currentVariant ?
                                (product.variant.variants && product.variant.variants[product.currentVariant].pricing.inclusivTax == true) ?
                                    <div className="pdp-tax">inclusive of all taxes</div>
                                    : '' :
                                (product.variant.variants && product.variant.variants[product.variant.variantIds[0]].pricing.inclusivTax == true) ?
                                    <div className="pdp-tax">inclusive of all taxes</div>
                                    : ''
                            }
                            <div className="sizeButtonContainer">
                                <div className="sizeButtonHeder">SELECT SIZE</div>
                                <div className="sizeButtons">
                                    {product.variant.variantIds && product.variant.variantIds.map(variantId => {
                                        return (
                                            <>

                                                <div onClick={() => getVariantId(variantId)} className={product.currentVariant == variantId ? 'currentActive sizeButton' : 'sizeButton'}>{buttonSize[product.variant.variantIds.indexOf(variantId)]}</div>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="pdpActionContainer">
                                <div className={ActiveVariant.length ? 'displayNone' : 'addToBag '} onClick={() => { dispatch({ type: 'ADD_TO_CART', id: product.currentVariant, product }) }}>
                                    <RiShoppingBagFill />
                                    <span> ADD TO BAG</span>
                                </div>
                                <div className={ActiveVariant.length ? 'goToBag ' : 'displayNone'}>
                                    <Link to="/checkout/cart">

                                        <span> GO TO BAG</span>
                                        <FiArrowRight size={25} className='goToBagRightArro' />
                                    </Link>
                                </div>
                                <div className='wishList'>
                                    <AiOutlineHeart size={20} className='wishlistdButtonIcon' />
                                    <span> WISHLIST </span>
                                </div>
                            </div>
                            <div className="pincode-deliveryContainer">
                                <h5>Delivery Option <BsTruck className='bsTruck' size={32} /></h5>
                                <div className="pincodeContainer" >
                                    <form className="pincode" onSubmit={checkPincode}>
                                        <input type="tel" name="pincode" id="pincode" maxLength={6} placeholder='Enter a Pincode' autoComplete='off' onChange={getPincode} />
                                        <button type='submit' className='checkButton'>Check </button>
                                    </form>
                                    <div className={product.ispinCode !== undefined ? 'emptyPincodeError displayNone' : 'emptyPincodeError'}>Please enter PIN code to check delivery time & Pay on Delivery Availability</div>
                                </div>
                            </div>
                            <div className={product.ispinCode == false ? "pincodeError" : "pincodeError displayNone"}>Unfortunately we do not ship to your pincode</div>
                            <div className={product.ispinCode == false ? 'exchangeArrowContainer displayBlock' : 'exchangeArrowContainer displayNone'}><FaExchangeAlt className='exchangeArrow' size={37} />Return & Exchange not available</div>
                            <div className={product.ispinCode == true ? "pincode-serviceability-list displayBlock" : "pincode-serviceability-list displayNone"}>
                                <div className="pincode-serviceability"> <BsTruck className='bsTruck' size={32} /> Get it by  {getDay()},{getMonth()},{day()} </div>
                                <div className="pincode-serviceability"><FaAmazonPay className='FaAmazonPay' size={32} /> Pay on delivery not available</div>
                                <div className="pincode-serviceability"> <FaExchangeAlt className='exchangeArrow' size={37} />Easy 30 days return available</div>

                            </div>
                            <div className='metaContainer'>
                                <div className="meta-info">100% Original Products</div>
                                <div className={product.ispinCode == true ? "meta-info displayNone" : "meta-info"}>Pay on delivery might be available</div>
                                <div className={product.ispinCode == true ? "meta-info displayNone" : "meta-info"}>Easy 30 days returns and exchanges</div>
                                <div className={product.ispinCode == true ? "meta-info displayNone" : "meta-info"}>Try & Buy might be available</div>

                            </div>
                            <div>{<Markup content={product.variant.description} />}</div>
                            {// markup converts a string HTML to HTML tags 
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductDetails

