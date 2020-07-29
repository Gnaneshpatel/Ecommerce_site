import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const Base = ({
    children
}) => {
    return (
        <div>
        <Navbar/>
            <div className="container">
                {children}
            </div>
        <Footer/>
        </div>
    );
}

export default Base;
