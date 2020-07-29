import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { getProducts, deleteProduct } from './helper/adminapicall';

const ManageProducts = () => {

    const [products, setProducts] = useState([])

    const { user, token } = isAuthenticated()

    const preload = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        })
    }

    useEffect(() => {
        preload();
    }, []);

    const deleteThisDelete = (productId) => {
        deleteProduct(productId, user._id, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    preload();
                }
            })
    }

    return (
        <Base title="Welcome admin" description="Manage products here">
            <h2 className="mb-4 text-muted text-center mt-3">All products:</h2>
            <Link className="btn btn-outline-info" to={`/admin/dashbord`}>
                <span className="">Admin Home</span>
            </Link>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center text-black my-3">Total 3 products</h2>

                    {products.map((product, index) => {
                        return (
                            <div key={index} className="row text-center mb-2 ">
                                <div className="col-4">
                                    <h3 className="text-black text-left">{product.name}</h3>
                                </div>
                                <div className="col-4">
                                    <Link
                                        className="btn btn-success"
                                        to={`/updata/product/${product._id}`}
                                    >
                                        <span className="">Update</span>
                                    </Link>
                                </div>
                                <div className="col-4">
                                    <button onClick={() => { deleteThisDelete(product._id) }} className="btn btn-danger">
                                        Delete
                            </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Base>
    );
}

export default ManageProducts;
