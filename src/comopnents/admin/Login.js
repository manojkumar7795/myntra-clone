import Button from '@restart/ui/esm/Button'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { VscLock } from 'react-icons/vsc'
import { MToast, toast } from '../admin/MToast';
import { fAuth } from '../confing/confing';



const Login = () => {

    const newToast = (type) => {
        toast.error('Error', type)
    }
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });



    let name, value
    const getData = (e) => {
        name = e.target.name;
        value = e.target.value;

        setLoginData({ ...loginData, [name]: value })

    }
    const login = (e) => {
        const { email, password } = loginData
        e.preventDefault();
        let minutesToAdd = 30;
        let futureDate = Date.now() + minutesToAdd * 60000
        fAuth.signInWithEmailAndPassword(email, password).then((response) => {
            loginData.email = '';
            loginData.password = '';
            localStorage.auth_info = JSON.stringify({
                auth_token: response.user.auth.currentUser.accessToken,
                timestamp: futureDate
            })
            // props.history.push('/admin');

            window.open('/admin', '_self')

        }).catch(err => {
            newToast(err.message)
        })

    }

    return (
        <>

            <div className="login">
                <MToast />
                <div className="panel">
                    <div className="panel-body">
                        <div className="logo-container login-logo">
                            <a href="/" className="logo-anchor" />

                        </div>
                        <Form className="login-form" onSubmit={login} >
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Enter email" name='email' autoComplete='off' onChange={getData} value={loginData.email} />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" name='password' autoComplete='off' onChange={getData} value={loginData.password} />
                            </Form.Group>
                            <Button type="submit" className=" sa-btn"><VscLock /><span> Login</span></Button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}
export { Login }