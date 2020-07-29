import React from 'react';
import '../styles.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="card text-center">
                <div className="card-body bg-dark text-white">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <button className="btn btn-outline-success">Contact Us</button>
                </div>
                <div className="card-footer text-muted">
                    Amazing T-shirt Store
            </div>
            </div>
        </footer>
    );
}

export default Footer;
