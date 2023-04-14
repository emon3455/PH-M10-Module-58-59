import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css"

const Header = () => {
    return (
        <header className='container'>
            <nav className='navbar'>
                <Link  to="/">Home</Link>
                <Link  to="/login">Login</Link>
                <Link  to="/register">Register</Link>
                <Link  to="/registerRB">Register-RB</Link>
            </nav>
        </header >
    );
};

export default Header;