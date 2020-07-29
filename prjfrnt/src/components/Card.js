import React, { useState, useEffect } from 'react';
import ImageHelper from './ImageHelper';
import { addItemToCart, RemoveItemFromCart } from '../core/helper/cardHelper';
import { Redirect } from 'react-router-dom';

const Card = ({ product, addCart = true, removeCart = false, setReload = function (f) { return f }, reload = undefined }) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const addToCart = () => {
        addItemToCart(product, () => setRedirect(true))
    }

    const getRedirect = (redirect) => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }

    const cardTitle = product ? product.name : "A photo from pexels";
    const cardDescription = product ? product.discription : "Default description";
    const cardPrice = product ? product.price : "Default price";


    const showAddToCart = addCart => {
        return (
            addCart && (
                <button
                    onClick={addToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                    Add to Cart
                </button>
            )
        )
    }
    const showRemoveFromCart = removeCart => {
        return (
            removeCart && (
                <button
                    onClick={() => {
                        RemoveItemFromCart(product._id)
                        setReload(!reload);

                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                    Remove from cart
                </button>
            )
        )
    }

    return (
        <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{cardTitle}</div>
            <div className="card-body">
                {getRedirect(redirect)}
                <ImageHelper product={product} />
                <p className="lead bg-success font-weight-normal text-wrap">
                    {cardDescription}
                </p>
                <p className="btn btn-success rounded  btn-sm px-4">${cardPrice}</p>
                <div className="row">
                    <div className="col-12">
                        {showAddToCart(addCart)}
                    </div>
                    <div className="col-12">
                        {showRemoveFromCart(removeCart)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
