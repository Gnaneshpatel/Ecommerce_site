import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { loadCart } from '../core/helper/cardHelper';
import Card from './Card';
import PaymentB from './PaymentB';

const Cart = () => {

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart());
    }, [reload]);

    const loadAllProduct = (products) => {
        return (
            <div>
                <h2>load all products</h2>
                {products.map((product, index) => {
                    return (
                        <Card
                            key={index}
                            product={product}
                            addCart={false}
                            removeCart={true}
                            setReload={setReload}
                            reload={reload}
                        />
                    )
                })}
            </div>
        )
    }

    const loadCheckout = () => {
        return (
            <div>
                <h2>for checkout</h2>
            </div>
        )
    }


    return (
        <Base>
            <div className="container-fluid">
                <h1 className="text-center text-muted mt-3">Card Page</h1>
                <div className="row text-center">
                    <div className="col-md-6 mt-5">{loadAllProduct(products)}</div>
                    <div className="col-md-6 mt-5"><PaymentB products={products} setReload={setReload} /></div>
                </div>
            </div>
        </Base>
    );
}

export default Cart;
