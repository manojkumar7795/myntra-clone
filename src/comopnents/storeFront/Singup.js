import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { db, fAuth } from '../confing/confing'


const Singup = (props) => {
    const [singupData, setSingupData] = useState({
        name: "",
        email: "",
        password: "",
        mobile: null,

    })
    let name, value
    const getData = (e) => {
        name = e.target.name;
        value = e.target.value;

        setSingupData({ ...singupData, [name]: value })
    }
    let myCurrentDate = new Date();
    let singupDate = myCurrentDate.getFullYear() + '/' + (myCurrentDate.getMonth() + 1) + '/' + myCurrentDate.getDate() + ' at ' + myCurrentDate.getHours() + ':' + myCurrentDate.getMinutes();


    const signup = (e) => {
        const { name, email, mobile, password, error } = singupData
        e.preventDefault();
        fAuth.createUserWithEmailAndPassword(email, password).then((cred) => {
            db.collection('customer').doc(cred.user.uid).set({
                id: cred.user.uid,
                name: name,
                email: email,
                mobile: mobile,
                joiningDate: singupDate,
                orderCount: null,
                password: password,
                addressId: []
            })
                .then(() => {
                    setSingupData(() => {
                        return {
                            name: "",
                            email: "",
                            mobile: null,
                            password: "",
                        }
                    })
                    props.history.push('/login');
                })
                .catch(err => error(err.message));
        })

    }
    return (
        <div className='container'>
            <br />
            <h2>Sign up</h2>
            <br />
            <form autoComplete="off" className='form-group' onSubmit={signup}>
                <label htmlFor="name">Name</label>
                <input type="text" className='form-control' required name="name"
                    onChange={getData} value={singupData.name} />
                <br />
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' required name="email"
                    onChange={getData} value={singupData.email} />
                <br />
                <label htmlFor="mobile">Mobile</label>
                <input type="tel" className='form-control' required name="mobile"
                    onChange={getData} value={singupData.mobile} />
                <br />
                <label htmlFor="passowrd">Password</label>
                <input type="password" className='form-control' required name="password"
                    onChange={getData} value={singupData.password} />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>SUBMIT</button>
            </form>
            {singupData.error && <span className='error-msg'>{singupData.error}</span>}
            <br />
            <span>Already have an account? Login
                <Link to="login"> Here</Link>
            </span>
        </div>
    )
}
export default Singup
