import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

class LogIn extends React.Component {

    render() {
        return (
            <div className="container-fluid h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3 specialBox">
                        <h3>Log In Form</h3>
                        <input className="form-control form-control-lg" placeholder="Username" type="text" />
                        <input className="form-control form-control-lg" placeholder="Password" type="password" />
                        <button className="btn-lg btn-block loginButton">Log In</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LogIn;