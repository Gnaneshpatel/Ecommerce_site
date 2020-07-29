import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Base from '../core/Base';
import { signup } from '../auth/helper';

const Signup = () => {

  const [values, setValuses] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { name, email, password, error, success } = values;

  const handleChange = name => event => {
    setValuses({ ...values, error: false, [name]: event.target.value })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setValuses({ ...values, error: false })
    signup({ name, email, password })
      .then(data => {
        if (data.error) {
          setValuses({ ...values, error: data.error, success: false })
        } else {
          setValuses({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true
          });
        }
      })
      .catch(err => console.log(err));
  }

  const successMsg = () => {
    return (
      <div className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        New account has been created successfuly.please<Link to="/signin">login here</Link>
      </div>
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


  const SignupForm = () => (
    <div className='container'>
      <div className="container text-center mt-3">
        <h3 className="text-muted">Sign Up</h3>
      </div>
      <form className="form">
        <div className='form-group'>
          <label for='exampleInputEmail1'>Name</label>
          <input type='text' className='form-control' placeholder='Enter Name' onChange={handleChange("name")} value={name} />
        </div>
        <div className='form-group'>
          <label for='exampleInputEmail1'>Email address</label>
          <input
            type='email'
            className='form-control'
            onChange={handleChange("email")}
            placeholder='Enter email'
            value={email}
          />
        </div>
        <div className='form-group'>
          <label for='exampleInputPassword1'>Password</label>
          <input
            type='password'
            className='form-control'
            onChange={handleChange("password")}
            placeholder='Password'
            value={password}
          />
        </div>
        <div className="text-center mb-5">
          <button type='submit' className='btn btn-success alien-center' onClick={onSubmit}>
            Submit
        </button>
        </div>
      </form>
    </div>
  );

  return (<Base>
    {successMsg()}
    {errorMsg()}
    {SignupForm()}
    <p className="container text-black text-center">{JSON.stringify(values)}</p>
  </Base>);
};

export default withRouter(Signup);
