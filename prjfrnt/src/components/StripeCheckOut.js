import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from '../core/helper/cardHelper';
import { Link } from 'react-router-dom';

const StripeCheckOut = ({ products, setReload = f => f, reload = undefined }) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    });

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;

    return (
        <div>
            <h3 className="text-center">Stripe CheckOut Loaded.</h3>
        </div>
    );
}

export default StripeCheckOut;
