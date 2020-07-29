import React, { useState, useEffect } from 'react';
import { loadCart } from '../core/helper/cardHelper';
import { Link } from 'react-router-dom';
import { getMeToken, processPayment } from '../core/helper/paymentBHelper';
import { isAuthenticated } from '../auth/helper';
import { createOrder } from '../core/helper/orderHelper';
import DropIn from 'braintree-web-drop-in-react';

const PaymentB = ({ products, setReload = f => f, reload = undefined }) => {

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getMeToken(userId, token).then(information => {
            console.log("Information:", information)
            if (information.error) {
                //console.log("hi");
                setInfo({ ...info, error: information.error })
            } else {
                //console.log("hello");
                const clientToken = information.clientToken;
                setInfo({ clientToken })
            }
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const showBTDropIn = () => {
        return (
            <div>
                {info.clientToken !== null && products.length > 0 ? (
                    <div>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={(instance) => (info.instance = instance)}
                        />
                        <button className="btn btn-success btn-block" onClick={() => { onPurchase() }}>Buy</button>
                    </div>
                ) : (
                        <h3>Please login or add something to cart...</h3>
                    )}
            </div>
        )
    }

    const onPurchase = () => {
        setInfo({ loading: true })
        let nonce;
        let getNonce = info.instance
            ?.requestPaymentMethod()
            .then(data => {
                nonce = data.nonce
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getAmount()
                }
                processPayment(userId, token, paymentData)
                    .then(res => {
                        setInfo({ ...info, success: res.success, loading: false })
                        console.log("payment success");
                    })
                    .catch(err => {
                        console.log("payment failed");
                        setInfo({ error: err, loading: false, success: false })
                    })
            })
    }

    const getAmount = () => {
        let amount = 0;
        products.map((product) => {
            amount = amount + product.amount;
        })
        return amount;
    }

    return (
        <div>
            <h3 className="text-center text-black">your Bill is {getAmount()} $</h3>
            {showBTDropIn()}
        </div>
    );
}

export default PaymentB;
