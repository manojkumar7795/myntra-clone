import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { fAuth } from '../confing/confing';

const Login = (props) => {
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
        fAuth.signInWithEmailAndPassword(email, password).then(() => {
            // localStorage.setItem('user',JSON.stringify(loginData))
            loginData.email = '';
            loginData.password = '';
            setTimeout(() => {
                window.open('/', '_self')
            }, 1000)
        })
        // .catch(err =>error(err.message));
    }
    return (
        <div className='container'>
            <br />
            <h2>Login</h2>
            <br />
            <form autoComplete="off" className='form-group' onSubmit={login}>
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' required
                    name="email"
                    onChange={getData} value={loginData.email} />
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" className='form-control' required name="password"
                    onChange={getData} value={loginData.password} />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>LOGIN</button>
            </form>
            {loginData.error && <span className='error-msg text-danger'>{loginData.error}</span>}
            <br />
            <span>Don't have an account? Register
                <Link to="singup"> Here</Link>
            </span>
        </div>
    )
}

export default Login
