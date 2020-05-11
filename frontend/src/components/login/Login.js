import React from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: null,
            redirect: null
        }
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            var res = await axios.post('/api/usercontroller/login', {
                username: this.state.username,
                password: this.state.password
            });
            localStorage.setItem('token', res.data.token);
            this.props.setAuthTrue();
            this.setState({
                redirect: '/'
            });
        }
        catch (err) {
            console.log(err);
            console.log(err.response);
            if (err.response.status === 400) {
                this.setState({
                    error: err.response.data.msg
                });
            }
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="container-fluid h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3 specialBox">
                        <h3>Log In Form</h3>
                        <input onChange={this.handleUsernameChange} className="form-control form-control-lg" placeholder="Username" type="text" />
                        <input onChange={this.handlePasswordChange} className="form-control form-control-lg" placeholder="Password" type="password" />
                        <p style={{ color: 'red' }}>{this.state.error}</p>
                        <button onClick={this.handleSubmit} className="btn-lg btn-block loginButton">Log In</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LogIn;