import React from 'react';
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css'

import axios from 'axios';
import { Redirect } from 'react-router-dom';

class myNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        }
    }

    handleLogout = (event) => {
        event.preventDefault();
        console.log(this.props.history)
        localStorage.removeItem('token');
        this.props.setAuthFalse();
        this.setState({ redirect: '/' });
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            this.setState({ redirect: null })
            return <Redirect to={this.state.redirect} />
        }
    }

    render() {
        if (this.state.redirect) {
            return (
                <div>
                    {this.renderRedirect()}
                </div>

            );
        }
        if (this.props.isAuth) {
            return (
                <Navbar className='navColor'>
                    <Nav className='mr-auto'>
                        <NavLink exact to='/' className='nav-link navColorChange'>Home</NavLink>
                        <NavLink exact to='/upload' className='nav-link navColorChange'>Upload</NavLink>
                    </Nav>
                    <Nav>
                        <NavLink onClick={this.handleLogout} to='/' className='nav-link navColorChange'>Logout</NavLink>
                    </Nav>
                </Navbar>
            );
        }

        return (
            <Navbar className='navColor'>
                <Nav className='mr-auto'>
                    <NavLink exact to='/' className='nav-link navColorChange'>Home</NavLink>
                </Nav>
                <Nav>
                    <NavLink exact to='/login' className='nav-link navColorChange'>Login</NavLink>
                    <NavLink exact to='/signup' className='nav-link navColorChange'>Sign Up</NavLink>
                </Nav>
            </Navbar>
        );
    }


}

export default myNavbar;