import React, { useEffect, useState } from 'react'
import { Image, Modal } from 'react-bootstrap'
import { db } from '../confing/confing'
import { MdArrowForwardIos } from 'react-icons/md';
import Customer from '../admin/products/Customer';

const Accounts = (props) => {
    const userId = props.userId
    const [customer, setCustomer] = useState({
        name: '',
        mobile: 0,
        emailId: ''
    })
    // show and hide modal customer details
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // const genreateAddressId = () => {
    //     return Date.now() + Math.floor(1000 + Math.random() * 9000)
    // }
    // const addressId = (customer.address.addressEditId) ? customer.address.addressEditId : genreateAddressId()



    // const editDetails = () => {
    useEffect(() => {

        db.collection('customer').doc(`${userId}`).get().then(snapshot => {
            const customerDetail = snapshot.data();
            setTimeout(() => {
                setCustomer((prevObj) => {
                    return {
                        ...prevObj,
                        name: customerDetail.name,
                        mobile: customerDetail.mobile,
                        emailId: customerDetail.email
                    }
                })
            }, 1000);
        })
    }, [])
    // }
    const editDetails = () => {
        console.log('hello')
    }


    const getCustomerDetails = (e) => {
        let { name, value } = e.target
        setCustomer((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }




    const addDetails = (e) => {
        e.preventDefault();
        db.collection('customer').doc(`${userId}`).update({
            name: customer.name,
            mobile: customer.mobile,
            email: customer.emailId
        }).then(() => {
            setCustomer((prevalue) => {
                return {
                    ...prevalue,
                    name: '',
                    mobile: '',
                    emailId: ''
                }
            })
        })
        setTimeout(() => {
            window.location.reload(false);
        }, 1000);
        handleClose();
    }

    return (
        <div>
            <div className='accoutnContainer'>
                <div className='profile-card '>
                    <div className='profile-infoLabel'>Profile Details</div>
                    <table className='profile-infoTable' >
                        <tbody>
                            <tr>
                                <td>Full Name</td>
                                <td>{customer.name}</td>
                            </tr>
                            <tr>
                                <td>Mobile Number</td>
                                <td>{customer.mobile}</td>
                            </tr>
                            <tr>
                                <td>Email ID</td>
                                <td>{customer.emailId}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="profile-editButton" onClick={() => { handleShow(); editDetails(); }}> EDIT </div>
                </div>
            </div>





            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title className='modalAddressTitle' >Edit Details </Modal.Title>
                </Modal.Header>
                <Modal.Body className='modalAddressHeight'>
                    <div className="addAddress-container">
                        <form autoComplete="off" className='addressForm-group' onSubmit={(e) => addDetails(e)} method="post">
                            <div className="contactDetails">CONTACT DETAILS</div>
                            <div className='form-control addressPlaceholder'>
                                <label className='addressLabel addressPlaceholderPosition' htmlFor="name">Name</label>
                                <input type="text" className='addressForm-control' id='name' name='name' required onChange={getCustomerDetails} value={customer.name} />
                            </div>
                            <br />
                            <div className='form-control addressPlaceholder'>
                                <label className='addressLabel addressPlaceholderPosition' htmlFor="mobile">Mobile No</label>
                                <input type="text" required className='addressForm-control' id='mobile' name="mobile" onChange={getCustomerDetails} value={customer.mobile} />
                            </div>
                            <br />
                            <div className='form-control addressPlaceholder'>
                                <label className='addressLabel addressPlaceholderPosition' htmlFor="emailId">EmailId</label>
                                <input type="text" name="emailId" className='addressForm-control' id="emailId" onChange={getCustomerDetails} value={customer.emailId} />
                            </div>
                            <br />
                            <button type="submit" className='addressBtn'>SAVE DETAIL</button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}


export default Accounts
