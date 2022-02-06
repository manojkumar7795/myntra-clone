import React, { useEffect, useState } from 'react'
import { db } from '../confing/confing';
import firebase from 'firebase/compat/app';
import { Modal } from 'react-bootstrap';

const Addressess = (props) => {
    const userId = JSON.parse(localStorage.getItem('userId'))


    const [address, setAddress] = useState({

        name: '',
        mobile: null,
        pincode: null,
        homeAddress: '',
        town: '',
        district: '',
        state: '',
        addressEditId: ''

    });
    const [customerDetails, setcustomerDetails] = useState([]);



    // show and hide modal customer Address
    const [showAddress, setShowAddress] = useState(false);
    const handleCloseAddress = () => setShowAddress(false);
    const handleShowAddress = () => setShowAddress(true);




    const genreateAddressId = () => {
        return Date.now() + Math.floor(1000 + Math.random() * 9000)
    }
    const addressId = (address.addressEditId) ? address.addressEditId : genreateAddressId()

    const addressData = async (addressArray) => {
        if (addressArray.addressId.length > 0) {
            const promises = [];
            const promise = db.collection('address')
                .where('id', 'in', addressArray.addressId).get().then(async addressSnapshot => {
                    addressArray.addresses = addressSnapshot.docs.map(s => s.data())
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
                setcustomerDetails(data)
            })
        })
    }, [])


    const getAddress = (e) => {
        let { name, value } = e.target
        setAddress((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
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
    const updateAddressId = () => {
        db.collection('customer').doc(`${userId}`).update({
            addressId: firebase.firestore.FieldValue.arrayUnion(addressId)
        })
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
                setAddress((prevalue) => {
                    return {
                        ...prevalue,
                        name: '',
                        mobile: 0,
                        pincode: 0,
                        homeAddress: 0,
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
        handleCloseAddress();
    }
    return (
        <div className='addressCompinent'>
            <div className='addAddressBar-cardWrapper'>
                <div className='addAddressBar-headingContainer'>
                    <span className='addAddressBar-heading'> Saved Addresses </span>
                    <div className='addAddressBar-card' onClick={() => handleShowAddress()}>
                        <div className='addAddressBar-addText'  > + Add New Address </div>
                    </div>
                </div>
                <div className='addressList-addressSegmentation'>
                    Default Address
                </div>
                {customerDetails.addresses && customerDetails.addresses.map(address => {
                    return (
                        <div className="addressContainer" key={address.name}>
                            <div className='addressAccordian-addressAccordian addressAccordian-myAddress'>
                                <div className='addressAccordian-address'>
                                    <div className='addressAccordian-nameComponent'>{address.name}</div>
                                    <div>{address.homeAddress}</div>
                                    <div>{address.town}</div>
                                    <div>{address.district}-{address.pincode}</div>
                                    <div>Mobile:-{address.mobile}</div>
                                </div>
                            </div>

                            <div className='addressAccordian-buttons'>
                                <div className='addressAccordian-button' onClick={() => { handleShowAddress(); editAddress(address.id) }} >EDIT</div>
                                <div className='addressAccordian-button' onClick={() => removeAddress(address.id)} >REMOVE</div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Modal show={showAddress} onHide={handleCloseAddress} backdrop="static" keyboard={false}>
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

        </div>

    )
}

export default Addressess
