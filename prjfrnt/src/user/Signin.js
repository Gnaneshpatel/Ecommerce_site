import React, { useState } from 'react';
import Base from '../core/Base';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth/helper/index';

const Signin = () => {

    const [values, setValues] = useState({
        email: "jkp@gmail.com",
        password: "213141",
        error: "",
        loading: false,
        didRedirect: false
    });

    const { email, password, error, loading, didRedirect } = values;

    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role === 1) {
                return <Redirect to='/admin/dashbord' />
            } else {
                console.log("u dashbord");
                return <Redirect to='/user/dashbord' />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(data, () => {
                        setValues({ ...values, didRedirect: true })
                    })
                }
            })
            .catch(error => console.log(error));
    }

    const loadingMsg = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    loading...
                </div>
            )
        );
    }

    const errorMsg = () => {
        return (
            <div className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
            >
                {error}
            </div>
        );
    }


    const SigninForm = () => (
        <div className="container">
            <div className="container text-center mt-3">
                <h3 className="text-muted">Sign In</h3>
            </div>
            <div className='form-group'>
                <label for='exampleInputEmail1'>Email address</label>
                <input
                    type='email'
                    className='form-control'
                    onChange={handleChange("email")}
                    value={email}
                />
                <small id='emailHelp' className='form-text text-muted'>
                    We'll never share your email with anyone else.
          </small>
            </div>
            <div className='form-group'>
                <label for='exampleInputPassword1'>Password</label>
                <input
                    type='password'
                    className='form-control'
                    onChange={handleChange("password")}
                    value={password}
                />
            </div>
            <div className="text-center mb-3">
                <button type='submit' className='btn btn-success alien-center' onClick={onSubmit}>
                    Submit
                </button>
            </div>
        </div>
    )
    return (
        <Base>
            {errorMsg()}
            {loadingMsg()}
            {SigninForm()}
            {performRedirect()}
            <p className="text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}
export default withRouter(Signin);
