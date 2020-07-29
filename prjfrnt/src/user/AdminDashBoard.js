import React from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';

const AdminDashBoard = () => {

    const { user: { name, email, role } } = isAuthenticated();

    const AdminLeft = () => {
        return (
            <div className="card mb-5" >
                <div className="card-header text-center bg-dark text-white">
                    Admin Panel
                 </div>
                <ul className="list-group list-group-flush text-center">
                    <li className="list-group-item"><Link to="/create/category">Create Category</Link></li>
                    <li className="list-group-item"><Link to="/manage/category">Manage Category</Link></li>
                    <li className="list-group-item"><Link to="/create/product">Create product</Link></li>
                    <li className="list-group-item"><Link to="/manage/product">Manage product</Link></li>
                    <li className="list-group-item"><Link to="/manage/order">Manage order</Link></li>
                </ul>
            </div>
        )
    }

    const AdminRight = () => {
        return (
            <div className="container">
                <h4 className="text-black mt-2 ml-5">Hii Admin</h4>
                <ul className="list-group list-group-flush ml-5">
                    <li className="list-group-item"><span>Name: </span>{name}</li>
                    <li className="list-group-item"><span>Email: </span>{email}</li>
                    <button className="btn btn-danger">Admin Home</button>
                </ul>
            </div>

        );
    }

    return (
        <Base>
            <h1 className="text-center text-muted mt-2 mb-4">AdminDashBoard</h1>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">{AdminLeft()}</div>
                    <div className="col-lg-8 col-md-8 col-sm-12 mb-5">{AdminRight()}</div>
                </div>
            </div>
        </Base>
    );
}

export default AdminDashBoard;
