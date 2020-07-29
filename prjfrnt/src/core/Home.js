import React, { useState, useEffect } from 'react';
import Base from './Base';
import { withRouter } from 'react-router-dom';
import { API } from '../backend';
import Card from '../components/Card'
import { getProduct } from './helper/coreapicalls';

const Home = () => {

    const [products, setProducts] = useState([])

    const [error, setError] = useState(false)

    const loadAllData = () => {
        getProduct().then(data => {
            if (data.error) {
                setError(true);
            } else {
                setProducts(data)
            }
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        loadAllData();
    }, []);

    return (
        <Base title="Home Page">
            <div className="container text-center mt-3">
                <h1 className="text-muted">Home</h1>
            </div>
            <div className="container-fluid mb-3 mt-3">
                <div className="row text-center">
                    <div className="row">
                        {products.map((product, index) => {
                            return (
                                <div key={index} className="col-md-4 mb-4 col-sm-12">
                                    <Card product={product} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Base>
    );
}

export default withRouter(Home);
