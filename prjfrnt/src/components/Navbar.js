import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth/helper';

const Navbar = ({ history }) => {
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <Link className='navbar-brand'>T-shirt Store</Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item active'>
              <Link className='nav-link' to='/'>
                Home
              </Link>
            </li>
            {!isAuthenticated() && (
              <Fragment>
                <li className='nav-item active'>
                  <Link className='nav-link' to='/Signup'>
                    SignUp
              </Link>
                </li>
                <li className='nav-item active'>
                  <Link className='nav-link' to='/Signin'>
                    SignIn
              </Link>
                </li>
              </Fragment>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li className='nav-item active'>
                <Link className='nav-link' to='/user/dashbord'>
                  Dashbord
              </Link>
              </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <li className='nav-item active'>
                <Link className='nav-link' to='/admin/dashbord'>
                  Dashbord
              </Link>
              </li>
            )}
            <li className='nav-item active'>
              <Link
                className='nav-link'
                to='/cart'>
                Cart
              </Link>
            </li>
            {isAuthenticated() && (
              <li className='nav-item active'>
                <span className='nav-link text-warning bg-dark' onClick={() => {
                  signout(() => {
                    console.log("redirected")
                    history.push("/");
                  })
                }}>
                  SignOut
              </span>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Navbar);
