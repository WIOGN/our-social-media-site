import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LoggedOutNavbar from './components/navbar/LoggedOutNavbar'
import SignUp from './components/signup/SignUp'
import LogIn from './components/login/Login'

class App extends React.Component {


  render() {
    return (
      <Router>
        <LoggedOutNavbar />
        <Switch>
          <Route exact path='/login'>
            <LogIn />
          </Route>
          <Route exact path='/signup'>
            <SignUp />
          </Route>
        </Switch>
      </Router>
    );
  };
}

export default App;