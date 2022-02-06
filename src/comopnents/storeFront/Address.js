import React, { useEffect, useState } from 'react'
import { Modal, Button } from "react-bootstrap";
import { BiRupee } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { db } from '../confing/confing';
// import * as firebase from 'firebase';
import firebase from 'firebase/compat/app';
import UserHeader from './UserHeader';






const Address = (props) => {
    const userName = JSON.parse(localStorage.getItem('userName'))
    const userId = JSON.parse(localStorage.getItem('userId'))

    const [address, setAddress] = useState({
        name: '',
        mobile: null,
        pincode: '',
        homeAddress: '',
        town: '',
        district: '',
        state: '',
        addressEditId: null

    })
    const [customer, setCustomer] = useState(null)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const genreateAddressId = () => {
        return Date.now() + Math.floor(1000 + Math.random() * 9000)
    }
    const addressId = (address.addressEditId) ? address.addressEditId : genreateAddressId()
    const addressData = async (addressArray) => {
        if (addressArray.addressId.length > 0) {
            const promises = [];
            const promise = db.collection('address')
                .where('id', 'in', addressArray.addressId).get().then(async addressSnapshot => {

                    addressArray.address = addressSnapshot.docs.map(s => s.data())
                })
            promises.push(promise)
            await Promise.all(promises);

        }
        return addressArray;

    }
    // feach data 
    useEffect(() => {
        db.collection('customer').doc(`${userId}`).get().then(snapshot => {
            const AddressData = snapshot.data();
            addressData(AddressData).then(data => {
                setCustomer(data)
            })
        })
    }, [])

    var { shoppingCart, totalPrice, totalQty, totalRackPrice } = JSON.parse(localStorage.getItem('localCart'));
    const getAddress = (e) => {
        setAddress((prevObj) => {
            return {
                ...prevObj,
                [e.target.name]: e.target.value
            }
        })
    }

    const updateAddressId = () => {
        db.collection('customer').doc(`${userId}`).update({
            addressId: firebase.firestore.FieldValue.arrayUnion(addressId)
        })
    }

    const removeAddress = (addressIds) => {

        db.collection('customer').doc(`${userId}`).update({
            addressId: firebase.firestore.FieldValue.arrayRemove(addressIds)
        })

        db.collection('address').doc(`${addressIds}`).delete()

        setTimeout(() => {
            window.location.reload(false);
        }, 1000);
    }

    const editAddress = (addressId) => {
        db.collection('address').doc(`${addressId}`).get().then(snapshot => {
            const data = snapshot.data()
            setAddress((prevalue) => {
                return {
                    ...prevalue,
                    name: data.name,
                    mobile: data.mobile,
                    pincode: data.pincode,
                    homeAddress: data.homeAddress,
                    town: data.town,
                    district: data.district,
                    state: data.state,
                    addressEditId: addressId
                }
            })
        })

    }

    const addAddress = (e) => {
        e.preventDefault();
        db.collection('address').doc(`${addressId}`).set({
            customerId: userId,
            id: addressId,
            name: address.name,
            mobile: address.mobile,
            pincode: address.pincode,
            homeAddress: address.homeAddress,
            town: address.town,
            district: address.district,
            state: address.state

        })
            .then(() => {
                setAddress(() => {
                    return {
                        name: '',
                        mobile: null,
                        pincode: null,
                        homeAddress: '',
                        town: '',
                        district: '',
                        state: ''

                    }
                })
            })
        updateAddressId()
        setTimeout(() => {
            window.location.reload(false);
        }, 1000);
        handleClose();
    }

    if (!customer) {
        return null;
    }
    return (
        <>
        <UserHeader/>
            <div className="address-container">
                {customer.addressId.length == 0 && <div className="addressPage-left">
                    <div className="addAddress-container">
                        <form autoComplete="off" className='addressForm-group' onSubmit={(e) => addAddress(e)} method="post">
                            <div className="contactDetails">CONTACT DETAILS</div>
                            <div className='form-control addressPlaceholder'>
                                <label className='addressLabel addressPlaceholderPosition' htmlFor="name">Name</label>
                                <input type="text" className='addressForm-control' id='name' name='name' required onChange={getAddress} value={address.name} />
                            </div>
                            <br />
                            <div className='form-control addressPlaceholder'>
                                <label className='addressLabel addressPlaceholderPosition' htmlFor="mobile">Mobile No</label>
                                <input type="text" required className='addressForm-control' id='mobile' name="mobile" onChange={getAddress} value={address.mobile} />
                            </div>
                            <br />
                            <div className='form-control addressPlaceholder'>
                                <label className='addressLabel addressPlaceholderPosition' htmlFor="Pincode">Pincode</label>
                                <input type="text" className='addressForm-control' id='pincode' name='pincode' required onChange={getAddress} max={6} value={address.pincode} />
                            </div>
                            <br />
                            <div className='form-control addressPlaceholder'>
                                <label className='addressLabel addressPlaceholderPosition' htmlFor="homeAddress">Address (House No, Building, Street, Area)*</label>
                                <input type="text" className='addressForm-control' id='homeAddress' name='homeAddress' required onChange={getAddress} value={address.homeAddress} />
                            </div>
                            <br />
                            <div className='form-control addressPlaceholder'>
                                <label className='addressLabel addressPlaceholderPosition' htmlFor="town">Locality / Town*</label>
                                <input type="text" className='addressForm-control' name='town' required onChange={getAddress} value={address.town} />
                            </div>
                            <br />
                            <div className='form-control addressPlaceholder'>
                                <label className='addressLabel addressPlaceholderPosition' htmlFor="District">District</label>
                                <input type="text" name="district" className='addressForm-control' id="District" onChange={getAddress} value={address.district} />
                            </div>
                            <br />
                            <div className='form-control addressPlaceholder'>
                                <label className='addressLabel addressPlaceholderPosition' htmlFor="state">State</label>
                                <input type="text" name="state" className='addressForm-control' id="state" onChange={getAddress} value={address.state} />
                            </div>
                            <br />

                            <button type="submit" className='addressBtn'>ADD ADDRESS</button>
                        </form>
                    </div>
                </div>}
                {customer.addressId.length > 0 && <div className="addressPage-left">
                    <div className='defaultAddress'>DEFAULT ADDRESS</div>
                    {customer.address && customer.address.map((userAddress,index) => {
                        return (

                            <div className='saveAddressContainer'key={index}>
                                <div className='userName'>{customer.name}</div>
                                <div className='userAddressDetails userAddressDetails-mtop'>
                                    <span>{userAddress.homeAddress},</span>
                                    <span className='mgl-3'>{userAddress.town}</span>
                                </div>
                                <div className='userAddressDetails'>
                                    <span>{userAddress.district},</span>
                                    <span className='mgl-3'>{userAddress.state}</span>
                                    <span>- {userAddress.pincode}</span>
                                </div>
                                <div className='userMobile'>
                                    <span>Mobile :</span>
                                    <span>{customer.mobile}</span>
                                </div>
                                <div className='mgt-16 mgb-16'>
                                    <button className='userRemoveBtn mgr-40' onClick={() => removeAddress(userAddress.id)}>REMOVE</button>
                                    <button className='userAddressEditBtn' onClick={() => { handleShow(); editAddress(userAddress.id); }}>EDIT</button>

                                </div>
                            </div>

                        )
                    })}
                    <div className="newAddress-List">
                        <button onClick={handleShow}>+ Add New Address</button>
                    </div>
                </div>}

                <div className="addressPage-right">
                    {shoppingCart.length > 0 && <div>
                        <div className="itemDetails">
                            PRICE DETAILS({totalQty} Items)
                        </div>
                        <div className="totalPrice">
                            <span>Total MRP</span>
                            <span> <BiRupee /> {totalPrice + totalRackPrice}</span>
                        </div>
                        <div className="rackPrice">
                            <span>Discount on MRP</span>
                            <span className='disscountPrice'>-<BiRupee /> {totalRackPrice}</span>
                        </div>
                        <div className="totalAmount">
                            <span>Total Amount</span>
                            <span><BiRupee /> {totalPrice}</span>
                        </div>

                        <Link className='orderButton' to={userName ? '/checkout/payment' : '/login'}>
                            CONTINUE
                        </Link>



                    </div>
                    }
                </div>
            </div>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title className='modalAddressTitle' >EDIT ADDRESS</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modalAddressHeight'>
                    <div className="addAddress-container">
                        <form autoComplete="off" className='addressForm-group' onSubmit={(e) => addAddress(e)} method="post">
                            <div className="contactDetails">CONTACT DETAILS</div>
                            <div className='form-control addressPlaceholder'>
                                <label className='addressLabel addressPlaceholderPosition' htmlFor="name">Name</label>
                                <input type="text" className='addressForm-control' id='name' name='name' required onChange={getAddress} value={address.name} />
                            </div>
                            <br />
                            <div className='form-control addressPlaceholder'>
                                <label className='addressLabel addressPlaceholderPosition' htmlFor="mobile">Mobile No</label>
                                <input type="text" required className='addressForm-control' id='mobile' name="mobile" onChange={getAddress} value={address.mobile} />
                            </div>
                            <br />
                            <div className='form-control addressPlaceholder'>
                                <label className='addressLabel addressPlaceholderPosition' htmlFor="Pincode">Pincode</label>
                                <input type="text" className='addressForm-control' id='pincode' name='pincode' required onChange={getAddress} max={6} value={address.pincode} />
                            </div>
                            <br />
                            <div className='form-control addressPlaceholder'>
                                <label className='addressLabel addressPlaceholderPosition' htmlFor="homeAddress">Address (House No, Building, Street, Area)*</label>
                                <input type="text" className='addressForm-control' id='homeAddress' name='homeAddress' required onChange={getAddress} value={address.homeAddress} />
                            </div>
                            <br />
                            <div className='form-control addressPlaceholder'>
                                <label className='addressLabel addressPlaceholderPosition' htmlFor="town">Locality / Town*</label>
                                <input type="text" className='addressForm-control' name='town' required onChange={getAddress} value={address.town} />
                            </div>
                            <br />
                            <div className='form-control addressPlaceholder'>
                                <label className='addressLabel addressPlaceholderPosition' htmlFor="District">District</label>
                                <input type="text" name="district" className='addressForm-control' id="District" onChange={getAddress} value={address.district} />
                            </div>
                            <br />
                            <div className='form-control addressPlaceholder'>
                                <label className='addressLabel addressPlaceholderPosition' htmlFor="state">State</label>
                                <input type="text" name="state" className='addressForm-control' id="state" onChange={getAddress} value={address.state} />
                            </div>
                            <br />

                            <button type="submit" className='addressBtn'>ADD ADDRESS</button>
                            {/* <input type="button" className='addressBtn' value='Add New Address' onClick={() => addNewAddress()} /> */}
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Address
