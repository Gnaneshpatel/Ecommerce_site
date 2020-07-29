import React, { useState } from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { createCategory } from './helper/adminapicall';


const AddCategory = () => {


    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const onSuccess = () => {
        if (success) {
            return (
                <h2 className="text-success">Category Created Successfully</h2>
            );
        }
    }

    const onError = () => {
        if (error) {
            return (
                <h2 className="text-danger">Unable To Create Category</h2>
            );
        }
    }

    const myform = () => {
        return (
            <form className="form-group mb-3">
                <label className="mt-2">Enter your Category</label>
                <input type="text"
                    className="form-control mt-2"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    placeholder="Ex. Summer Tshirt"
                />
                <button type="button" onClick={onSubmit} className="btn btn-outline-success mt-3">Add Category</button>
            </form>
        )
    }

    const goBack = () => (
        <Link className="btn btn-outline-primary mb-5" to="/admin/dashbord">Admin Home</Link>
    )

    const handleChange = (event) => {
        setError("");
        setName(event.target.value);
    }

    const onSubmit = () => {
        setError("");
        setSuccess(false);
        createCategory(user._id, token, { name })
            .then(data => {
                if (data?.error) {
                    setError(true);
                } else {
                    setError("");
                    setSuccess(true);
                    setName("")
                }
            }).catch(error => console.log(error))
    }

    return (
        <Base>
            <div className="container text-muted text-center">
                <h1 className="heading-2 mt-3">Create Category here</h1>
            </div>
            <div className="container mt-3">
                <div className="row rounded bg-white">
                    <div className="col-md-8 offset-md-2">
                        {onError()}
                        {onSuccess()}
                        {myform()}
                        {goBack()}
                    </div>
                </div>
            </div>
        </Base>
    );
}

export default AddCategory;
