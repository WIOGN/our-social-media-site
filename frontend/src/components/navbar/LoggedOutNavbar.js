import React from 'react';
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoggedOutNavbar.css'

function LoggedOutNavbar() {
    return (
        <Navbar className='navColor'>
            <Nav className='mr-auto'>
                <NavLink exact to='/' className='nav-link navColorChange'>Home</NavLink>
                <NavLink exact to='/upload' className='nav-link navColorChange'>Upload</NavLink>
            </Nav>
            <Nav>
                <NavLink exact to='/login' className='nav-link navColorChange'>Log In</NavLink>
                <NavLink exact to='/signup' className='nav-link navColorChange'>Sign Up</NavLink>
            </Nav>
        </Navbar>
    );
}

export default LoggedOutNavbar;