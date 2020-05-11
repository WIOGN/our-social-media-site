import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import axios from 'axios';

import Homepage from './components/home/home';
import Navbar from './components/navbar/navbar';
import SignUp from './components/signup/SignUp';
import LogIn from './components/login/Login';
import Upload from './components/upload/Upload';
import NormalImage from './components/imageView/normalImage';
import MyImages from './components/private/myimages';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuth: false
    }

    this.setAuthTrue = this.setAuthTrue.bind(this);
    this.setAuthFalse = this.setAuthFalse.bind(this);
  }

  componentDidMount = async () => {
    var token = localStorage.getItem('token');
    if (token) {
      try {
        var user = await axios.post('/api/usercontroller/user', {
          auth_token: token
        });
        console.log(user);
        if (user.data) {
          this.setAuthTrue();
        }
      }
      catch (err) {
        // console.log(err.response.status);
        if (err.response.status === 401) {
          this.setAuthFalse();
          localStorage.removeItem('token');
        }
      }


    }
  }

  setAuthTrue = () => {
    this.setState({
      isAuth: true
    });
  }

  setAuthFalse = () => {
    this.setState({
      isAuth: false
    });
  }

  render() {
    return (
      <Router>
        <Navbar isAuth={this.state.isAuth} setAuthFalse={this.setAuthFalse} />
        <Switch>
          <Route exact path='/' component={Homepage} />

          <Route exact path='/upload'>
            <Upload isAuth={this.state.isAuth} />
          </Route>

          <Route exact path='/login'>
            <LogIn setAuthTrue={this.setAuthTrue} />
          </Route>

          <Route exact path='/signup'>
            <SignUp setAuthTrue={this.setAuthTrue} />
          </Route>>

          <Route exact path='/image' component={NormalImage} />

          <Route exact path='/myimages' component={MyImages} />
        </Switch>
      </Router>
    );
  };
}

export default App;
