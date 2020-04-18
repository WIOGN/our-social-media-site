import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Homepage from './components/home/home';
import LoggedOutNavbar from './components/navbar/LoggedOutNavbar';
import SignUp from './components/signup/SignUp';
import LogIn from './components/login/Login';
import Upload from './components/upload/Upload';
import NormalImage from './components/imageView/normalImage';

class App extends React.Component {


  render() {
    return (
      <Router>
        <LoggedOutNavbar />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/upload' component={Upload} />
          <Route exact path='/login' component={LogIn} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/image' component={NormalImage} />
        </Switch>
      </Router>
    );
  };
}

export default App;
